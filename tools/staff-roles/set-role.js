const path = require("node:path");
const admin = require("firebase-admin");

const PROJECT_ID = "futbol-premier-6cc4e";
const ROLES = new Set(["cajero", "proveedor"]);

async function main() {
    const [uid, role, ...extra] = process.argv.slice(2);
    if (!uid || !role || extra.length || !/^[A-Za-z0-9_-]{1,128}$/.test(uid) || !ROLES.has(role)) {
        throw new Error("Uso: node tools/staff-roles/set-role.js <UID> <cajero|proveedor>");
    }

    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (!credentialsPath) {
        throw new Error("Define GOOGLE_APPLICATION_CREDENTIALS con la ruta absoluta a la credencial privada fuera del repositorio.");
    }

    const serviceAccountPath = path.resolve(credentialsPath);
    const projectRoot = path.resolve(__dirname, "../..");
    if (serviceAccountPath === projectRoot || serviceAccountPath.startsWith(projectRoot + path.sep)) {
        throw new Error("Guarda la credencial fuera de la carpeta del proyecto.");
    }

    const serviceAccount = require(serviceAccountPath);
    if (serviceAccount.project_id !== PROJECT_ID) {
        throw new Error(`La credencial debe pertenecer al proyecto ${PROJECT_ID}.`);
    }

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: PROJECT_ID
    });

    const user = await admin.auth().getUser(uid);
    await admin.auth().setCustomUserClaims(uid, {
        ...user.customClaims,
        role
    });

    console.log(`Rol ${role} asignado a ${user.email || uid}. La persona debe cerrar sesión e iniciar sesión nuevamente.`);
}

main().catch(error => {
    console.error(`No se pudo asignar el rol: ${error.message}`);
    process.exitCode = 1;
});
