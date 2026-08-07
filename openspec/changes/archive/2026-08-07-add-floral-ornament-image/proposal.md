## Why

Los ornamentos florales de las esquinas (`<Ornamento variant="floral">`) todavía se dibujan como un círculo punteado con la palabra "floral" — un marcador de posición. Ya existe el arte real en `src/assets/floral1SB.webp` (1376×768, con transparencia, esquina de acuarela orientada arriba‑izquierda), así que la plantilla puede verse terminada en lugar de andamiada.

El marcador no debe desaparecer: esta es una plantilla reutilizable, y quien la adapte para otro evento puede no tener arte floral propio. El círculo punteado sigue siendo el estado correcto cuando no se provee imagen.

## What Changes

- `Ornamento` acepta una prop opcional `imagen?: string`. Con `variant="floral"`:
  - **con** `imagen` → renderiza un `<img>` decorativo con ese arte;
  - **sin** `imagen` → renderiza el marcador punteado actual, sin cambios.
- Las tres secciones que usan ornamentos florales (`Portada`, `Galeria`, `Cierre`, 6 usos en total) importan el asset y lo pasan por la nueva prop.
- El ornamento floral deja de ser un cuadrado de 108×108 y pasa a respetar la proporción 1376:768 del arte, dimensionado relativo al ancho de la sección con un tope en píxeles.
- Las cuatro posiciones se derivan de la única imagen mediante `transform` en CSS: `sup-izq` sin transformar, `sup-der` reflejada en X, `inf-izq` reflejada en Y, `inf-der` rotada 180°.
- El ornamento queda **contenido dentro de los límites de la sección** (sin sangrado ni desbordamiento), de modo que las esquinas opuestas se lean simétricas.

Explícitamente **fuera de alcance**: no hay fallback en tiempo de ejecución ante un fallo de carga (`onError`) ni migración del asset a `public/`. El asset se importa por Vite; si el archivo faltara, el build falla, y eso es el comportamiento deseado. El fallback que se conserva es el de *autoría* — no haber provisto imagen — no el de *red*.

## Capabilities

### New Capabilities
- `ornamento-floral`: lo que aporta la imagen — la prop opcional, la derivación de las cuatro orientaciones desde un solo asset, la contención dentro de la sección, y que la ausencia del asset sea un fallo de compilación.

### Modified Capabilities
- `invitacion-placeholders`: el requisito `Primitivo Ornamento` daba por pendiente la acuarela definitiva y exigía sustituirla "sin cambiar el punto de uso". La acuarela ya existe y llega por prop desde cada sección, así que los puntos de uso sí cambian. El escenario `Asset floral pendiente` se reemplaza por dos —asset provisto y asset ausente—, y el marcador pasa de estado transitorio a estado válido para quien reutilice la plantilla sin arte propio.

## Impact

- `src/components/ui/Ornamento.tsx` — nueva prop `imagen`, rama de render para `variant="floral"`.
- `src/App.css` — bloque `.ornamento--floral` reescrito (proporción, dimensionado, contención); nuevas reglas `.ornamento__img` y sus `transform` por posición. Sin tokens de color nuevos, así que `src/index.css` no se toca.
- `src/components/sections/Portada.tsx`, `Galeria.tsx`, `Cierre.tsx` — importan `floral1SB.webp` y pasan `imagen`.
- `src/assets/floral1SB.webp` — pasa de ser un archivo sin referenciar a formar parte del bundle (~107 KB).
- Sin dependencias nuevas, sin cambios de API pública, sin cambios de enrutado o estado.
- `src/assets/floral.jpeg` figura como borrado en git y no lo referencia ningún módulo; esta propuesta no depende de él.
