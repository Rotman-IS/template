## Why

La invitación se presenta hoy en una columna de ancho fijo (`--ancho: 430px`) y toda la CSS de la invitación —`Photo`, `Ornamento` y las 10 secciones, líneas 436→936 de `src/App.css`— no declara ni un solo `@media`. Eso produce dos problemas opuestos:

- **Por debajo de 430px** la columna sí encoge (`max-width: 100%`) pero los tamaños interiores no: tipografía en px absolutos, `.itinerario__hito` con un nodo de 46px más dos columnas de texto, y un `overflow-x: hidden` en `#root` que **recorta en silencio** cualquier desborde en lugar de evidenciarlo.
- **Por encima de 430px** el lienzo nunca crece, y en escritorio la tira angosta sobre un fondo plano se lee como un defecto de maquetación y no como una decisión.

La respuesta no es convertir la invitación en una landing de ancho completo: una invitación digital debe verse igual de íntima en el teléfono de la abuela que en una laptop. La respuesta es que la columna sea **deliberada**: fluida hacia abajo, un poco más generosa en escritorio, y con el espacio lateral tratado como parte del diseño.

## What Changes

- **Columna adaptativa en tres regímenes**: fluida por debajo de 430px, 430px en teléfono y tablet en vertical, y ensanchada a ~540px en escritorio. El contenido nunca se estira a lo ancho de la ventana.
- **Escala tipográfica ligada a la columna, no al viewport**: `#root` pasa a ser un contenedor de consulta (`container-type: inline-size`) y los tamaños de display (`h1`, nombre de portada, despedida de cierre) se expresan con `clamp()` en unidades `cqi`. Una sola declaración cubre los tres regímenes y elimina los saltos por breakpoint.
- **Decoración del espacio lateral**: `--page-bg` deja de ser un color plano y pasa a llevar una decoración sutil en CSS pura (sin assets nuevos), visible solo cuando existen márgenes laterales.
- **Blindaje del rango angosto (280–430px)**: `.itinerario__hito` reflowa a una disposición que cabe en columnas estrechas, los bloques de texto largo reciben `overflow-wrap`, y se retira la dependencia de `overflow-x: hidden` como red de seguridad — el desborde debe dejar de ocurrir, no dejar de verse.
- **BREAKING (a nivel de spec, no de código)**: el escenario "Vista en escritorio" de `invitacion-estructura` cambia de "columna angosta invariable" a "columna adaptativa acotada".

## Capabilities

### New Capabilities

Ninguna. El cambio reescribe requirements de capabilities existentes; introducir una capability `invitacion-responsive` paralela duplicaría el gobierno del contenedor y de la tipografía, que ya viven en `invitacion-estructura` e `invitacion-estilo`.

### Modified Capabilities

- `invitacion-estructura`: el requirement **Contenedor de ancho móvil** se reescribe como contenedor de columna adaptativa con tres regímenes acotados, y se le suma un requirement de **ausencia de desborde horizontal** que prohíbe usar `overflow-x: hidden` como remedio.
- `invitacion-estilo`: el requirement **Tipografía de la invitación** gana la escala fluida ligada al ancho de la columna; el requirement **Paleta lavanda sobre crema** gana la decoración del fondo de página, expresada en tokens y sin assets nuevos.
- `invitacion-secciones`: el requirement **Sección Itinerario** gana un escenario de reflow en columnas estrechas.

## Impact

- `src/index.css` — token `--ancho`, `container-type` y tokens de escala tipográfica en `:root`, reglas `h1` / `#root` / `body`.
- `src/App.css` — bloques `Layout base`, `Portada`, `Itinerario`, `Cierre`; posibles ajustes menores en `Galería` y `Vestimenta`.
- Ningún componente `.tsx` cambia: no se agregan clases nuevas al JSX salvo que el reflow del itinerario lo exija, y en ese caso se resuelve en CSS sobre el marcado actual.
- Sin dependencias nuevas, sin assets nuevos, sin cambio en el tamaño del bundle.
- `npm run build` sigue siendo la única puerta de verificación; el cambio es exclusivamente de CSS, así que la validación real es visual en los anchos 320 / 390 / 430 / 768 / 1440.
