# Configuración de cuentas y seguridad de Firebase

La tienda usa Firebase Authentication y Realtime Database. No se guardan contraseñas en la base de datos ni se incluyen credenciales administrativas en `script.js`. El formulario único acepta el correo de cualquier cuenta o el alias `FUTADMI`; el rol de administrador se determina únicamente por UID.

## 1. Activar Authentication

1. En Firebase Console, abre **Authentication → Sign-in method** y activa **Correo electrónico/contraseña**.
2. En **Authentication → Users**, crea la cuenta administradora con el correo real del propietario `naviafranco731@gmail.com` y una contraseña larga y única, que no se guarde en el repositorio. El panel acepta el alias `FUTADMI` y usa internamente ese correo para iniciar sesión.
3. Añade el dominio de producción y `localhost` (si se usa para desarrollo) a **Authentication → Settings → Authorized domains**.

El UID de administrador ya está configurado en `ADMIN_UID` de [script.js](./script.js) y en las condiciones administrativas de [database.rules.json](./database.rules.json). Publica estas reglas en Realtime Database. Esto evita que una cuenta que solo coincida por correo obtenga privilegios administrativos.

Las cuentas de cliente se crean con usuario, correo y contraseña. Para preparar la cuenta estándar de prueba, abre **Ingresar / Mi cuenta → Crear cuenta** y registra:

- Usuario: `Rodrigo`
- Correo de prueba: `rodrigo@futbolpremier.test`
- Contraseña de prueba: `Rodrigo123!`

La cuenta se crea en Firebase Authentication y su perfil se guarda en `/usuarios/{uid}`. El dominio `.test` no recibe correo; para probar verificación, encargos o pedidos, usa una dirección real que controles. Cambia la contraseña de prueba antes de publicar. La contraseña del cliente se define en el formulario y nunca se inserta en el código.

## 2. Crear cuentas de Cajero y Proveedor sin Cloud Functions

Este procedimiento no requiere Blaze ni Cloud Functions. La cuenta se crea manualmente en Firebase Console y el rol se asigna desde una herramienta local, usando una credencial privada fuera del repositorio.

1. En Firebase Console, abre **Authentication → Users → Add user**. Crea la cuenta con el correo y la contraseña que entregues a la persona.
2. Copia el UID de esa cuenta.
3. En **Google Cloud Console → IAM y administración → Cuentas de servicio**, crea una cuenta de servicio dedicada y asígnale el rol **Firebase Authentication Admin** (`roles/firebaseauth.admin`). Genera una clave JSON y guárdala fuera del repositorio, por ejemplo en `%USERPROFILE%\.firebase-private\futbol-premier-staff.json`. Limita el acceso a esa clave y elimínala/ rótala cuando ya no la necesites. Nunca la compartas ni la subas a Git.
4. Desde la carpeta del proyecto, instala la herramienta local:

   ```powershell
   npm install --prefix tools/staff-roles
   $env:GOOGLE_APPLICATION_CREDENTIALS = "$HOME\.firebase-private\futbol-premier-staff.json"
   ```

5. Asigna el rol usando el UID copiado:

   ```powershell
   node tools/staff-roles/set-role.js UID cajero
   ```

   Para un proveedor, usa `node tools/staff-roles/set-role.js UID proveedor`.

6. La persona inicia sesión normalmente con su correo y contraseña. Si ya tenía una sesión abierta, debe cerrar sesión y volver a entrar para cargar el custom claim del rol.

La herramienta local verifica que la credencial pertenezca a `futbol-premier-6cc4e` y solo permite asignar `cajero` o `proveedor`. No crea contraseñas ni las guarda en Firebase Realtime Database.

## 3. Publicar reglas de Realtime Database

Publica [database.rules.json](./database.rules.json) en **Realtime Database → Rules**. También puedes hacerlo desde la carpeta del proyecto con `npx firebase-tools deploy --project futbol-premier-6cc4e --only database`; este despliegue solo actualiza reglas y no requiere Cloud Functions ni activar Blaze.

Las reglas permiten a Cajeros consultar perfiles y pedidos, y actualizar el estado de pedidos. Los Proveedores pueden leer el catálogo y cambiar únicamente los campos de existencias y disponibilidad. La cuenta administradora conserva sus permisos actuales. Antes de crear roles, publica estas reglas.

## 4. Fotos de referencia de encargos

Las fotos no se suben a Firebase. El formulario guarda la solicitud en Realtime Database y, si el cliente selecciona una imagen (JPG, PNG o WebP, hasta 5 MB), le muestra un enlace de WhatsApp con los detalles del encargo. El cliente debe pulsar el enlace y adjuntar la foto en WhatsApp. Así se puede usar la función sin activar Cloud Storage ni asociar una cuenta de facturación.

## 5. Configurar App Check

Para proteger el servicio:

La casilla obligatoria del formulario de acceso es una comprobación de interfaz y no sustituye un CAPTCHA validado en servidor; no la uses como protección contra bots. Para producción, App Check es independiente y debe configurarse correctamente antes de volver obligatoria su validación.

1. En **App Check**, registra la aplicación web con el proveedor reCAPTCHA v3 y agrega el dominio público autorizado.
2. Copia la clave pública del sitio en `FIREBASE_APP_CHECK_SITE_KEY` en [index.html](./index.html).
3. Prueba el sitio y confirma en App Check que la aplicación genera tokens válidos.
4. Solo entonces activa la aplicación de App Check para **Realtime Database** en Firebase Console.

No actives la aplicación obligatoria antes de publicar el sitio con la clave correcta: Firebase rechazará las lecturas y escrituras de catálogo, perfiles y pedidos.

## 6. Comprobación

- Registra la cuenta de prueba Rodrigo o una cuenta de cliente con un correo accesible, confirma el correo y comprueba que su UID aparece en el perfil.
- Inicia sesión con esa cuenta y confirma un pedido. El pedido se guarda con estado `pendiente` en `/pedidos/{uid}` y aparece en el historial de esa cuenta.
- Inicia sesión con `FUTADMI` (o el correo administrador), abre **Clientes y pedidos** y comprueba que se muestran clientes, IDs y pedidos.
- Abre **Equipo**, sigue las instrucciones para crear en Authentication y asignar cada rol desde la herramienta local. Al iniciar sesión con la cuenta, el icono del encabezado debe mostrar su nombre y rol.
- Confirma que el Cajero puede consultar pedidos y cambiar su estado, pero no ve herramientas administrativas ni de proveedor.
- Confirma que el Proveedor puede actualizar existencias, pero no puede acceder a clientes, pedidos ni a las herramientas administrativas.
- Envía un encargo de prueba con y sin referencia; con foto, comprueba que el enlace abre WhatsApp y pide adjuntar la imagen. El administrador puede revisar las solicitudes en la pestaña **Encargos** y actualizar su estado.
- Prueba desde una sesión no autenticada que el catálogo se puede leer, pero que no se pueden modificar productos ni consultar datos personales.

Los pedidos de este sitio registran la solicitud enviada a WhatsApp; el pago se verifica manualmente con el comprobante. Los artículos y los importes provienen del navegador del comprador, así que revísalos con el mensaje de WhatsApp antes de aceptar el pedido. No se deben tratar como pagos confirmados automáticamente.
