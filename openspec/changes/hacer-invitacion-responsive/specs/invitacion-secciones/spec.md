## MODIFIED Requirements

### Requirement: Sección Itinerario
`Itinerario` SHALL representar los hitos del evento como una línea de tiempo vertical, cada hito con hora, etiqueta e icono, generados por iteración sobre un array a nivel de módulo. En columnas angostas la fila SHALL reorganizarse para que la etiqueta disponga de todo el ancho restante, sin cambios en el marcado del componente.

#### Scenario: Render del itinerario
- **WHEN** se renderiza `Itinerario`
- **THEN** cada entrada del array produce un hito con su hora, su etiqueta y su icono, unidos por un eje vertical continuo

#### Scenario: Agregar o quitar hitos
- **WHEN** se agrega o elimina un elemento del array
- **THEN** la línea de tiempo se ajusta sin cambios en el CSS

#### Scenario: Reflow en columna angosta
- **WHEN** la columna es más angosta que el ancho de teléfono
- **THEN** la hora y el nodo del icono se agrupan a la izquierda, la etiqueta ocupa el ancho restante alineada a la izquierda, y el eje vertical se reposiciona para seguir atravesando los nodos

#### Scenario: Etiqueta larga
- **WHEN** un hito del array lleva una etiqueta de varias palabras
- **THEN** la etiqueta envuelve dentro de su columna sin desbordar la línea de tiempo ni desalinear el eje vertical

#### Scenario: Reflow sin tocar el componente
- **WHEN** se inspecciona `Itinerario.tsx` después del cambio
- **THEN** conserva sus tres `span` por hito y no incorpora clases ni elementos nuevos para el reflow
