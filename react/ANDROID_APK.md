# Crear la APK de Android

Esta aplicación usa React + Vite y vive dentro de la carpeta `react/`. Capacitor permite empaquetar la web compilada en una aplicación Android sin reescribir las páginas en Kotlin.

## Requisitos

- Node.js 22 o superior para Capacitor 8.
- Android Studio 2025.2.1 o superior.
- Un Android SDK instalado desde **Android Studio → Tools → SDK Manager**.

La guía oficial de requisitos está en https://capacitorjs.com/docs/getting-started/environment-setup.

## Primera instalación

Abre una terminal en la carpeta `react/`:

```bash
cd react
npm install @capacitor/core @capacitor/android
npm install --save-dev @capacitor/cli
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

El archivo `capacitor.config.json` de esta carpeta ya define el nombre, identificador de la app y la carpeta `dist` que genera Vite. No ejecutes `npx cap init` salvo que quieras volver a crear la configuración.

Si `npx cap add android` indica que la plataforma ya existe, no la vuelvas a crear; ejecuta `npm run build` y `npx cap sync android`.

## Generar el APK instalable

1. Android Studio abrirá la carpeta `react/android`. Espera a que termine la sincronización de Gradle.
2. En el menú, selecciona **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
3. Cuando termine, pulsa el enlace para localizar el archivo. Normalmente el APK de prueba queda en:

   `react/android/app/build/outputs/apk/debug/app-debug.apk`

4. Copia ese APK al teléfono Android y ábrelo para instalarlo. Es posible que Android solicite permitir la instalación desde esa fuente.

Este APK de depuración sirve para probar o entregar una versión instalable. Para distribuir una versión de producción, usa **Build → Generate Signed Bundle / APK** y guarda la clave de firma en un lugar seguro. Para Google Play normalmente se entrega un Android App Bundle (.aab), no el APK de depuración.

## Cada vez que cambies la web

Desde la carpeta `react/`, ejecuta:

```bash
npm run build
npx cap sync android
npx cap open android
```

Después vuelve a generar el APK en Android Studio. La app empaqueta todo lo que produce `vite build`, incluidas las páginas y el juego. Las funciones que consultan servicios externos (por ejemplo, videos de YouTube o imágenes obtenidas desde una wiki) necesitan conexión a Internet.

## Importante para Git

La primera vez que añadas la plataforma, Capacitor creará la carpeta `android/` y la instalación actualizará `package.json` y `package-lock.json`. Guarda esos cambios en Git junto con `capacitor.config.json`, pero no subas contraseñas, claves privadas de firma ni archivos de configuración secretos.

## Referencias oficiales

- Instalación y configuración: https://capacitorjs.com/docs/getting-started
- Requisitos para Android: https://capacitorjs.com/docs/getting-started/environment-setup
- Configuración de Capacitor: https://capacitorjs.com/docs/config
