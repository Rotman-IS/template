## 1. Base visual

- [x] 1.1 Reemplazar los tokens de `:root` en `src/index.css` por la paleta lavanda sobre crema (`--bg`, `--text`, `--text-h`, `--accent`, `--accent-bg`, `--accent-border`, `--border`, `--shadow`)
- [x] 1.2 Eliminar el bloque `@media (prefers-color-scheme: dark)` de `src/index.css`
- [x] 1.3 Agregar el `@import` de Google Fonts y declarar los tres roles tipográficos como tokens (`--script`, `--heading` serif con tracking, `--sans` de texto), cada uno con familia de reserva del sistema
- [x] 1.4 Reducir el ancho de `#root` de `1126px` al ancho móvil de la invitación y ajustar los estilos base de `h1`/`h2` a la nueva escala tipográfica
- [x] 1.5 Verificar con `npm run dev` que la pieza queda en una columna angosta centrada, sin scroll horizontal, y sin invertir colores en un dispositivo con tema oscuro

## 2. Primitivos y assets

- [x] 2.1 Crear `src/components/ui/Photo.tsx`: default export, clase BEM fija, props nativas por tipo intersección, prop de etiqueta y prop de variante para el marco en arco
- [x] 2.2 Crear `src/components/ui/Ornamento.tsx`: default export, `aria-hidden`, variantes de esquina floral y de separador
- [x] 2.3 Agregar a `public/icons.svg` los `<symbol>` de itinerario y vestimenta (corona, cruz, copa/cena, vestido, reloj, traje, sobre, calendario), con `fill`/`stroke` en `currentColor` y sin tocar los símbolos existentes
- [x] 2.4 Agregar a `src/App.css` los banners `Photo` y `Ornamento` con sus reglas, incluida la relación de aspecto reservada y la variante de arco

## 3. Secciones de la primera mitad

- [x] 3.1 Crear `src/components/sections/Portada.tsx`: cita de apertura, ornamento de corona, rótulo "MIS XV AÑOS", `Photo` principal y nombre en caligráfica; contenido en constantes a nivel de módulo, sin exportarlas
- [x] 3.2 Crear `src/components/sections/Padres.tsx`: fórmula de acompañamiento, nombres de los padres y frase de invitación
- [x] 3.3 Crear `src/components/sections/Fecha.tsx`: mes, día de semana, número de día dominante y año, con la constante única de fecha del evento
- [x] 3.4 Implementar la cuenta regresiva dentro de `Fecha.tsx`: `useState` + `useEffect` con intervalo de 1s, limpieza al desmontar, cuatro unidades con etiquetas Días/Horas/Min/Seg, relleno a dos dígitos y ceros —nunca negativos— si la fecha ya pasó
- [x] 3.5 Crear `src/components/sections/Recepcion.tsx`: hora, salón, ciudad, botón "Ver ubicación" usando el primitivo `Button` existente hacia la URL de la constante en pestaña nueva, y `Photo`
- [x] 3.6 Agregar a `src/App.css` los banners y reglas BEM de `Portada`, `Padres`, `Fecha` (incluida la cuenta regresiva) y `Recepcion`

## 4. Secciones de la segunda mitad

- [x] 4.1 Crear `src/components/sections/Itinerario.tsx`: array de hitos a nivel de módulo (`id`, `hora`, `label`, `icon`) renderizado como línea de tiempo vertical con `<use href="/icons.svg#...">`
- [x] 4.2 Crear `src/components/sections/Vestimenta.tsx`: código de vestimenta, iconos de atuendo y nota de colores reservados
- [x] 4.3 Crear `src/components/sections/Galeria.tsx`: `Photo` destacado con la variante de marco en arco
- [x] 4.4 Crear `src/components/sections/Regalos.tsx`: título, texto explicativo y modalidad de obsequio destacada
- [x] 4.5 Crear `src/components/sections/Confirmar.tsx`: llamado a confirmar, fecha límite antes del botón, y botón que abre la URL de la constante en pestaña nueva
- [x] 4.6 Crear `src/components/sections/Cierre.tsx`: nota final para los invitados y despedida en caligráfica
- [x] 4.7 Agregar a `src/App.css` los banners y reglas BEM de `Itinerario` (eje vertical y nodos), `Vestimenta`, `Galeria`, `Regalos`, `Confirmar` y `Cierre`

## 5. Composición y cierre

- [x] 5.1 En `src/App.tsx`, comentar juntos el `import` y el uso en JSX de `Header`, `Footer`, `Hero`, `About`, `Services`, `Pricing`, `FAQ` y `Contact`
- [x] 5.2 En `src/App.tsx`, importar y componer las 10 secciones nuevas dentro de `<main>` en orden: `Portada`, `Padres`, `Fecha`, `Recepcion`, `Itinerario`, `Vestimenta`, `Galeria`, `Regalos`, `Confirmar`, `Cierre`
- [x] 5.3 Ejecutar `npm run build` y confirmar que pasa: ningún import comentado deja un identificador sin usar bajo `noUnusedLocals`
- [x] 5.4 Ejecutar `npm run lint` y confirmar que ningún módulo de sección exporta valores no-componente (regla de `eslint-plugin-react-refresh`)
- [x] 5.5 Verificar en `npm run dev` el recorrido completo en viewport móvil y en ventana ancha: orden de secciones, ausencia de scroll horizontal, marcadores de foto y ornamentos visibles, cuenta regresiva avanzando segundo a segundo
- [x] 5.6 Confirmar que `Header.tsx`, `Footer.tsx`, las 6 secciones del landing, `Card`, `Input`, `Modal` y sus bloques de CSS siguen presentes y sin editar
