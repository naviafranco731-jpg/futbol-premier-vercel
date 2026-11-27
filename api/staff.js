const { cert, initializeApp, getApps } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const PROJECT_ID = "futbol-premier-6cc4e";
const ADMIN_UID = "gvP0Hsrh1pTtOAwr5ewCy3NEwdn1";
const ADMIN_EMAIL = "naviafranco731@gmail.com";
const STAFF_ROLES = new Set(["cajero", "empleado"]);
const APP_NAME = "futbol-premier-staff";

class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

function getAdminApp() {
    const existente = getApps().find(app => app.name === APP_NAME);
    if (existente) return existente;

    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (typeof raw !== "string" || !raw.trim()) {
        throw new ApiError(500, "FIREBASE_SERVICE_ACCOUNT no está configurada en Vercel.");
    }

    let cuenta;
    try {
        cuenta = JSON.parse(raw.trim());
        if (typeof cuenta === "string") cuenta = JSON.parse(cuenta);
    } catch (error) {
        throw new ApiError(500, "FIREBASE_SERVICE_ACCOUNT no contiene un JSON válido.");
    }

    if (
        !cuenta || typeof cuenta !== "object"
        || typeof cuenta.client_email !== "string"
        || typeof cuenta.private_key !== "string"
    ) {
        throw new ApiError(500, "El JSON de la cuenta de servicio está incompleto.");
    }
    if (String(cuenta.project_id || "").trim() !== PROJECT_ID) {
        throw new ApiError(500, "La cuenta de servicio pertenece a otro proyecto de Firebase.");
    }

    const privateKey = cuenta.private_key
        .replaceAll("\\r\\n", "\n")
        .replaceAll("\\n", "\n")
        .trim();

    try {
        return initializeApp(
            { credential: cert({ ...cuenta, private_key: privateKey }), projectId: PROJECT_ID },
            APP_NAME
        );
    } catch (error) {
        console.error("No se pudo inicializar Firebase Admin:", error?.code, error?.message);
        throw new ApiError(500, "Firebase Admin no pudo inicializarse. Revisa los logs de la función.");
    }
}

function leerCuerpo(body) {
    if (typeof body === "string") {
        try {
            return JSON.parse(body);
        } catch (error) {
            throw new ApiError(400, "La solicitud no contiene JSON válido.");
        }
    }
    return body && typeof body === "object" ? body : {};
}

async function listarEquipo(auth) {
    const equipo = [];
    let pageToken;
    do {
        const pagina = await auth.listUsers(1000, pageToken);
        for (const usuario of pagina.users) {
            const role = usuario.customClaims?.role;
            if (usuario.uid === ADMIN_UID || !STAFF_ROLES.has(role)) continue;
            equipo.push({
                uid: usuario.uid,
                email: usuario.email || "",
                role,
                disabled: Boolean(usuario.disabled),
                creationTime: usuario.metadata.creationTime || null,
                lastSignInTime: usuario.metadata.lastSignInTime || null
            });
        }
        pageToken = pagina.pageToken;
    } while (pageToken);
    return equipo.sort((a, b) => a.email.localeCompare(b.email, "es"));
}

// Solo permite actuar sobre cuentas del equipo: nunca sobre clientes ni sobre el administrador.
async function obtenerMiembro(auth, uid) {
    if (typeof uid !== "string" || !/^[A-Za-z0-9]{1,128}$/.test(uid)) {
        throw new ApiError(400, "Identificador de cuenta no válido.");
    }
    if (uid === ADMIN_UID) {
        throw new ApiError(403, "La cuenta del administrador no se puede modificar desde aquí.");
    }
    let usuario;
    try {
        usuario = await auth.getUser(uid);
    } catch (error) {
        if (error.code === "auth/user-not-found") throw new ApiError(404, "La cuenta ya no existe.");
        throw error;
    }
    if (!STAFF_ROLES.has(usuario.customClaims?.role)) {
        throw new ApiError(403, "Esa cuenta no pertenece al equipo.");
    }
    return usuario;
}

async function actualizarMiembro(auth, cuerpo) {
    const usuario = await obtenerMiembro(auth, cuerpo.uid);
    const { role, disabled } = cuerpo;
    if (role === undefined && disabled === undefined) {
        throw new ApiError(400, "No hay cambios que aplicar.");
    }

    let revocar = false;
    if (role !== undefined) {
        if (!STAFF_ROLES.has(role)) throw new ApiError(400, "Rol no permitido.");
        if (role !== usuario.customClaims.role) {
            await auth.setCustomUserClaims(usuario.uid, { ...usuario.customClaims, role });
            revocar = true;
        }
    }
    if (disabled !== undefined) {
        if (typeof disabled !== "boolean") throw new ApiError(400, "Estado no válido.");
        if (disabled !== usuario.disabled) {
            await auth.updateUser(usuario.uid, { disabled });
            if (disabled) revocar = true;
        }
    }
    // Obliga a renovar el token: el rol nuevo o el bloqueo se aplican en el próximo refresco.
    if (revocar) await auth.revokeRefreshTokens(usuario.uid);
    return { uid: usuario.uid };
}

async function eliminarMiembro(auth, cuerpo) {
    const usuario = await obtenerMiembro(auth, cuerpo.uid);
    if (!usuario.disabled) {
        throw new ApiError(409, "Primero desactiva la cuenta. Eliminarla es permanente.");
    }
    await auth.deleteUser(usuario.uid);
    return { uid: usuario.uid };
}

module.exports = async function staff(req, res) {
    res.setHeader("Cache-Control", "no-store");
    try {
        if (req.method !== "GET" && req.method !== "POST") {
            res.setHeader("Allow", "GET, POST");
            throw new ApiError(405, "Método no permitido.");
        }

        const match = /^Bearer\s+(.+)$/i.exec(req.headers.authorization || "");
        if (!match) throw new ApiError(401, "Inicia sesión como administrador.");

        const auth = getAuth(getAdminApp());
        let decodificado;
        try {
            decodificado = await auth.verifyIdToken(match[1], true);
        } catch (error) {
            throw new ApiError(401, "La sesión expiró. Vuelve a iniciar sesión.");
        }
        if (decodificado.uid !== ADMIN_UID || decodificado.email !== ADMIN_EMAIL) {
            throw new ApiError(403, "Solo el administrador puede gestionar el equipo.");
        }

        if (req.method === "GET") {
            return res.status(200).json({ users: await listarEquipo(auth) });
        }

        const cuerpo = leerCuerpo(req.body);
        if (cuerpo.action === "update") return res.status(200).json(await actualizarMiembro(auth, cuerpo));
        if (cuerpo.action === "delete") return res.status(200).json(await eliminarMiembro(auth, cuerpo));
        throw new ApiError(400, "Acción no reconocida.");
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.status).json({ error: error.message });
        }
        console.error("Error en /api/staff:", error?.code, error?.message);
        return res.status(500).json({ error: "Error inesperado. Revisa la configuración de Firebase." });
    }
};