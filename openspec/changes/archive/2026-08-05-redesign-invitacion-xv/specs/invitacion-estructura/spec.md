## ADDED Requirements

### Requirement: Composición de la invitación
`App.tsx` SHALL componer únicamente las secciones de la invitación, dentro de un único `<main>`, en orden de documento: `Portada`, `Padres`, `Fecha`, `Recepcion`, `Itinerario`, `Vestimenta`, `Galeria`, `Regalos`, `Confirmar`, `Cierre`.

#### Scenario: Orden de renderizado
- **WHEN** la aplicación se monta
- **THEN** las 10 secciones se renderizan en ese orden exacto y ninguna sección del landing anterior aparece en el DOM

#### Scenario: Sección nueva agregada más adelante
- **WHEN** se necesita una sección adicional
- **THEN** se crea un componente en `src/components/sections/` y se inserta en la lista de `App.tsx`, sin introducir router ni estado global

### Requirement: Conservación comentada del landing anterior
El código del landing anterior SHALL permanecer en el repositorio sin eliminarse. En `App.tsx`, tanto el `import` como el uso en JSX de `Header`, `Footer`, `Hero`, `About`, `Services`, `Pricing`, `FAQ` y `Contact` SHALL quedar comentados de forma conjunta.

#### Scenario: Archivos preservados
- **WHEN** se inspecciona `src/components/`
- **THEN** `layout/Header.tsx`, `layout/Footer.tsx` y las 6 secciones del landing siguen existiendo sin modificaciones

#### Scenario: El typecheck sigue pasando
- **WHEN** se ejecuta `npm run build`
- **THEN** la compilación termina sin errores, porque ningún `import` comentado deja un identificador declarado y no usado que viole `noUnusedLocals`

#### Scenario: Import vivo con JSX comentado
- **WHEN** solo se comenta el uso en JSX y el `import` queda activo
- **THEN** esto se considera incorrecto: `tsc -b` falla y debe comentarse también el `import`

### Requirement: Contenedor de ancho móvil
La página SHALL presentarse en una única columna angosta centrada, dimensionada para lectura en teléfono, sin encabezado fijo ni navegación por anclas.

#### Scenario: Vista en escritorio
- **WHEN** la página se abre en una ventana ancha
- **THEN** el contenido queda centrado dentro de la columna angosta y no se estira a lo ancho de la ventana

#### Scenario: Vista en teléfono
- **WHEN** la página se abre en un viewport angosto
- **THEN** el contenido ocupa el ancho disponible sin desbordarse horizontalmente

#### Scenario: Sin navegación
- **WHEN** se recorre la página
- **THEN** no existe encabezado fijo ni menú de anclas; la única forma de recorrido es el scroll vertical
