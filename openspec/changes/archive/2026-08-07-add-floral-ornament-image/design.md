## Context

`Ornamento` ([src/components/ui/Ornamento.tsx](../../../src/components/ui/Ornamento.tsx)) es un primitivo presentacional con tres variantes. La variante `floral` es la única que sigue siendo un andamio: renderiza `<span class="ornamento__marcador">floral</span>`, dibujado por [App.css:521](../../../src/App.css#L521) como un círculo punteado de 108×108. Se usa seis veces, en tres secciones y en las cuatro esquinas:

```
Portada                Galeria                Cierre
┌───────────────┐      ┌───────────────┐      ┌───────────────┐
│(sup-izq)(sup-der)    │        (sup-der)     │               │
│               │      │               │      │               │
│               │      │(inf-izq)      │      │(inf-izq)(inf-der)
└───────────────┘      └───────────────┘      └───────────────┘
```

El asset disponible, `src/assets/floral1SB.webp`, es de 1376×768 (≈1.79:1), tiene canal alfa, y no es un adorno genérico: es una **esquina** de acuarela cuya masa floral ocupa el ángulo superior izquierdo y se difumina hacia la diagonal, dejando la mitad inferior derecha del lienzo prácticamente vacía.

```
 ┌──────────────────────┐
 │ 🌸🌿🌸────────╮      │
 │ 🌸🌸  ╲       ╰──    │
 │ 🌿🌸   ╲             │
 │  🌸     ╲            │   ← transparente
 │   ·      ╲           │
 └──────────────────────┘
```

Esa asimetría es el hecho de diseño central: la caja cuadrada del marcador de posición no le sirve, y una sola imagen tiene que cubrir cuatro esquinas.

Restricciones del repo: CSS plano y global, clases BEM que viven solo en `App.css`, cero estilos en línea, cero librerías. TypeScript estricto con `verbatimModuleSyntax`. `eslint-plugin-react-refresh` prohíbe que un módulo que exporta un componente exporte además valores no-componente.

## Goals / Non-Goals

**Goals:**

- Mostrar el arte floral real en las seis esquinas, derivándolo de un único archivo.
- Conservar el marcador punteado como estado válido cuando no se provee imagen, no como código muerto.
- Mantener las esquinas visualmente simétricas y contenidas dentro de la sección.
- Mantener `Ornamento` sin estado y puramente presentacional, como el resto de `components/ui/`.

**Non-Goals:**

- Recuperación en tiempo de ejecución ante un fallo de carga (`onError`, estado, imagen de respaldo).
- Mover el asset a `public/` o referenciarlo por ruta literal.
- Recortar, reorientar o generar variantes del `.webp` fuera de la app.
- Cualquier cambio en las variantes `icono` y `separador`.
- Nuevos tokens de color; `src/index.css` no se toca.

## Decisions

### 1. Fallback por autoría, no por red

`Ornamento` recibe una prop opcional `imagen?: string`; la sección la provee importando el asset. Sin prop, sale el marcador punteado.

Se descartaron dos alternativas discutidas explícitamente:

- **Tolerar que el archivo falte del repo.** Exigiría referenciar el asset por ruta desde `public/`, perdiendo el hashing y la verificación de Vite. Un asset ausente es un error del autor de la plantilla, y un build roto lo comunica mejor que un círculo punteado que nadie nota.
- **`onError` sobre el `<img>`.** Obligaría a meter `useState` en un primitivo presentacional para cubrir un fallo de red que, con el asset en el bundle, no puede ocurrir.

Lo que queda es el caso real: alguien reutiliza la plantilla para otro evento y todavía no tiene arte floral. Ese caso se resuelve no pasando la prop, y es el mismo idioma que ya usa [Photo.tsx](../../../src/components/ui/Photo.tsx) con su rótulo "reemplazar por imagen".

Las secciones importan el asset, no el componente `ui/`. `Ornamento` sigue sin conocer ningún archivo concreto, y las secciones siguen siendo el lugar donde vive el contenido — coherente con la convención de que cada sección posee su copia en constantes de módulo.

### 2. Render exclusivo: imagen **o** marcador, nunca ambos

```
variant === 'floral'
   ├── imagen  → <img class="ornamento__img" alt="" loading="lazy" />
   └── sin ella → <span class="ornamento__marcador">floral</span>
```

Se consideró apilar el `<img>` sobre el marcador con `position: absolute; inset: 0`, de modo que un 404 dejara ver el círculo punteado por debajo. Se descarta por coherencia con la decisión 1: sería precisamente el fallback de red que no queremos, y además obliga a que el círculo punteado se pinte siempre aunque nunca se vea, con el borde asomando por los bordes transparentes del PNG.

El contenedor conserva `aria-hidden="true"`, así que el `alt=""` es redundante pero correcto; `loading="lazy"` evita que seis imágenes decorativas compitan con la foto principal de la portada.

### 3. Cuatro orientaciones por `transform`, no cuatro archivos

```
   sup-izq          sup-der            inf-izq            inf-der
  (sin transform)  scaleX(-1)         scaleY(-1)         rotate(180deg)
   🌸────           ────🌸            ╲   ·              ·   ╱
   🌸  ╲           ╱  🌸            🌸  ╱              ╲  🌸
    🌸  ╲         ╱  🌸            🌸────              ────🌸
```

Un solo archivo en el bundle en lugar de cuatro (~107 KB en vez de ~428 KB), y una sola pieza de arte que mantener. Las reglas cuelgan de las clases `ornamento--<posicion>` que ya existen, así que no hace falta ninguna prop nueva para la orientación. En acuarela sin dirección de luz marcada, el reflejo no se percibe.

Un ornamento floral sin `posicion` no recibe transformación — es el caso base, no un error.

### 4. Dimensionado: proporción del asset, ancho relativo, tope en píxeles

El bloque `.ornamento--floral` deja de ser `108px × 108px` con borde punteado. Pasa a:

- `aspect-ratio: 1376 / 768` — la proporción del asset, para que la imagen nunca se deforme;
- un ancho relativo al ancho de la sección con `max-width` en píxeles — escala en móvil y no se desboca en escritorio;
- sin `overflow` ni valores negativos en `top/left/bottom/right`: el ornamento se ancla a `0` en sus dos bordes y queda íntegro dentro de la caja de la sección.

La simetría sale gratis de aquí: las cuatro posiciones comparten dimensiones y desplazamiento cero, así que dos esquinas opuestas ocupan áreas idénticas a distancias idénticas de su borde. Se descartó el sangrado fuera de la sección (que habría pedido `overflow: hidden` en `Portada` y `Cierre`, donde hoy no existe) precisamente porque rompe esa simetría.

El estilo del marcador punteado —borde, radio, tipografía— se mueve a `.ornamento__marcador`, que es quien realmente lo necesita. Así el contenedor define geometría y el hijo define apariencia, y el marcador puede seguir siendo un círculo dentro de una caja apaisada, o adaptarse, sin arrastrar al `<img>`.

Gotcha a tener presente: `section > *` ([App.css:13](../../../src/App.css#L13)) aplica `margin-inline: auto` a los ornamentos. En un elemento posicionado en absoluto con un solo borde horizontal fijado, los márgenes automáticos resuelven a `0`, así que no interfiere — pero conviene verificarlo visualmente y no asumirlo.

## Risks / Trade-offs

- **La imagen tapa contenido de la sección.** El ornamento crece de 108px a un porcentaje del ancho, y `Portada` apila cita, corona, rótulo y foto contra los bordes superiores. → El `z-index: 0` del ornamento frente al `z-index: 1` de `.portada__cita` ya establece el orden; falta ajustar el ancho relativo mirando las tres secciones en móvil y escritorio, no eligiéndolo a ciegas.

- **Un reflejo delator.** Si el arte tuviera una sombra o dirección de luz consistente, `scaleX(-1)` la invertiría y las esquinas superiores se leerían raras juntas. → Inspección visual de `Portada`, que es la única sección con dos ornamentos en la misma arista.

- **Peso en el primer render.** El `.webp` entra al bundle y `Portada` está por encima del pliegue, donde `loading="lazy"` no ayuda. → 107 KB en WebSP es asumible para una invitación; si molesta, es una optimización posterior (redimensionar el asset), no parte de este cambio.

- **El marcador punteado se vuelve un camino no ejercitado.** Al pasar `imagen` en las seis llamadas, nadie vuelve a ver el fallback y puede podrirse. → Los escenarios de la spec lo fijan como comportamiento requerido; comprobarlo una vez quitando la prop antes de dar por cerrado el cambio.

- **Ningún test automatizado.** El repo no tiene runner; `npm run build` solo cubre tipos. → La verificación es `npm run build` + `npm run lint` + revisión visual con `npm run dev`.
