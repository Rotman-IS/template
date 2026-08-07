## MODIFIED Requirements

### Requirement: Primitivo Ornamento
`src/components/ui/Ornamento.tsx` SHALL exportar por defecto un componente para las decoraciones florales de esquina y los separadores. Al ser puramente decorativo SHALL marcarse `aria-hidden` y NO SHALL aportar contenido al árbol de accesibilidad.

El ornamento floral SHALL aceptar el asset de acuarela por prop desde la sección que lo usa. Cuando no se provee asset, SHALL dibujarse el marcador identificable; el marcador deja de ser el estado transitorio previo al arte definitivo y pasa a ser el estado válido para quien reutilice la plantilla sin arte propio.

#### Scenario: Lectura por lector de pantalla
- **WHEN** un lector de pantalla recorre la página
- **THEN** los ornamentos se omiten y solo se anuncia el contenido de la invitación

#### Scenario: Ornamento de esquina
- **WHEN** se coloca un ornamento floral en una sección
- **THEN** se posiciona sobre la esquina sin desplazar el contenido ni provocar scroll horizontal

#### Scenario: Asset floral provisto
- **WHEN** una sección pasa el asset de acuarela al ornamento floral
- **THEN** el ornamento muestra el arte y no el marcador

#### Scenario: Asset floral ausente
- **WHEN** una sección coloca un ornamento floral sin pasarle asset
- **THEN** el ornamento se dibuja como marcador identificable, sin romper la composición de la sección
