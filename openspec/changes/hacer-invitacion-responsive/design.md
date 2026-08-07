## Context

La invitación vive en una única columna centrada: `#root { width: var(--ancho); max-width: 100% }` con `--ancho: 430px` en `src/index.css`, sobre un `body` pintado con `--page-bg`. Desde la línea 436 hasta el final de `src/App.css` —`Photo`, `Ornamento` y las 10 secciones— no hay ni un `@media`; los únicos breakpoints del archivo (480 / 768 / 900 / 1024px) pertenecen a los bloques del landing anterior, que ya no se renderiza.

Ese diseño de ancho fijo no es un descuido: la spec `invitacion-estructura` lo exige. Pero deja dos regímenes sin gobernar.

```
   ancho de viewport
   ─────────────────────────────────────────────────────────────▶
   280      360      430          768          900         1440
    │        │        │            │            │            │
    ├────────┴────────┤            │            │            │
    │  columna encoge │            │            │            │
    │  tipografía NO  │            │            │            │
    │  ⚠ sin gobierno │            │            │            │
    │                 ├────────────┴────────────┤            │
    │                 │  columna fija 430px     │            │
    │                 │  ✅ el caso diseñado    │            │
    │                 │                         ├────────────┤
    │                 │                         │ tira 430px │
    │                 │                         │ sobre color│
    │                 │                         │ plano      │
    │                 │                         │ ⚠ se lee   │
    │                 │                         │   como bug │
```

En el tramo angosto, `#root { overflow-x: hidden }` actúa como red de seguridad: si un título en fuente script desborda, no se ve el desborde — se ve el título recortado. Es un enmascaramiento, no una solución.

En el tramo ancho, la columna es correcta pero el vacío lateral no está tratado.

Restricciones heredadas del proyecto: CSS plana y global en dos archivos, clases BEM declaradas solo en `App.css`, cero estilos en línea, todo color a través de tokens de `:root`, sin modo oscuro, sin dependencias nuevas.

## Goals / Non-Goals

**Goals:**

- Que la columna tenga un ancho **acotado y deliberado** en los tres regímenes, sin puntos ciegos.
- Que la tipografía de display escale con **el ancho de la columna**, que es lo que realmente cambia, y no con el del viewport.
- Que el espacio lateral en escritorio se lea como parte del diseño.
- Que el rango 280–430px deje de depender de `overflow-x: hidden` para no romperse.
- Resolverlo con la menor cantidad de breakpoints posible: los saltos discretos son la principal fuente de regresiones visuales en este tipo de página.

**Non-Goals:**

- Convertir la invitación en una landing de ancho completo. Nada se estira a lo ancho de la ventana; no hay layouts multicolumna, ni galería en grid, ni portada a pantalla completa.
- Reintroducir modo oscuro, encabezado fijo o navegación por anclas.
- Escalar el texto corrido. En una columna de 540px un párrafo a 17px sigue siendo la medida correcta; agrandarlo empeora la lectura.
- Assets nuevos. La decoración del fondo es CSS pura.
- Tocar los bloques del landing anterior en `App.css`.

## Decisions

### 1. Tres regímenes, un token y un solo breakpoint

`--ancho` deja de ser una constante y pasa a expresar los tres tramos:

```css
:root  { --ancho: min(430px, 100%); }            /* fluido y teléfono/tablet vertical */
@media (min-width: 900px) { :root { --ancho: 540px; } }   /* escritorio */
```

El tramo fluido lo resuelve `min()` sin media query — ya es el comportamiento efectivo de `max-width: 100%`, pero declararlo en el token hace que **el resto de la CSS pueda derivar de él**.

**Por qué 900px y no 768px.** Un iPad en vertical (768–834px) leyendo una invitación se ve bien con la columna de teléfono: es el gesto natural del formato. Ensanchar ahí solo produce una columna a medias, ni íntima ni generosa. A 900px ya se está en escritorio o en tablet apaisada, donde el vacío lateral es grande y la columna sí gana con más aire.

**Por qué 540px y no 560px.** Con el padding lateral de 28px quedan 484px de contenido. Los bloques de texto de la invitación (`.portada__cita`, `.cierre__nota`, `.regalos__texto`) tienen `max-width: 300px` justamente porque una línea larga rompe el tono; 540px da aire sin invitar a estirar esos bloques. 560px empieza a pedir un rediseño de esos topes.

*Alternativa descartada:* escalar `--ancho` de forma continua con `clamp(320px, 40vw, 540px)`. Produce una columna que cambia de ancho al redimensionar la ventana en todo el rango, lo que hace imposible ajustar los `max-width: 300px` interiores contra algo estable.

### 2. La escala tipográfica se ancla al contenedor, no al viewport

Esta es la decisión central. `#root` pasa a ser un contexto de consulta de contenedor:

```css
#root { container-type: inline-size; }
```

y los tamaños de display se expresan con `clamp()` en unidades `cqi` (1cqi = 1% del ancho inline del contenedor):

| Elemento | Hoy | Propuesta (indicativa) | 320px | 430px | 540px |
|---|---|---|---|---|---|
| `h1` | 46px / 40px ≤480 | `clamp(34px, 10.4cqi, 54px)` | 34 | 45 | 54 |
| `.cierre__despedida` | 40px | `clamp(30px, 9.2cqi, 46px)` | 30 | 40 | 46 |

**Por qué `cqi` y no `vw`.** Con `vw`, la tipografía seguiría creciendo entre 900px y 1440px de ventana mientras la columna se queda quieta en 540px: el texto se saldría de su propio contenedor. Con `cqi`, el tamaño depende de lo único que de verdad varía. Una sola declaración cubre los tres regímenes y desaparecen los `@media` tipográficos de `index.css`.

**Por qué solo el display.** `h2`, `h3` y el cuerpo mantienen sus px absolutos. Un `h2` en versalitas con `letter-spacing: 0.22em` escalado fluidamente pierde el ritmo de tracking, y el cuerpo no gana nada.

*Soporte:* container queries son baseline desde 2023 en las cuatro máquinas de render. Un navegador sin soporte ignora `cqi` y cae en el `clamp()` mínimo — el texto queda pequeño pero legible, nunca roto.

*Efecto colateral a vigilar:* `container-type: inline-size` aplica `contain: layout style inline-size` sobre `#root`. Los `.ornamento--floral` son `position: absolute` contra un `section` que ya es `position: relative`, así que no se ven afectados. El `Modal` del landing anterior usa posicionamiento fijo, pero no se renderiza; si algún día se reactiva, este es el punto a revisar.

### 3. Decoración del fondo: CSS pura, ligada a los tokens

`--page-bg` deja de ser un color plano. La decoración se construye con un lavado radial en tonos ya existentes de la paleta más la misma textura de puntos de 18px que ya lleva `#root`, declarada sobre `body`. Todos los valores salen de tokens; el color literal no entra en la regla.

**Por qué CSS y no una imagen.** Un asset de fondo se descarga en teléfonos donde jamás será visible (no hay márgenes laterales por debajo de 430px). Un gradiente no pesa, escala a cualquier resolución y no compite con el ornamento floral, que ya es el elemento gráfico protagonista.

**Intensidad.** Muy baja. El objetivo es que el ojo lea "hay un lienzo detrás de la tarjeta", no que el fondo compita con el contenido. El borde lateral existente de `#root` (`border-inline: 1px solid var(--border)`) es lo que separa tarjeta de lienzo y se conserva.

### 4. Se retira la dependencia de `overflow-x: hidden`

`#root { overflow-x: hidden }` se elimina, y en su lugar se atacan las causas:

- `overflow-wrap: anywhere` en los bloques de display (`h1`, `.portada__nombre`, `.cierre__despedida`), que es donde un nombre largo en fuente script puede exceder la columna.
- El `clamp()` mínimo de la decisión 2, que ya impide que el display sea desproporcionado en 280px.

**Por qué retirarlo importa.** Mientras esté, cualquier regresión futura de desborde es invisible en el navegador y solo aparece como texto cortado. Quitarlo convierte un fallo silencioso en uno evidente durante el desarrollo. Si al validar apareciera un desborde que no se puede resolver en su origen, se documenta y se decide — no se vuelve a tapar por defecto.

### 5. Itinerario: reflow del riel a la izquierda en columnas estrechas

`.itinerario__hito` es hoy `grid-template-columns: 1fr auto 1fr` con el nodo de 46px centrado. A 280px de contenido quedan ~103px por columna de texto.

Con las etiquetas actuales (`Ceremonia`, `Bendición`, `Cena`, `Baile`, `Despedida`) eso **entra**. La medida es preventiva, no correctiva: la spec `invitacion-secciones` establece que el contenido es genérico y editable, así que una etiqueta como `"Vals con el padre"` es un uso previsto, y hoy quedaría partida en tres líneas contra un riel centrado.

Por debajo de ~380px la fila pasa a `auto auto 1fr`: hora y nodo a la izquierda, etiqueta ocupando todo el ancho restante y alineada a la izquierda. La línea vertical del `::before` se reposiciona del 50% a la coordenada del nodo. El marcado de `Itinerario.tsx` no cambia; el reflow es enteramente CSS sobre los tres `<span>` existentes.

*Alternativa descartada:* reducir el nodo de 46px a 36px en pantallas angostas. Gana 10px y encoge el único elemento gráfico de la sección.

### 6. Dónde vive cada regla

`index.css` toma lo que es global y tokenizado: `--ancho` y su media query, `container-type`, los tokens de escala de display, la regla `body` con la decoración. `App.css` toma lo que es de sección: el reflow del itinerario y los `overflow-wrap`, cada uno bajo su banner existente. Se respeta la separación que ya establece `invitacion-estilo`.

## Risks / Trade-offs

- **La columna de 540px hace que los `max-width: 300px` interiores se vean muy angostos en escritorio** → Es intencional: son topes de medida de línea, no de layout. Si al validar la desproporción molesta, el ajuste es subirlos a ~340px, no eliminarlos.

- **Quitar `overflow-x: hidden` puede destapar un desborde no previsto en alguna sección** → Es precisamente el objetivo. La validación a 320px es un paso explícito de `tasks.md`; cualquier desborde que aparezca se corrige en su origen antes de cerrar el cambio.

- **`container-type` sobre `#root` introduce contención de layout** → El único componente que podría verse afectado es el `Modal` del landing anterior, que no se renderiza. Documentado en la decisión 2.

- **Un solo breakpoint a 900px deja el tramo 430–900px con la columna quieta** → Es deliberado: es el rango de tablet vertical, donde la columna de teléfono es la lectura correcta del formato. Si se quisiera un paso intermedio, se agrega después sin tocar la estructura del token.

- **El cambio es 100% visual y no hay test runner** → `npm run build` solo garantiza que compila. La verificación real es la revisión manual en 320 / 390 / 430 / 768 / 1440px, listada como tarea.

- **La decoración del fondo puede quedar demasiado sutil o demasiado presente** → Es un parámetro de una sola línea; se calibra en revisión visual sin efectos en cascada.
