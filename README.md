# Jean Kevin Chuquitarqui Cruz — portafolio técnico

Sitio de marca personal y CV interactivo. Ingeniería civil, arquitectura de sistemas
para control de obra y automatización.

**Lo que lo hace distinto:** la pieza central no es una ilustración. Es el **grafo de
conocimiento real** de los tres repositorios del sistema ASTRA ERA —extraído con un
indexador estático sobre el código— renderizado como una constelación 3D navegable.
Cada esfera es un archivo real, su tamaño es la cantidad de símbolos que define y cada
arista es una relación de llamada agregada entre archivos.

## Stack

| | |
|---|---|
| UI | React 19 · TypeScript · Vite 6 |
| 3D | Three.js · React Three Fiber · drei |
| Estilos | CSS propio, sin framework |
| Idiomas | Español / inglés, conmutable en caliente |
| Despliegue | Docker multi-etapa + Nginx (Coolify) |

Sin dependencias externas en tiempo de ejecución: no hay CDN, ni fuentes remotas, ni
analítica de terceros.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera el grafo + typecheck + bundle en dist/
npm run preview  # sirve dist/
```

## El dataset del grafo

`scripts/build-graph.mjs` es la fuente de verdad del grafo: contiene los datos crudos
consultados al índice (símbolos por archivo y aristas `CALLS` agregadas entre archivos),
resuelve las capas arquitectónicas y **hornea el layout 3D** con un algoritmo
force-directed determinista, de modo que el navegador solo dibuja.

```bash
npm run graph    # regenera public/data/graph.json
```

Salida actual: 166 nodos y 256 aristas en la vista a nivel de archivo. El índice
completo del que provienen tiene 2 518 nodos y 8 801 aristas a nivel de símbolo.

El layout usa un generador pseudoaleatorio con semilla fija: el mismo dataset produce
siempre la misma constelación.

## Rendimiento

`src/three/useCapacidad.ts` decide cuánto 3D puede permitirse el dispositivo —núcleos,
memoria, ancho de pantalla, `prefers-reduced-motion` y disponibilidad de WebGL— y ajusta
densidad de partículas, `devicePixelRatio` y antialiasing. Un teléfono de obra no es una
estación de trabajo; la página tiene que abrir igual en los dos. Si no hay WebGL, las
escenas 3D simplemente no se montan y el contenido se lee completo.

Las escenas se cargan con `React.lazy` y la del grafo solo se monta cuando su sección se
acerca al viewport.

## Despliegue en Coolify

El repositorio incluye `Dockerfile` y `nginx.conf`. En Coolify:

1. Nuevo recurso → **Dockerfile** (o *Docker build*), apuntando a este repositorio.
2. Puerto expuesto: **80**.
3. Sin variables de entorno: el sitio es completamente estático.
4. Healthcheck: `GET /healthz` responde `ok`.

Nginx sirve los assets con hash en caché inmutable, el dataset del grafo con
revalidación horaria y el resto con `no-cache`.

## Confidencialidad

El contenido describe el sistema de control de obra en términos genéricos —"una
operación minera", "contratos de obra"—. No incluye nombres de cliente, de campamento o
de área de planta, números de orden de trabajo ni datos de trabajadores.

La sección **El producto** (`public/capturas/`) sí muestra capturas del panel en
producción. Están saneadas antes de capturarse, no después:

| Dato | Tratamiento |
|---|---|
| Marca del empleador | Reemplazada por **ASTRA ERA** en el DOM |
| Nombres de personas | Sustituidos por `SUPERVISOR NN` |
| Nº de orden de trabajo (`AIT…`, `IO-…`) | Eliminados del texto |
| Fotos de evidencia de obra | Desenfocadas |

Los valores numéricos y los gráficos se dejan intactos: son horas-hombre y porcentajes
de avance, sin identificación de cliente. Al reponer las capturas hay que volver a pasar
el mismo saneamiento —una captura cruda del panel **no** es publicable—.

---

Arequipa, Perú · [jean.chuquitarqui@gmail.com](mailto:jean.chuquitarqui@gmail.com)
