# regame-labs.github.io

The website of the [ReGame Labs](https://github.com/ReGame-Labs) organization,
published at <https://regame-labs.github.io/>.

Built with [Vite](https://vite.dev), React, TypeScript and
[Zustand](https://zustand.docs.pmnd.rs). Each release's progress is read live
from the [decomp.dev](https://decomp.dev) API; when it doesn't answer, the page
shows the last published numbers, which live in `src/data/projects.ts`.

## Development

```sh
npm install
npm run dev
```

`npm run build` builds into `dist/` and `npm run lint` runs oxlint.

## Layout

| Path | Contents |
|---|---|
| `src/data/projects.ts` | The projects, their releases and the progress snapshot |
| `src/store/useSiteStore.ts` | Global state (Zustand): language, theme and decomp.dev progress |
| `src/lib/i18n.ts` | Spanish and English text |
| `src/components/` | Header, hero and project cards |

To add a project, add an entry to `src/data/projects.ts` with its repository,
its releases (the executable name is the version id on decomp.dev) and a
snapshot of its progress.

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages with
`.github/workflows/deploy.yaml`.
