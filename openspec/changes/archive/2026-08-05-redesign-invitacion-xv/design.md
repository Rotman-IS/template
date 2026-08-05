## Context

El repositorio es una plantilla de landing de marketing de una sola página: `main.tsx` monta `App`, y `App.tsx` compone `Header` + 6 secciones + `Footer` en orden de documento. Sin router, sin librería de estado, sin data fetching. Dos hojas de estilo globales (`index.css` con tokens y bases, `App.css` con todo el estilo de componentes en banners), clases BEM, `useState` local únicamente.

El objetivo es convertirla en una invitación digital de XV años: scroll vertical continuo, formato móvil, papel crema con acuarela lila, tipografía caligráfica y serif. La referencia visual es una pieza de tres tramos que en realidad es una sola columna larga.

Restricciones que condicionan el diseño:

- `tsconfig.app.json` activa `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly` y `verbatimModuleSyntax`. No hay test runner; `npm run build` es el único gate.
- `eslint-plugin-react-refresh` prohíbe que un módulo exporte un componente y además valores no-componente.
- El usuario pidió explícitamente **no borrar nada**: el landing anterior y los primitivos `Card`/`Input`/`Modal` se conservan.
- Fuera de alcance por decisión del usuario: reproductor de audio.

## Goals / Non-Goals

**Goals:**

- Que `App.tsx` componga la invitación completa, en el mismo estilo declarativo que hoy compone el landing.
- Que la copia sea editable desde constantes a nivel de módulo, sin tocar JSX.
- Que la ausencia de assets reales (fotos, acuarelas florales) sea visible y evidente, no un hueco silencioso.
- Que el landing anterior siga en el repo, compilando, disponible para leer.
- Que `npm run build` pase.

**Non-Goals:**

- Reproductor de audio (excluido explícitamente).
- Router, estado global, data fetching, backend de confirmación de asistencia.
- Modo oscuro.
- Reversibilidad visual perfecta del landing anterior.
- Reproducir la acuarela floral de la referencia con vectores dibujados a mano.

## Decisions

### 1. Reemplazo de composición, no coexistencia

`App.tsx` compone solo la invitación. La alternativa era mantener ambas experiencias tras un flag o un router, pero sin router eso exige o una dependencia nueva o una bifurcación condicional que no aporta valor a un repo con un solo producto vivo. Se descarta.

### 2. Preservación por comentario, con import y uso comentados juntos

Los imports y el JSX del landing se comentan en `App.tsx`; los archivos quedan intactos. La consecuencia técnica es dura y no negociable: **comentar solo el JSX rompe la compilación**, porque `noUnusedLocals` marca el import como declarado y no usado. Los dos van juntos, siempre.

Los archivos huérfanos siguen bajo `tsc -b` y deben seguir typechecando. `Pricing.tsx` y `Contact.tsx` mantienen vivos a `Card` e `Input` por referencia; `Modal.tsx` no lo importa nadie, pero un módulo entero sin importadores no es un error de `noUnusedLocals`, así que compila igual.

Alternativa considerada: mover el landing a un directorio `_legacy/` excluido del tsconfig. Más limpio conceptualmente, pero cambia rutas de archivos que el usuario pidió no tocar. Se descarta.

### 3. Tokens globales en `:root`, no un wrapper con scope

El ancho móvil y la paleta se aplican modificando `#root` y `:root` en `index.css`. La alternativa —una clase `.invitacion` que encapsule ancho y tokens— preserva la fidelidad visual del landing si algún día se descomenta, pero introduce un div envolvente que la invitación no necesita y una capa de indirección permanente para pagar por un escenario hipotético. Se elige tocar `:root`: el landing queda disponible como código, no como pieza restaurable.

### 4. Eliminación del bloque de modo oscuro

`@media (prefers-color-scheme: dark)` se elimina en vez de neutralizarse. Dejarlo con los mismos valores que el bloque claro sería ruido permanente que invita a divergir. Una invitación en papel crema no tiene contraparte oscura, y dejarlo activo la rompería en cualquier teléfono con tema oscuro —que es la mayoría del público real de la pieza.

### 5. Dos primitivos nuevos, ninguno eliminado

`Photo` y `Ornamento` se suman a `ui/` siguiendo la convención existente: default export, clase BEM fija, props nativas reenviadas por tipo intersección (`ImgHTMLAttributes<...> & {...}` o equivalente).

`Photo` resuelve el pedido explícito de marcadores. Reserva la relación de aspecto y muestra una etiqueta legible: el hueco se ve, se entiende y no salta cuando llegue la imagen real. Variante de arco para el marco redondeado.

`Ornamento` separa lo decorativo de lo semántico. Es `aria-hidden` por construcción, lo que evita que un lector de pantalla lea flores.

### 6. Assets: vector para iconos, marcador para las flores

Dos categorías con tratamiento distinto:

- **Iconos** (corona, copa, vestido, reloj): son line-art y se dibujan bien como `<symbol>` en `public/icons.svg`, que ya tiene el mecanismo montado. Heredan color vía `currentColor`.
- **Acuarelas florales de esquina**: no se intentan vectorizar. Una acuarela dibujada a mano con paths queda peor que un marcador honesto. Se renderizan como marcador identificable, sustituible después por PNG sin cambiar el punto de uso.

### 7. Fecha única compartida entre `Fecha` y la cuenta regresiva

La fecha del evento vive en una sola constante. Duplicarla entre la fecha mostrada y el objetivo del contador es la clase de inconsistencia que aparece justo cuando se cambia la fecha del evento, que es exactamente cuando importa.

Restricción de react-refresh: un módulo que exporta componente no puede exportar la constante. Si `Fecha` y la cuenta regresiva viven en módulos distintos, la constante necesita un módulo propio sin componentes. Si la cuenta regresiva es un componente interno del mismo archivo `Fecha.tsx`, la constante se queda local y no hace falta módulo extra. **Se opta por lo segundo**: la cuenta regresiva vive dentro de `Fecha.tsx`, que es donde la referencia la muestra.

### 8. Cuenta regresiva: `useState` + `useEffect` con intervalo

Único componente con estado temporal. `useState` local, `setInterval` de 1s, limpieza en el retorno del efecto. Sin negativos: si la fecha ya pasó se muestra `00` en las cuatro unidades. Relleno a dos dígitos para que el ancho no salte segundo a segundo.

### 9. Fuentes desde Google Fonts vía `@import`

Una línea, sin build step, sin binarios en el repo. El costo es una dependencia de red que la plantilla hoy no tiene: sin conexión, la pieza cae a las familias de reserva del sistema y pierde buena parte de su carácter. Alternativa: `.woff2` autoalojados en `public/` — mejor rendimiento y sin dependencia externa, pero agrega binarios y trabajo de subsetting. Se elige `@import` por simplicidad; migrar a autoalojado después es un cambio local a `index.css`.

## Risks / Trade-offs

- **Descomentar el landing no lo restaura visualmente** (tokens y ancho son globales) → Aceptado a conciencia; el valor de conservarlo es como referencia de código, no como pieza ejecutable. Queda documentado aquí y en el proposal.
- **Comentar solo el JSX rompe `npm run build`** → Regla explícita en el spec de estructura y verificación con `npm run build` al cerrar la tarea de composición.
- **La tipografía es la mayor parte del parecido con la referencia** → Se declara como tres roles tokenizados antes de maquetar las secciones, no al final; si las fuentes se dejan para el último paso, todas las secciones se maquetan contra una métrica equivocada.
- **Sin fuentes web disponibles la pieza se degrada mucho** → Cada token declara familia de reserva; se acepta la degradación.
- **La línea de tiempo del itinerario es el CSS más frágil** (eje vertical continuo con nodos alineados) → Se construye iterando un array, de modo que agregar o quitar hitos no exija retocar CSS.
- **Sin test runner, la única red de seguridad es el ojo** → `npm run build` cubre tipos, no apariencia. La verificación visual en viewport móvil y ancho es parte de las tareas, no un extra.
- **Los archivos huérfanos acumulan CSS y componentes que nadie renderiza** → Deuda aceptada por pedido explícito del usuario.

## Open Questions

- Los textos genéricos usan corchetes (`[Nombre de la quinceañera]`) como marcador. Si se prefiere prosa de ejemplo plausible en vez de marcadores explícitos, es un cambio de una línea por sección.
- La URL de confirmación de asistencia queda como marcador; si se define un destino real (WhatsApp, formulario), es editar una constante.
