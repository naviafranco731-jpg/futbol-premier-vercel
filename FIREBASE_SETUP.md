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

La cuenta se crea en Firebase Authentication y su perfil se guarda en `/usuarios/{uid}`. El dominio `.test` no recibe correo; para probar verificación, encargos o pedidos, usa una dirección real que controles y una contraseña segura y única. No guardes contraseñas en el repositorio.

## 2. Crear cuentas de Cajero y Empleado desde el panel

El panel llama a `/api/create-staff` en Vercel. El servidor valida el token de Firebase y solo acepta solicitudes de la cuenta administradora; la credencial de servicio nunca se envía al navegador. No requiere Firebase Cloud Functions ni el plan Blaze.

1. En **Google Cloud Console → IAM y administración → Cuentas de servicio**, crea una cuenta de servicio dedicada y asígnale únicamente **Firebase Authentication Admin** (`roles/firebaseauth.admin`).
2. Genera una clave JSON. No la subas a Git ni la pegues en el código o en el chat.
3. En Vercel, abre el proyecto `futbol-premier-vercel` → **Settings → Environment Variables**. Agrega `FIREBASE_SERVICE_ACCOUNT` para **Production** y pega el contenido completo del JSON como valor. Guarda y vuelve a desplegar Production para que la función reciba la variable.
4. En el sitio publicado, inicia sesión como administrador, abre **Equipo**, ingresa correo, contraseña temporal de al menos 12 caracteres y el rol **Cajero** o **Empleado**. Comunica la contraseña temporal directamente a esa persona.
5. La persona inicia sesión en **Ingresar / Mi cuenta** con su correo y contraseña. Si ya tenía una sesión abierta, debe salir y volver a entrar para cargar el rol.

El Cajero puede consultar pedidos, importes y pagos, registrar cobros completos en efectivo o QR y cerrar su caja diaria. El Empleado puede agregar productos y editar datos de catálogo, precio y existencias; no puede consultar pedidos ni ingresos. El pago se verifica manualmente, no se procesa en línea.

La herramienta local `tools/staff-roles/set-role.js` se conserva como alternativa de recuperación; requiere una credencial privada local y solo permite asignar `cajero` o `empleado`.

## 3. Publicar reglas de Realtime Database

Publica [database.rules.json](./database.rules.json) en **Realtime Database → Rules**. También puedes hacerlo desde la carpeta del proyecto con `npx firebase-tools deploy --project futbol-premier-6cc4e --only database`; este despliegue solo actualiza reglas y no requiere Cloud Functions ni activar Blaze.

Las reglas permiten a Cajeros consultar perfiles y pedidos, actualizar estados y registrar un pago completo una sola vez. Los Empleados pueden crear productos y editar solo el catálogo permitido. Los cierres de caja son personales por cuenta y día. La cuenta administradora conserva sus permisos actuales. Publica estas reglas antes de usar los roles nuevos.

## 4. Fotos de referencia de encargos

Las fotos no se suben a Firebase. El formulario guarda la solicitud en Realtime Database y, si el cliente selecciona una imagen (JPG, PNG o WebP, hasta 5 MB), le muestra un enlace de WhatsApp con los detalles del encargo. El cliente debe pulsar el enlace y adjuntar la foto en WhatsApp. Así se puede usar la función sin activar Cloud Storage ni asociar una cuenta de facturación.

## 5. CAPTCHA visual y App Check

El ingreso incluye un CAPTCHA visual sencillo con un código aleatorio que la persona debe escribir. Es una ayuda básica del lado del cliente; no es una verificación de servidor ni una protección sólida contra bots. No guardes ni confíes datos sensibles basándote en esta comprobación.

Para una protección más fuerte de los servicios Firebase, configura App Check:

1. En **App Check**, registra la aplicación web con el proveedor reCAPTCHA v3 y agrega el dominio público autorizado.
2. Copia la clave pública del sitio en `FIREBASE_APP_CHECK_SITE_KEY` en [index.html](./index.html).
3. Prueba el sitio y confirma en App Check que la aplicación genera tokens válidos.
4. Solo entonces activa la aplicación de App Check para **Realtime Database** en Firebase Console.

No actives la aplicación obligatoria antes de publicar el sitio con la clave correcta: Firebase rechazará las lecturas y escrituras de catálogo, perfiles y pedidos. App Check y el CAPTCHA visual tienen propósitos distintos; el código visual no envía ni valida tokens App Check.

## 6. Comprobación

- Registra la cuenta de prueba Rodrigo o una cuenta de cliente con un correo accesible, confirma el correo y comprueba que su UID aparece en el perfil.
- Inicia sesión con esa cuenta y confirma un pedido. El pedido se guarda con estado `pendiente` en `/pedidos/{uid}` y aparece en el historial de esa cuenta.
- Inicia sesión con `FUTADMI` (o el correo administrador), abre **Clientes y pedidos** y comprueba que se muestran clientes, IDs y pedidos.
- Abre **Equipo** y crea cada cuenta con el rol correspondiente. Al iniciar sesión con la cuenta, el icono del encabezado debe mostrar su nombre y rol.
- Confirma que el Cajero puede consultar pedidos, importes y pagos; registrar pagos y un cierre diario, pero no editar el catálogo.
- Confirma que el Empleado puede agregar productos y editar precio y existencias, pero no puede consultar clientes, pedidos ni ingresos.
- Envía un encargo de prueba con y sin referencia; con foto, comprueba que el enlace abre WhatsApp y pide adjuntar la imagen. El administrador puede revisar las solicitudes en la pestaña **Encargos** y actualizar su estado.
- Prueba desde una sesión no autenticada que el catálogo se puede leer, pero que no se pueden modificar productos ni consultar datos personales.

Los pedidos de este sitio registran la solicitud enviada a WhatsApp; el pago se verifica manualmente con el comprobante. Los artículos y los importes provienen del navegador del comprador, así que revísalos con el mensaje de WhatsApp antes de aceptar el pedido. No se deben tratar como pagos confirmados automáticamente.

## 7. Reportes administrativos

La pestaña **Reportes** es exclusiva del administrador y consulta Firebase en modo de solo lectura: obtiene productos de `/productos`, usuarios de `/usuarios` y pedidos de `/pedidos/{uid}` para los UID listados en `/usuarios`.

- Los pedidos se filtran por `fechaISO` de creación y sus estados reflejan el estado actual, no un historial. `completado` se muestra como entregado; `preparando` y `enviado` se agrupan como en proceso.
- Los ingresos y las unidades vendidas se filtran por `pago.fechaCaja` y consideran solo pagos con `pago.estado == "pagado"`. Los métodos implementados son `efectivo` y `qr`; no se reportan pagos con tarjeta como si existieran.
- El ranking usa los artículos (`items`) guardados en los pedidos pagados. Su importe es bruto (`precio × cantidad`): Firebase guarda el descuento en el pedido y no permite atribuirlo a cada jersey. El campo `productos.vendidos` no tiene fechas y no se usa para filtrar periodos.
- El inventario es una lectura actual, no histórica. Se consideran con stock bajo los productos con 1–3 unidades; agotados los marcados `agotado` o con stock cero. Los registros sin stock se identifican y no se clasifican como agotados.
- **Exportar a Excel** genera un `.xlsx` con cinco hojas. La librería de Excel se carga desde el CDN de SheetJS solo al exportar, por lo que esa acción requiere conexión a Internet; los datos del reporte se procesan en el navegador.
