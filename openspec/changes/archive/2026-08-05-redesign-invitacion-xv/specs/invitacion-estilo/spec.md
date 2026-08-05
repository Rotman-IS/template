## ADDED Requirements

### Requirement: Paleta lavanda sobre crema
Los tokens de diseño en `:root` de `src/index.css` SHALL definir la paleta de la invitación: fondo crema, texto y encabezados en violeta apagado, acento lavanda y bordes lila claro. Ningún color SHALL escribirse directamente en las reglas de `App.css`; todo color SHALL referirse a un token.

#### Scenario: Color nuevo requerido
- **WHEN** una sección necesita un color que no existe
- **THEN** se agrega como custom property en `:root` y se referencia por token, no se incrusta el valor en la regla

#### Scenario: Sin morado neón
- **WHEN** se inspeccionan los tokens
- **THEN** el acento es un lavanda apagado, no el `#aa3bff` del landing anterior

### Requirement: Ausencia de modo oscuro
El bloque `@media (prefers-color-scheme: dark)` de `src/index.css` SHALL eliminarse. La invitación SHALL verse igual con independencia de la preferencia de tema del sistema.

#### Scenario: Dispositivo en modo oscuro
- **WHEN** la invitación se abre en un dispositivo con tema oscuro activo
- **THEN** se muestra con el fondo crema y la paleta clara, sin inversión de colores

### Requirement: Tipografía de la invitación
`src/index.css` SHALL declarar tres roles tipográficos como tokens: una caligráfica para nombres y despedida, una serif con tracking amplio para títulos en versalitas, y una de texto corrido legible. Las fuentes web SHALL cargarse desde Google Fonts mediante `@import`.

#### Scenario: Nombre de la quinceañera
- **WHEN** se renderiza el nombre en `Portada` o la despedida en `Cierre`
- **THEN** usan el token caligráfico

#### Scenario: Títulos de sección
- **WHEN** se renderiza un título como "ITINERARIO DE ACTIVIDADES"
- **THEN** usa el token serif en mayúsculas con letter-spacing amplio

#### Scenario: Fuente no disponible
- **WHEN** la fuente web no carga
- **THEN** cada token declara una familia de reserva del sistema y el texto sigue siendo legible

### Requirement: Organización del CSS
Los estilos de las secciones nuevas SHALL vivir en `src/App.css`, agrupados bajo banners `/* ---------- Nombre ---------- */`, con clases BEM. Los banners y reglas del landing anterior SHALL permanecer intactos. Los componentes NO SHALL llevar estilos en línea.

#### Scenario: Estilos preexistentes
- **WHEN** se inspecciona `App.css` después del cambio
- **THEN** los bloques `Header`, `Hero`, `Card`, `Pricing`, `FAQ`, `Contact`, `Input`, `Modal` y `Footer` siguen presentes sin editar

#### Scenario: Convención de clases
- **WHEN** se agrega una clase para una sección nueva
- **THEN** sigue BEM (`.itinerario`, `.itinerario__hito`, `.photo--arco`) y se declara únicamente en `App.css`
