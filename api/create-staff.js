const admin = require("firebase-admin");
const { cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { createPrivateKey } = require("node:crypto");

const PROJECT_ID = "futbol-premier-6cc4e";
const ADMIN_UID = "gvP0Hsrh1pTtOAwr5ewCy3NEwdn1";
const ADMIN_EMAIL = "naviafranco731@gmail.com";
const STAFF_ROLES = new Set(["cajero", "empleado"]);
const APP_NAME = "futbol-premier-staff";

const INITIALIZATION_ERRORS = {
    SERVICE_ACCOUNT_MISSING: "FIREBASE_SERVICE_ACCOUNT no está disponible en el entorno de esta función.",
    SERVICE_ACCOUNT_INVALID_JSON: "FIREBASE_SERVICE_ACCOUNT no contiene un JSON válido de cuenta de servicio.",
    SERVICE_ACCOUNT_INVALID_FORMAT: "FIREBASE_SERVICE_ACCOUNT debe contener el JSON completo de la cuenta de servicio.",
    SERVICE_ACCOUNT_REQUIRED_FIELDS: "El JSON de la cuenta de servicio debe incluir project_id, client_email y private_key.",
    SERVICE_ACCOUNT_PROJECT_MISMATCH: "La cuenta de servicio pertenece a un proyecto de Firebase diferente.",
    SERVICE_ACCOUNT_PRIVATE_KEY_INVALID: "private_key no tiene el formato PEM esperado.",
    SERVICE_ACCOUNT_CREDENTIAL_INVALID: "Firebase Admin rechazó las credenciales de servicio.",
    FIREBASE_ADMIN_APP_CONFLICT: "Existe una instancia de Firebase Admin configurada para otro proyecto.",
    FIREBASE_ADMIN_INIT_FAILED: "Firebase Admin no pudo inicializarse. Revisa los logs de la función."
};

class FirebaseAdminInitializationError extends Error {
    constructor(code, causeCode, causeName, stage) {
        super(code);
        this.code = code;
        this.causeCode = causeCode;
        this.causeName = causeName;
        this.stage = stage;
    }
}

function safeErrorCode(error) {
    return typeof error?.code === "string" && /^[a-zA-Z0-9/_-]{1,80}$/.test(error.code)
        ? error.code
        : undefined;
}

function safeErrorName(error) {
    return typeof error?.name === "string" && /^[A-Za-z][A-Za-z0-9._-]{0,79}$/.test(error.name)
        ? error.name
        : undefined;
}

function withDiagnosticStage(error, stage, fallbackCode = "FIREBASE_ADMIN_INIT_FAILED") {
    return new FirebaseAdminInitializationError(
        error instanceof FirebaseAdminInitializationError ? error.code : fallbackCode,
        error instanceof FirebaseAdminInitializationError ? error.causeCode : safeErrorCode(error),
        error instanceof FirebaseAdminInitializationError ? error.causeName : safeErrorName(error),
        stage
    );
}

function readServiceAccount() {
    const rawServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (typeof rawServiceAccount !== "string" || !rawServiceAccount.trim()) {
        throw new FirebaseAdminInitializationError("SERVICE_ACCOUNT_MISSING");
    }

    let serviceAccount;
    try {
        serviceAccount = JSON.parse(rawServiceAccount.trim());
        if (typeof serviceAccount === "string") {
            serviceAccount = JSON.parse(serviceAccount);
        }
    } catch (error) {
        throw new FirebaseAdminInitializationError(
            "SERVICE_ACCOUNT_INVALID_JSON",
            safeErrorCode(error),
            safeErrorName(error)
        );
    }

    if (!serviceAccount || typeof serviceAccount !== "object" || Array.isArray(serviceAccount)) {
        throw new FirebaseAdminInitializationError("SERVICE_ACCOUNT_INVALID_FORMAT");
    }

    const { project_id: projectId, client_email: clientEmail, private_key: rawPrivateKey } = serviceAccount;
    if (
        typeof projectId !== "string" || !projectId.trim()
        || typeof clientEmail !== "string" || !clientEmail.trim()
        || typeof rawPrivateKey !== "string" || !rawPrivateKey.trim()
    ) {
        throw new FirebaseAdminInitializationError("SERVICE_ACCOUNT_REQUIRED_FIELDS");
    }
    if (projectId.trim() !== PROJECT_ID) {
        throw new FirebaseAdminInitializationError("SERVICE_ACCOUNT_PROJECT_MISMATCH");
    }

    const privateKey = rawPrivateKey
        .replaceAll("\\r\\n", "\n")
        .replaceAll("\\n", "\n")
        .trim();
    if (!privateKey.startsWith("-----BEGIN PRIVATE KEY-----")
        || !privateKey.endsWith("-----END PRIVATE KEY-----")) {
        throw new FirebaseAdminInitializationError("SERVICE_ACCOUNT_PRIVATE_KEY_INVALID");
    }
    try {
        createPrivateKey(privateKey);
    } catch (error) {
        throw new FirebaseAdminInitializationError(
            "SERVICE_ACCOUNT_PRIVATE_KEY_INVALID",
            safeErrorCode(error),
            safeErrorName(error)
        );
    }

    return {
        ...serviceAccount,
        project_id: projectId.trim(),
        client_email: clientEmail.trim(),
        private_key: privateKey
    };
}

function existingAdminApp() {
    const app = admin.getApps().find(candidate => candidate.name === APP_NAME);
    if (!app) return null;
    if (app.options.projectId !== PROJECT_ID) {
        throw new FirebaseAdminInitializationError("FIREBASE_ADMIN_APP_CONFLICT");
    }
    return app;
}

function getAdminApp() {
    let existingApp;
    try {
        existingApp = existingAdminApp();
    } catch (error) {
        throw withDiagnosticStage(error, "CHECK_EXISTING_APP");
    }
    if (existingApp) return existingApp;

    let serviceAccount;
    try {
        serviceAccount = readServiceAccount();
    } catch (error) {
        throw withDiagnosticStage(error, "READ_SERVICE_ACCOUNT");
    }

    let credential;
    try {
        credential = cert(serviceAccount);
    } catch (error) {
        throw withDiagnosticStage(new FirebaseAdminInitializationError(
            "SERVICE_ACCOUNT_CREDENTIAL_INVALID",
            safeErrorCode(error),
            safeErrorName(error)
        ), "CREATE_CREDENTIAL");
    }

    try {
        return admin.initializeApp({ credential, projectId: PROJECT_ID }, APP_NAME);
    } catch (error) {
        let app;
        try {
            app = existingAdminApp();
        } catch (checkError) {
            throw withDiagnosticStage(checkError, "CHECK_EXISTING_APP");
        }
        if (app) return app;
        throw withDiagnosticStage(new FirebaseAdminInitializationError(
            "FIREBASE_ADMIN_INIT_FAILED",
            safeErrorCode(error),
            safeErrorName(error)
        ), "INITIALIZE_ADMIN");
    }
}

function sendError(res, status, message, code, causeCode, causeName, stage) {
    const response = { error: message };
    if (code) response.code = code;
    if (causeCode) response.causeCode = causeCode;
    if (causeName) response.causeName = causeName;
    if (stage) response.stage = stage;
    res.status(status).json(response);
}

module.exports = async function createStaff(req, res) {
    res.setHeader("Cache-Control", "no-store");
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return sendError(res, 405, "Método no permitido.");
    }

    const match = /^Bearer\s+(.+)$/i.exec(req.headers.authorization || "");
    if (!match) return sendError(res, 401, "Inicia sesión como administrador.");

    let app;
    try {
        app = getAdminApp();
    } catch (error) {
        const code = error instanceof FirebaseAdminInitializationError
            ? error.code
            : safeErrorCode(error) || "FIREBASE_ADMIN_INIT_FAILED";
        const causeCode = error instanceof FirebaseAdminInitializationError
            ? error.causeCode
            : undefined;
        const causeName = error instanceof FirebaseAdminInitializationError
            ? error.causeName
            : safeErrorName(error);
        const stage = error instanceof FirebaseAdminInitializationError
            ? error.stage
            : undefined;
        console.error("Firebase Admin initialization failed:", {
            code,
            causeCode: causeCode || undefined,
            causeName: causeName || undefined,
            stage: stage || undefined
        });
        return sendError(
            res,
            500,
            INITIALIZATION_ERRORS[code] || INITIALIZATION_ERRORS.FIREBASE_ADMIN_INIT_FAILED,
            code,
            causeCode,
            causeName,
            stage
        );
    }

    let decoded;
    try {
        decoded = await getAuth(app).verifyIdToken(match[1], true);
    } catch (error) {
        return sendError(res, 401, "La sesión expiró. Vuelve a iniciar sesión.");
    }

    if (decoded.uid !== ADMIN_UID || decoded.email !== ADMIN_EMAIL) {
        return sendError(res, 403, "Solo el administrador puede crear cuentas del equipo.");
    }
//JJ
    let body = req.body;
    if (typeof body === "string") {
        try {
            body = JSON.parse(body);
        } catch (error) {
            return sendError(res, 400, "La solicitud no contiene JSON válido.");
        }
    }

    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";
    const role = typeof body?.role === "string" ? body.role : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 12 || !STAFF_ROLES.has(role)) {
        return sendError(res, 400, "Ingresa un correo válido, una contraseña de 12 caracteres o más y un rol permitido.");
    }

    let user;
    try {
        user = await getAuth(app).createUser({ email, password });
        await getAuth(app).setCustomUserClaims(user.uid, { role });
        return res.status(201).json({ uid: user.uid, email: user.email, role });
    } catch (error) {
        if (user) {
            try {
                await getAuth(app).deleteUser(user.uid);
            } catch (rollbackError) {
                console.error("No se pudo revertir la cuenta sin rol:", rollbackError.message);
            }
        }
        if (error.code === "auth/email-already-exists") {
            return sendError(res, 409, "Ya existe una cuenta con ese correo.");
        }
        if (error.code === "auth/invalid-email" || error.code === "auth/invalid-password") {
            return sendError(res, 400, "Firebase rechazó el correo o la contraseña.");
        }
        console.error("No se pudo crear la cuenta del equipo:", error.message);
        return sendError(res, 500, "No se pudo crear la cuenta. Revisa la configuración de Firebase.");
    }
};
