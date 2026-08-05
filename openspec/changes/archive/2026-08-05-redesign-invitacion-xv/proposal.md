## Why

La plantilla actual es un landing de marketing genérico (hero, servicios, precios, FAQ, contacto) que no sirve al uso que se le quiere dar: una invitación digital de XV años de scroll vertical, formato móvil, estética acuarela lila sobre papel crema. La diferencia no es de copia ni de color: cambian el contenedor, la tipografía, la ausencia de navegación y la naturaleza misma de las secciones. Se reemplaza la composición completa conservando el código anterior como referencia.

## What Changes

- **BREAKING**: `App.tsx` deja de componer el landing y pasa a componer la invitación. Los imports y el JSX de `Header`, `Footer`, `Hero`, `About`, `Services`, `Pricing`, `FAQ` y `Contact` quedan **comentados**, no eliminados.
- Se crean 10 secciones nuevas en `src/components/sections/`, en orden de documento: `Portada`, `Padres`, `Fecha`, `Recepcion`, `Itinerario`, `Vestimenta`, `Galeria`, `Regalos`, `Confirmar`, `Cierre`.
- Se crean 2 primitivos nuevos en `src/components/ui/`: `Photo` (marcador visible de imagen, con variante de marco en arco) y `Ornamento` (decoraciones florales y separadores, `aria-hidden`).
- `src/index.css` cambia sus tokens de diseño a la paleta lavanda/crema, incorpora una fuente caligráfica y una serif con tracking amplio, reduce `#root` de `1126px` a ancho móvil, y **elimina el bloque `@media (prefers-color-scheme: dark)`**: la pieza es clara por diseño.
- `src/App.css` recibe banners nuevos por sección; los banners existentes (`Header`, `Hero`, `Card`, `Pricing`, `FAQ`, `Contact`, `Input`, `Modal`, `Footer`…) quedan intactos.
- `public/icons.svg` recibe `<symbol>`s nuevos para los iconos del itinerario y del código de vestimenta.
- Se agrega una cuenta regresiva en vivo hacia la fecha del evento: el primer componente de la plantilla con estado temporal.
- Los datos son **genéricos** (nombre, padres, fecha, salón como marcadores editables), no los de la imagen de referencia.
- Fuera de alcance: reproductor de audio, router, modo oscuro.
- **No se borra nada**: `Card`, `Input`, `Modal`, `Button`, `Title`, las 6 secciones viejas, `Header` y `Footer` permanecen en el repo.

## Capabilities

### New Capabilities
- `invitacion-estructura`: composición de la página, orden de secciones, contenedor de ancho móvil y conservación comentada del landing anterior.
- `invitacion-secciones`: las 10 secciones de contenido de la invitación, su contenido genérico editable y el patrón de arrays a nivel de módulo.
- `cuenta-regresiva`: cuenta regresiva en vivo en días, horas, minutos y segundos hacia la fecha del evento, con comportamiento definido al vencerse.
- `invitacion-estilo`: tokens de diseño, tipografía, ausencia de modo oscuro y organización del CSS.
- `invitacion-placeholders`: marcadores de imagen y ornamentos decorativos, incluidos los símbolos SVG de iconos.

### Modified Capabilities

(Ninguna: `openspec/specs/` está vacío; no hay requisitos previos que modificar.)

## Impact

- **Código modificado**: `src/App.tsx`, `src/index.css`, `src/App.css`, `public/icons.svg`.
- **Código nuevo**: 10 archivos en `src/components/sections/`, 2 en `src/components/ui/`.
- **Código intacto pero inactivo**: `src/components/layout/Header.tsx`, `Footer.tsx` y las 6 secciones del landing. Siguen compilando porque `tsc -b` los incluye; sus imports de `Card`/`Input` los mantienen referenciados.
- **Riesgo conocido**: los tokens de `:root` y el ancho de `#root` son globales, así que descomentar el landing viejo no lo restaura visualmente. Se acepta a cambio de no introducir un wrapper que la invitación no necesita.
- **Gate de verificación**: `npm run build`. `noUnusedLocals` obliga a comentar import y uso a la vez; comentar solo el JSX rompe la compilación.
- **Dependencias**: se agrega una fuente web (Google Fonts vía `@import`). No hay dependencias de npm nuevas.
