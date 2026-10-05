# regame-labs.github.io

Sitio de la organización [ReGame Labs](https://github.com/ReGame-Labs), publicado
en <https://regame-labs.github.io/>.

Hecho con [Vite](https://vite.dev), React, TypeScript y
[Zustand](https://zustand.docs.pmnd.rs). El progreso de cada edición se consulta
en vivo en la API de [decomp.dev](https://decomp.dev); si no responde, se muestran
los últimos números publicados, que viven en `src/data/projects.ts`.

## Desarrollo

```sh
npm install
npm run dev
```

`npm run build` compila a `dist/` y `npm run lint` pasa oxlint.

## Estructura

| Ruta | Qué hay |
|---|---|
| `src/data/projects.ts` | Los proyectos, sus ediciones y la instantánea de progreso |
| `src/store/useSiteStore.ts` | Estado global (Zustand): idioma, tema y progreso de decomp.dev |
| `src/lib/i18n.ts` | Textos en español e inglés |
| `src/components/` | Cabecera, portada y tarjetas de proyecto |

Para agregar un proyecto, añade una entrada en `src/data/projects.ts` con su
repositorio, sus ediciones (el nombre del ejecutable es el id de versión en
decomp.dev) y una instantánea de su progreso.

## Despliegue

Cada push a `main` compila el sitio y lo publica en GitHub Pages con
`.github/workflows/deploy.yaml`.
