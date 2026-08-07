## 1. Componente `Ornamento`

- [x] 1.1 Añadir la prop opcional `imagen?: string` al tipo `OrnamentoProps` en `src/components/ui/Ornamento.tsx`, sin desestructurarla en el spread de props nativas
- [x] 1.2 Sustituir la rama `variant === 'floral'` por un render exclusivo: con `imagen`, un `<img className="ornamento__img" src={imagen} alt="" loading="lazy" />`; sin ella, el `<span className="ornamento__marcador">floral</span>` actual
- [x] 1.3 Verificar que las ramas `icono` y `separador` quedan intactas y que el componente sigue sin estado y con export por defecto

## 2. Estilos del ornamento floral

- [x] 2.1 Reescribir `.ornamento--floral` en `src/App.css`: mantener `position: absolute` y `z-index: 0`, sustituir `width/height: 108px` por `aspect-ratio: 1376 / 768`, un ancho relativo al ancho de la sección y un `max-width` en píxeles
- [x] 2.2 Mover el borde punteado, `border-radius`, `background`, tipografía y color desde `.ornamento--floral` a una regla `.ornamento__marcador` propia, de modo que solo aplique al fallback
- [x] 2.3 Añadir `.ornamento__img` con `width: 100%`, `height: 100%` y `object-fit: contain` para que la imagen llene el contenedor sin deformarse
- [x] 2.4 Añadir las transformaciones por posición sobre `.ornamento__img`: ninguna en `sup-izq`, `scaleX(-1)` en `sup-der`, `scaleY(-1)` en `inf-izq`, `rotate(180deg)` en `inf-der`
- [x] 2.5 Confirmar que las reglas `.ornamento--sup-izq/-der/-inf-izq/-inf-der` siguen anclando a `0` sin valores negativos, y que `section > *` (`margin-inline: auto`) no desplaza el ornamento

## 3. Uso en las secciones

- [x] 3.1 Importar `floral1SB.webp` desde `src/assets/` en `src/components/sections/Portada.tsx` y pasarlo como `imagen` a los dos ornamentos florales
- [x] 3.2 Hacer lo mismo en `src/components/sections/Galeria.tsx` (`sup-der`, `inf-izq`)
- [x] 3.3 Hacer lo mismo en `src/components/sections/Cierre.tsx` (`inf-izq`, `inf-der`)

## 4. Ajuste visual

- [x] 4.1 Ejecutar `npm run dev` y revisar `Portada`, `Galeria` y `Cierre` en escritorio y en un viewport móvil estrecho
- [x] 4.2 Ajustar el ancho relativo y el `max-width` hasta que el ornamento no tape la cita, el rótulo ni la foto de `Portada`, y no genere desplazamiento horizontal
- [x] 4.3 Verificar en `Portada` que `sup-izq` y `sup-der` se leen como un par reflejado coherente, sin dirección de luz delatora
- [x] 4.4 Verificar que en cada sección las dos esquinas ocupan el mismo tamaño y quedan a la misma distancia de su borde

## 5. Verificación

- [x] 5.1 Comprobar el fallback quitando temporalmente la prop `imagen` de un ornamento y confirmar que reaparece el marcador punteado, luego restaurarla
- [x] 5.2 Comprobar que un `<Ornamento variant="separador" />` y un `<Ornamento variant="icono" />` siguen renderizando igual que antes del cambio
- [x] 5.3 Ejecutar `npm run build` y `npm run lint` sin errores
