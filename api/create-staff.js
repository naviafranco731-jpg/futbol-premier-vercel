const admin = require("firebase-admin");

const PROJECT_ID = "futbol-premier-6cc4e";
const ADMIN_UID = "gvP0Hsrh1pTtOAwr5ewCy3NEwdn1";
const ADMIN_EMAIL = "naviafranco731@gmail.com";
const STAFF_ROLES = new Set(["cajero", "empleado"]);
const APP_NAME = "futbol-premier-staff";

function getAdminApp() {
    const rawServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!rawServiceAccount) throw new Error("Missing Firebase service account.");

    const serviceAccount = JSON.parse(rawServiceAccount);
    if (serviceAccount.project_id !== PROJECT_ID) {
        throw new Error("Firebase service account belongs to a different project.");
    }

    return admin.apps.find(app => app.name === APP_NAME)
        || admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            projectId: PROJECT_ID
        }, APP_NAME);
}

function sendError(res, status, message) {
    res.status(status).json({ error: message });
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
        console.error("No se pudo inicializar Firebase Admin:", error.message);
        return sendError(res, 500, "La creación de cuentas no está configurada en Vercel.");
    }

    let decoded;
    try {
        decoded = await admin.auth(app).verifyIdToken(match[1], true);
    } catch (error) {
        return sendError(res, 401, "La sesión expiró. Vuelve a iniciar sesión.");
    }

    if (decoded.uid !== ADMIN_UID || decoded.email !== ADMIN_EMAIL) {
        return sendError(res, 403, "Solo el administrador puede crear cuentas del equipo.");
    }

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
        user = await admin.auth(app).createUser({ email, password });
        await admin.auth(app).setCustomUserClaims(user.uid, { role });
        return res.status(201).json({ uid: user.uid, email: user.email, role });
    } catch (error) {
        if (user) {
            try {
                await admin.auth(app).deleteUser(user.uid);
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
