## MODIFIED Requirements

### Requirement: Paleta lavanda sobre crema
Los tokens de diseño en `:root` de `src/index.css` SHALL definir la paleta de la invitación: fondo crema, texto y encabezados en violeta apagado, acento lavanda y bordes lila claro. Ningún color SHALL escribirse directamente en las reglas de `App.css`; todo color SHALL referirse a un token. El fondo de página que rodea la columna SHALL llevar una decoración sutil construida únicamente con CSS a partir de los tokens existentes, sin archivos de imagen, de modo que el espacio lateral en pantallas anchas se lea como parte del diseño y no como un vacío.

#### Scenario: Color nuevo requerido
- **WHEN** una sección necesita un color que no existe
- **THEN** se agrega como custom property en `:root` y se referencia por token, no se incrusta el valor en la regla

#### Scenario: Sin morado neón
- **WHEN** se inspeccionan los tokens
- **THEN** el acento es un lavanda apagado, no el `#aa3bff` del landing anterior

#### Scenario: Espacio lateral en escritorio
- **WHEN** la página se abre en una ventana de 1440px
- **THEN** el área fuera de la columna muestra la decoración del fondo de página, y la columna sigue distinguiéndose de ella por su fondo propio y su borde lateral

#### Scenario: Decoración sin costo en teléfono
- **WHEN** la página se abre en un viewport donde la columna ocupa todo el ancho
- **THEN** la decoración no es visible y no ha implicado la descarga de ningún asset adicional

#### Scenario: Decoración expresada en tokens
- **WHEN** se inspecciona la regla que pinta el fondo de página
- **THEN** sus colores provienen de custom properties, no de valores literales

### Requirement: Tipografía de la invitación
`src/index.css` SHALL declarar tres roles tipográficos como tokens: una caligráfica para nombres y despedida, una serif con tracking amplio para títulos en versalitas, y una de texto corrido legible. Las fuentes web SHALL cargarse desde Google Fonts mediante `@import`. La tipografía de display —`h1`, el nombre de la portada y la despedida del cierre— SHALL escalar de forma continua en función del ancho de la columna, no del ancho del viewport, mediante `clamp()` sobre unidades de contenedor, con un mínimo y un máximo explícitos. Los títulos de sección en versalitas y el texto corrido SHALL conservar tamaños fijos.

#### Scenario: Nombre de la quinceañera
- **WHEN** se renderiza el nombre en `Portada` o la despedida en `Cierre`
- **THEN** usan el token caligráfico

#### Scenario: Títulos de sección
- **WHEN** se renderiza un título como "ITINERARIO DE ACTIVIDADES"
- **THEN** usa el token serif en mayúsculas con letter-spacing amplio, en un tamaño fijo que no varía con el ancho

#### Scenario: Escalado del display entre regímenes
- **WHEN** la página se observa a 320px, a 430px y a 1440px de viewport
- **THEN** la tipografía de display crece de forma monótona con el ancho de la columna, sin saltos por breakpoint, y queda acotada por su mínimo y su máximo

#### Scenario: Ventana más ancha que el tope de la columna
- **WHEN** la ventana se ensancha más allá del punto en que la columna alcanza su tope de escritorio
- **THEN** la tipografía de display deja de crecer, porque está ligada al ancho de la columna y no al de la ventana

#### Scenario: Navegador sin unidades de contenedor
- **WHEN** la página se abre en un navegador que no soporta consultas de contenedor
- **THEN** la tipografía de display cae al valor mínimo del `clamp()` y el texto sigue siendo legible y contenido

#### Scenario: Fuente no disponible
- **WHEN** la fuente web no carga
- **THEN** cada token declara una familia de reserva del sistema y el texto sigue siendo legible

## ADDED Requirements

### Requirement: Ubicación de las reglas responsive
Las reglas que gobiernan el ancho de la columna, el contexto de consulta de contenedor, los tokens de escala tipográfica y la decoración del fondo de página SHALL vivir en `src/index.css`. Las reglas responsive propias de una sección SHALL vivir en `src/App.css` bajo el banner de esa sección. Los bloques del landing anterior en `App.css` SHALL permanecer intactos.

#### Scenario: Ajuste del ancho de la columna
- **WHEN** se revisa dónde está declarado `--ancho` y su breakpoint de escritorio
- **THEN** ambos están en `index.css`, no dispersos en `App.css`

#### Scenario: Reflow propio de una sección
- **WHEN** una sección necesita reorganizarse en anchos angostos
- **THEN** su media query se declara en `App.css`, bajo el banner de esa sección, sobre clases BEM ya existentes
