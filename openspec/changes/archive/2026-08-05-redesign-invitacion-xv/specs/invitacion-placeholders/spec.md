## ADDED Requirements

### Requirement: Primitivo Photo
`src/components/ui/Photo.tsx` SHALL exportar por defecto un componente que reserva el espacio de una imagen todavía no provista, con relación de aspecto fija y una etiqueta visible que indique qué foto va ahí. SHALL seguir la convención de los primitivos existentes: clase BEM fija y props nativas reenviadas mediante un tipo intersección.

#### Scenario: Marcador visible
- **WHEN** se renderiza `Photo` con una etiqueta
- **THEN** ocupa el espacio de la imagen final y muestra la etiqueta, de modo que al mirar la página se entiende que falta un asset

#### Scenario: Sin salto de layout
- **WHEN** el marcador se sustituya después por una imagen real de la misma relación de aspecto
- **THEN** el alto reservado no cambia y el resto de la página no se desplaza

#### Scenario: Variante de arco
- **WHEN** se pide la variante de arco
- **THEN** el marcador se dibuja con el borde superior redondeado en forma de arco, sobre la clase modificadora correspondiente

### Requirement: Primitivo Ornamento
`src/components/ui/Ornamento.tsx` SHALL exportar por defecto un componente para las decoraciones florales de esquina y los separadores. Al ser puramente decorativo SHALL marcarse `aria-hidden` y NO SHALL aportar contenido al árbol de accesibilidad.

#### Scenario: Lectura por lector de pantalla
- **WHEN** un lector de pantalla recorre la página
- **THEN** los ornamentos se omiten y solo se anuncia el contenido de la invitación

#### Scenario: Ornamento de esquina
- **WHEN** se coloca un ornamento floral en una sección
- **THEN** se posiciona sobre la esquina sin desplazar el contenido ni provocar scroll horizontal

#### Scenario: Asset floral pendiente
- **WHEN** todavía no existe la acuarela floral definitiva
- **THEN** el ornamento floral se dibuja como marcador identificable, listo para sustituirse por el asset real sin cambiar el punto de uso

### Requirement: Símbolos de icono
Los iconos del itinerario y del código de vestimenta SHALL definirse como `<symbol>` dentro de `public/icons.svg` y referenciarse con `<use href="/icons.svg#nombre" />`, siguiendo el mecanismo ya presente en el archivo. Los símbolos existentes SHALL conservarse.

#### Scenario: Icono de hito
- **WHEN** un hito del itinerario declara su icono
- **THEN** el valor del array apunta a un símbolo de `icons.svg` y se renderiza vía `<use>`

#### Scenario: Símbolos previos
- **WHEN** se inspecciona `public/icons.svg` después del cambio
- **THEN** `#github-icon`, `#x-icon`, `#discord-icon` y los demás símbolos previos siguen definidos

#### Scenario: Herencia de color
- **WHEN** un icono se renderiza dentro de una sección
- **THEN** toma su color del token de acento por herencia (`currentColor`), sin valores de color propios
