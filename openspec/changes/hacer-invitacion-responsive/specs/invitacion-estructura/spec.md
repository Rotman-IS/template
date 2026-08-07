## MODIFIED Requirements

### Requirement: Contenedor de ancho móvil
La página SHALL presentarse en una única columna centrada, dimensionada para lectura en teléfono, sin encabezado fijo ni navegación por anclas. El ancho de esa columna SHALL declararse en un único token `--ancho` y SHALL estar acotado en tres regímenes: fluido al ancho disponible por debajo del ancho de teléfono, fijo en el ancho de teléfono para teléfono y tablet en vertical, y ensanchado a un tope de escritorio a partir de un único breakpoint. En ningún régimen el contenido SHALL estirarse a lo ancho de la ventana.

#### Scenario: Vista en escritorio
- **WHEN** la página se abre en una ventana de 1440px
- **THEN** el contenido queda centrado en la columna ensanchada, cuyo ancho no supera el tope de escritorio, y el resto de la ventana permanece como espacio lateral

#### Scenario: Vista en tablet vertical
- **WHEN** la página se abre en un viewport de entre el ancho de teléfono y el breakpoint de escritorio
- **THEN** la columna conserva el ancho de teléfono, sin ensancharse a medias

#### Scenario: Vista en teléfono
- **WHEN** la página se abre en un viewport de 390px
- **THEN** el contenido ocupa el ancho disponible sin desbordarse horizontalmente

#### Scenario: Viewport más angosto que el ancho de teléfono
- **WHEN** la página se abre en un viewport de 320px
- **THEN** la columna encoge hasta el ancho disponible y todo el contenido —incluida la tipografía de display— sigue cabiendo dentro de ella

#### Scenario: Ancho definido en un solo lugar
- **WHEN** se necesita ajustar el ancho de la columna en cualquiera de los tres regímenes
- **THEN** el cambio se hace sobre el token `--ancho`, y ninguna regla de `App.css` codifica el ancho de la columna por su cuenta

#### Scenario: Sin navegación
- **WHEN** se recorre la página
- **THEN** no existe encabezado fijo ni menú de anclas; la única forma de recorrido es el scroll vertical

## ADDED Requirements

### Requirement: Ausencia de desborde horizontal
Ninguna sección SHALL desbordar horizontalmente la columna en ningún ancho de viewport soportado. El desborde SHALL prevenirse en su origen —escalado de la tipografía de display, reflow del contenido y quiebre de palabras largas—. `#root` NO SHALL declarar `overflow-x: hidden`, porque oculta el síntoma en lugar de corregir la causa y convierte cualquier regresión futura en un fallo silencioso.

#### Scenario: Revisión en el ancho mínimo soportado
- **WHEN** la página se recorre completa en un viewport de 320px
- **THEN** no aparece scroll horizontal y ningún texto queda recortado en los bordes de la columna

#### Scenario: Nombre largo en la portada
- **WHEN** el nombre de la quinceañera o la despedida del cierre contienen una palabra más larga que el ancho de la columna
- **THEN** la palabra se quiebra y permanece visible completa, en lugar de desbordar o recortarse

#### Scenario: Tentación de reintroducir el recorte
- **WHEN** se detecta un desborde durante el desarrollo
- **THEN** se corrige en la regla que lo origina; agregar `overflow-x: hidden` al contenedor se considera incorrecto
