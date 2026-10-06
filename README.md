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
| `src/data/resources.ts` | The Resources section: tools, references and where each fits |
| `src/store/useSiteStore.ts` | Global state (Zustand): language, theme and decomp.dev progress |
| `src/store/useResourceStore.ts` | The Resources filters (Zustand): category, stage, search |
| `src/store/useChatStore.ts` | The chat (Zustand): conversation token, messages, polling |
| `src/lib/i18n.ts` | Spanish and English text |
| `src/lib/pixels.ts` | The pixel-art sprites: logo, planet, satellite |
| `src/components/` | Header, hero, starfield, project cards and resources |

To add a project, add an entry to `src/data/projects.ts` with its repository,
its releases (the executable name is the version id on decomp.dev) and a
snapshot of its progress.

## Chat

The chat widget talks to a Cloudflare Worker kept in a separate repository. It
only renders when the build gets `VITE_CHAT_API_URL` and
`VITE_TURNSTILE_SITE_KEY`; in CI they come from the repository variables
`CHAT_API_URL` and `TURNSTILE_SITE_KEY`. To try it locally, run the Worker and
copy `.env.example` to `.env.development.local`.

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages with
`.github/workflows/deploy.yaml`.
