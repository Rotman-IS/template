## ADDED Requirements

### Requirement: Cuenta regresiva en vivo
La invitación SHALL mostrar el tiempo restante hasta la fecha del evento en cuatro unidades —días, horas, minutos y segundos— cada una con su etiqueta, y SHALL actualizarse una vez por segundo mientras el componente está montado.

#### Scenario: Cuenta en curso
- **WHEN** la fecha del evento es futura
- **THEN** las cuatro unidades muestran el tiempo restante y el valor de segundos cambia cada segundo

#### Scenario: Relleno de dígitos
- **WHEN** una unidad vale menos de 10
- **THEN** se muestra con dos dígitos (por ejemplo `07`), de modo que el ancho del bloque no salte entre actualizaciones

#### Scenario: Etiquetas
- **WHEN** se renderiza la cuenta regresiva
- **THEN** cada número lleva debajo su etiqueta en español: Días, Horas, Min, Seg

### Requirement: Comportamiento al vencerse
Cuando la fecha del evento ya pasó, la cuenta regresiva SHALL mostrar ceros en las cuatro unidades y NO SHALL mostrar valores negativos.

#### Scenario: Fecha pasada
- **WHEN** la fecha del evento es anterior al momento actual
- **THEN** las cuatro unidades muestran `00` y no se emiten números negativos

#### Scenario: Llegada a cero
- **WHEN** el contador alcanza cero estando montado
- **THEN** se detiene en ceros y el intervalo deja de programar trabajo inútil

### Requirement: Limpieza del intervalo
El componente SHALL cancelar su intervalo al desmontarse.

#### Scenario: Desmontaje
- **WHEN** el componente se desmonta
- **THEN** el intervalo queda cancelado y no se ejecutan más actualizaciones de estado

### Requirement: Fecha del evento configurable
La fecha objetivo SHALL provenir de una constante única declarada a nivel de módulo, compartida con la fecha mostrada en la sección `Fecha`.

#### Scenario: Cambio de fecha
- **WHEN** se edita la constante de fecha del evento
- **THEN** la cuenta regresiva y la fecha mostrada quedan consistentes sin editar dos lugares
