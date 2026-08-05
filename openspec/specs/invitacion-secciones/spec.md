# invitacion-secciones Specification

## Purpose

Contenido y comportamiento de cada sección de la invitación de XV años: patrón de contenido editable en constantes de módulo y las secciones Portada, Padres, Fecha, Recepción, Itinerario, Vestimenta, Galería, Regalos, Confirmar y Cierre.

## Requirements

### Requirement: Contenido genérico y editable
Cada sección SHALL declarar su contenido variable en constantes a nivel de módulo (objetos o arrays), no incrustado en el JSX, siguiendo el patrón ya usado por `plans` en `Pricing.tsx`. Los valores SHALL ser genéricos y no los datos de la imagen de referencia.

#### Scenario: Cambiar la copia
- **WHEN** se quiere cambiar el nombre, la fecha o el salón
- **THEN** basta editar la constante a nivel de módulo de la sección correspondiente, sin tocar el JSX

#### Scenario: Datos de ejemplo
- **WHEN** se lee cualquier sección recién creada
- **THEN** los datos son marcadores genéricos (por ejemplo `[Nombre de la quinceañera]`, `[Salón]`), no nombres o direcciones reales

#### Scenario: Compatibilidad con react-refresh
- **WHEN** un módulo de sección define esas constantes
- **THEN** las constantes NO se exportan; el módulo exporta solo el componente por defecto, de modo que `eslint-plugin-react-refresh` no reporta error

### Requirement: Sección Portada
`Portada` SHALL presentar, en este orden: una cita de apertura, un ornamento de corona, el rótulo "MIS XV AÑOS", un marcador de foto principal y el nombre de la quinceañera en tipografía caligráfica.

#### Scenario: Render de portada
- **WHEN** se renderiza `Portada`
- **THEN** los cinco elementos aparecen en ese orden dentro de un `<section id="portada">`

### Requirement: Sección Padres
`Padres` SHALL mostrar la fórmula de acompañamiento ("Con la compañía de mis padres"), los nombres de los padres y la frase de invitación.

#### Scenario: Render de padres
- **WHEN** se renderiza `Padres`
- **THEN** los nombres provienen de una constante a nivel de módulo y se muestran destacados respecto del texto que los rodea

### Requirement: Sección Fecha
`Fecha` SHALL mostrar el mes, el día de la semana, el número de día y el año, con el número de día visualmente dominante, y SHALL contener la cuenta regresiva.

#### Scenario: Render de fecha
- **WHEN** se renderiza `Fecha`
- **THEN** el número de día se presenta como el elemento de mayor jerarquía visual del bloque, flanqueado por día de semana y año

#### Scenario: Fuente única de la fecha
- **WHEN** se cambia la fecha del evento
- **THEN** se edita una sola constante y tanto la fecha mostrada como la cuenta regresiva reflejan el cambio

### Requirement: Sección Recepción
`Recepcion` SHALL mostrar la hora, el nombre del salón, la ciudad, un botón "Ver ubicación" y un marcador de foto.

#### Scenario: Botón de ubicación
- **WHEN** el invitado activa "Ver ubicación"
- **THEN** se abre la URL de mapa declarada en la constante de la sección, en una pestaña nueva

#### Scenario: Reutilización del primitivo
- **WHEN** se renderiza el botón
- **THEN** usa el primitivo `Button` existente, sin estilos en línea

### Requirement: Sección Itinerario
`Itinerario` SHALL representar los hitos del evento como una línea de tiempo vertical, cada hito con hora, etiqueta e icono, generados por iteración sobre un array a nivel de módulo.

#### Scenario: Render del itinerario
- **WHEN** se renderiza `Itinerario`
- **THEN** cada entrada del array produce un hito con su hora, su etiqueta y su icono, unidos por un eje vertical continuo

#### Scenario: Agregar o quitar hitos
- **WHEN** se agrega o elimina un elemento del array
- **THEN** la línea de tiempo se ajusta sin cambios en el CSS

### Requirement: Sección Vestimenta
`Vestimenta` SHALL indicar el código de vestimenta, mostrar iconos representativos de atuendo y una nota sobre los colores reservados.

#### Scenario: Render de vestimenta
- **WHEN** se renderiza `Vestimenta`
- **THEN** el código de vestimenta, los iconos y la nota de color aparecen dentro de un `<section id="vestimenta">`

### Requirement: Sección Galería
`Galeria` SHALL presentar un marcador de foto destacado usando la variante de marco en arco.

#### Scenario: Render de galería
- **WHEN** se renderiza `Galeria`
- **THEN** el marcador usa la variante de arco del primitivo `Photo`

### Requirement: Sección Regalos
`Regalos` SHALL presentar el título de sugerencia de regalos, un texto explicativo y la modalidad de obsequio destacada.

#### Scenario: Render de regalos
- **WHEN** se renderiza `Regalos`
- **THEN** la modalidad de obsequio se muestra con jerarquía visual propia respecto del texto explicativo

### Requirement: Sección Confirmar
`Confirmar` SHALL mostrar el llamado a confirmar asistencia, la fecha límite y un botón de confirmación que abre un enlace externo declarado en la constante de la sección.

#### Scenario: Confirmación
- **WHEN** el invitado activa el botón de confirmación
- **THEN** se abre en una pestaña nueva la URL declarada en la constante de la sección

#### Scenario: Fecha límite visible
- **WHEN** se renderiza la sección
- **THEN** la fecha límite de confirmación aparece antes del botón

### Requirement: Sección Cierre
`Cierre` SHALL mostrar la nota final para los invitados y la despedida en tipografía caligráfica, y SHALL ser la última sección de la página.

#### Scenario: Render de cierre
- **WHEN** se llega al final del scroll
- **THEN** `Cierre` es el último contenido visible, sin pie de página debajo
