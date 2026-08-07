## 1. Columna adaptativa

- [x] 1.1 En `src/index.css`, cambiar `--ancho` de `430px` a `min(430px, 100%)` y agregar un bloque `@media (min-width: 900px)` que lo redefina a `540px`
- [x] 1.2 Verificar que ninguna regla de `src/App.css` codifique el ancho de la columna por su cuenta; si aparece alguna, derivarla de `var(--ancho)`
- [x] 1.3 Comprobar en el navegador que la columna mide 320 / 430 / 430 / 540px a viewports de 320 / 430 / 768 / 1440px

## 2. Escala tipográfica ligada al contenedor

- [x] 2.1 Agregar `container-type: inline-size` a la regla `#root` de `src/index.css`
- [x] 2.2 Declarar en `:root` los tokens de escala de display: `--display-1: clamp(34px, 10.4cqi, 54px)` y `--display-2: clamp(30px, 9.2cqi, 46px)` (valores indicativos, a calibrar en la tarea 5.2)
- [x] 2.3 Aplicar `--display-1` a `h1` en `index.css` y eliminar su `@media (max-width: 480px)` con el `font-size: 40px`
- [x] 2.4 Aplicar `--display-2` a `.cierre__despedida` en `src/App.css`, bajo el banner `Cierre`
- [x] 2.5 Eliminar el `@media (max-width: 480px)` de `:root` en `index.css` que baja el `font-size` base a 16px, si tras el cambio ya no aporta; conservarlo si el texto corrido lo sigue necesitando a 320px
- [x] 2.6 Confirmar que `h2` y `h3` conservan sus tamaños fijos y su `letter-spacing`

## 3. Decoración del fondo de página

- [x] 3.1 Agregar en `:root` los tokens necesarios para la decoración, derivados de la paleta existente
- [x] 3.2 Aplicar la decoración sobre `body` en `index.css` con gradientes CSS y la textura de puntos de 18px, sin ningún archivo de imagen y sin colores literales en la regla
- [x] 3.3 Verificar que la columna sigue distinguiéndose del lienzo por su fondo propio y su `border-inline`, y que la decoración no compite con el ornamento floral

## 4. Blindaje del rango angosto

- [x] 4.1 Eliminar `overflow-x: hidden` de la regla `#root` en `index.css`
- [x] 4.2 Agregar `overflow-wrap: anywhere` a `h1`, `.portada__nombre` y `.cierre__despedida`
- [x] 4.3 Bajo el banner `Itinerario` de `App.css`, agregar un `@media (max-width: 380px)` que cambie `.itinerario__hito` a `grid-template-columns: auto auto 1fr`, alinee `.itinerario__hora` y `.itinerario__label` a la izquierda, y reposicione el `::before` del 50% a la coordenada del nodo
- [x] 4.4 Confirmar que `src/components/sections/Itinerario.tsx` no cambia
- [x] 4.5 Probar el itinerario a 320px con una etiqueta larga temporal (p. ej. `"Vals con el padre"`) y revertirla después de comprobar el reflow

## 5. Verificación

- [x] 5.1 Recorrer la página completa a 320, 360, 390, 430, 768, 900 y 1440px comprobando que no aparece scroll horizontal ni texto recortado en ninguna sección
- [x] 5.2 Calibrar visualmente los valores de `--display-1` y `--display-2`, y el tope de `--ancho`, ajustando los `max-width: 300px` interiores solo si la desproporción en escritorio lo justifica
- [x] 5.3 Ejecutar `npm run build` y confirmar que compila sin errores
- [x] 5.4 Ejecutar `npm run lint` y confirmar que no aparecen advertencias nuevas
- [x] 5.5 Verificar que los bloques del landing anterior en `App.css` (`Header`, `Hero`, `Card`, `Pricing`, `FAQ`, `Contact`, `Input`, `Modal`, `Footer`) siguen sin editar
