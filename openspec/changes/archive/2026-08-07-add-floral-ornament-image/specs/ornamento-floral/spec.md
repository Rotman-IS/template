## ADDED Requirements

### Requirement: Imagen opcional en el ornamento floral

El componente `Ornamento` SHALL aceptar una prop opcional `imagen` de tipo `string`. Cuando `variant` es `floral` y `imagen` está presente, el componente SHALL renderizar un elemento `<img>` con esa URL como contenido del ornamento. Cuando `imagen` está ausente, el componente SHALL renderizar el marcador de posición textual existente.

La prop `imagen` SHALL ser ignorada por las variantes `icono` y `separador`, que conservan su render actual sin cambios.

#### Scenario: Ornamento floral con imagen

- **WHEN** se renderiza `<Ornamento variant="floral" imagen={url} />`
- **THEN** el ornamento contiene un `<img>` cuyo `src` es `url`
- **AND** el ornamento no contiene el marcador de posición textual

#### Scenario: Ornamento floral sin imagen

- **WHEN** se renderiza `<Ornamento variant="floral" />` sin la prop `imagen`
- **THEN** el ornamento contiene el marcador de posición textual con la palabra "floral"
- **AND** el ornamento no contiene ningún elemento `<img>`

#### Scenario: La prop no afecta a las demás variantes

- **WHEN** se renderiza `<Ornamento variant="separador" imagen={url} />` o `<Ornamento variant="icono" imagen={url} />`
- **THEN** el ornamento renderiza exactamente el mismo contenido que si no se hubiera pasado `imagen`

### Requirement: La imagen del ornamento es decorativa

La exclusión del ornamento del árbol de accesibilidad la fija el requisito `Primitivo Ornamento` de `invitacion-placeholders`; este requisito solo cubre lo que aporta la imagen. La imagen SHALL declararse como decorativa mediante un `alt` vacío, y SHALL cargarse de forma diferida para no competir con el contenido principal de la portada.

#### Scenario: La imagen no se anuncia a tecnologías asistivas

- **WHEN** se renderiza un ornamento floral con imagen
- **THEN** el `<img>` tiene un atributo `alt` vacío
- **AND** el `<img>` se declara de carga diferida

### Requirement: Las cuatro orientaciones derivan de un único asset

El ornamento floral SHALL producir las cuatro orientaciones de esquina a partir de una sola imagen fuente orientada a la esquina superior izquierda, aplicando una transformación CSS determinada por la prop `posicion`. No SHALL requerirse un archivo de imagen distinto por esquina.

| `posicion` | Transformación |
|---|---|
| `sup-izq` | ninguna |
| `sup-der` | reflejo horizontal |
| `inf-izq` | reflejo vertical |
| `inf-der` | rotación de 180° |

#### Scenario: Esquinas opuestas se reflejan entre sí

- **WHEN** una sección renderiza ornamentos florales con imagen en `sup-izq` y `sup-der`
- **THEN** ambos usan la misma URL de imagen
- **AND** el de `sup-der` aparece reflejado horizontalmente respecto al de `sup-izq`

#### Scenario: Ornamento sin posición

- **WHEN** se renderiza un ornamento floral con imagen y sin prop `posicion`
- **THEN** la imagen se muestra sin transformación

### Requirement: El ornamento floral queda contenido dentro de la sección

El ornamento floral SHALL dibujarse íntegramente dentro de los límites de la sección que lo contiene, alineado a su esquina, sin desbordarla ni sangrar fuera de ella. Su tamaño SHALL escalar con el ancho de la sección y SHALL estar acotado por un máximo en píxeles, de modo que dos ornamentos de esquinas opuestas ocupen áreas idénticas.

La imagen SHALL conservar la proporción del asset original sin deformarse.

#### Scenario: Sin desbordamiento en anchos estrechos

- **WHEN** la sección se muestra en un viewport móvil estrecho
- **THEN** ningún ornamento floral se extiende más allá de los bordes de la sección

#### Scenario: Simetría entre esquinas opuestas

- **WHEN** una sección renderiza ornamentos florales en dos esquinas
- **THEN** ambos ornamentos ocupan el mismo ancho y alto renderizados
- **AND** cada uno queda a la misma distancia de su borde de sección correspondiente

#### Scenario: Proporción preservada

- **WHEN** se renderiza el ornamento floral con imagen a cualquier ancho de viewport
- **THEN** la relación entre ancho y alto de la imagen coincide con la del asset fuente

### Requirement: La ausencia del asset es un fallo de compilación

El asset floral SHALL referenciarse mediante un import de módulo resuelto en tiempo de compilación. El sistema SHALL NOT implementar un mecanismo de recuperación en tiempo de ejecución ante un fallo de carga de la imagen. Si el archivo del asset no existe, la compilación SHALL fallar en lugar de degradarse silenciosamente al marcador de posición.

#### Scenario: Asset ausente durante la compilación

- **WHEN** el archivo del asset floral no está presente y se ejecuta la compilación
- **THEN** la compilación falla con un error de resolución de módulo

#### Scenario: Sin recuperación en tiempo de ejecución

- **WHEN** se renderiza un ornamento floral con imagen
- **THEN** el componente no registra manejador de error de carga sobre el `<img>`
- **AND** el componente no mantiene estado propio
