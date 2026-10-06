import type { Region } from '../data/projects'
import type { ResourceCategory, Stage } from '../data/resources'

export type Locale = 'es' | 'en'

const es = {
  nav: { projects: 'Proyectos', approach: 'Cómo trabajamos', resources: 'Recursos', github: 'GitHub' },
  hero: {
    eyebrow: 'Decompilación de videojuegos',
    title: 'Devolvemos los clásicos a su código fuente.',
    lead: 'ReGame Labs reconstruye juegos de PlayStation en C que, al compilarse con las herramientas originales, produce los mismos binarios byte a byte.',
    ctaProjects: 'Ver proyectos',
    ctaGithub: 'Organización en GitHub',
  },
  stats: { games: 'juegos', releases: 'ediciones', functions: 'funciones en C' },
  projects: {
    title: 'Proyectos',
    lead: 'Cada edición se compila desde el mismo código y se compara contra el ejecutable original.',
    code: 'Código',
    data: 'Datos',
    functions: 'Funciones',
    units: 'unidades',
    compiler: 'Compilador',
    fakeHacks: 'fake matches / hacks',
    repo: 'Repositorio',
    progress: 'Progreso',
    live: 'En vivo desde decomp.dev',
    loading: 'Consultando decomp.dev…',
    snapshot: (date: string) => `Último dato publicado · ${date}`,
  },
  approach: {
    title: 'Cómo trabajamos',
    items: [
      {
        title: 'Matching, no aproximado',
        body: 'Cada función se escribe en C hasta que el compilador de la época genera exactamente las mismas instrucciones. El build compara el resultado con el SHA-1 del original.',
      },
      {
        title: 'Sin datos del juego',
        body: 'Los repositorios contienen solo código y herramientas. Para compilar necesitas tu propia copia del juego.',
      },
      {
        title: 'Varias ediciones, un código',
        body: 'Las ediciones de EE. UU., Japón y Europa se compilan desde el mismo árbol de fuentes, con las diferencias marcadas por versión.',
      },
      {
        title: 'Progreso medible',
        body: 'objdiff mide cada build y decomp.dev publica el avance de código, datos y funciones de cada edición.',
      },
    ],
  },
  resources: {
    title: 'Recursos',
    lead: 'Las herramientas y referencias que usa la comunidad de decompilación. Recorre la constelación para ver dónde encaja cada una, o filtra y abre cada tarjeta para saber qué hace.',
    mapTitle: 'La ruta de un match',
    mapHint: 'Toca una estrella para ver sus herramientas',
    search: 'Buscar herramienta…',
    all: 'Todos',
    onlyUsed: 'Solo las que usamos',
    used: 'La usamos',
    more: 'Qué hace',
    less: 'Menos',
    visit: 'Abrir',
    count: (n: number) => (n === 1 ? '1 recurso' : `${n} recursos`),
    empty: 'Ninguna herramienta coincide con esos filtros.',
    clear: 'Quitar filtros',
    reference: 'Referencia',
    categories: {
      docs: 'Documentación',
      analysis: 'Análisis binario',
      debug: 'Info de depuración',
      matching: 'Decompilación matching',
    } satisfies Record<ResourceCategory, string>,
    stages: {
      explore: { name: 'Explorar', blurb: 'Entender el binario: qué hay y dónde.' },
      split: { name: 'Dividir', blurb: 'Cortar el ejecutable en un proyecto que recompila.' },
      decompile: { name: 'Decompilar', blurb: 'Un primer borrador en C de cada función.' },
      match: { name: 'Igualar', blurb: 'Ajustar el C hasta que el compilador dé lo mismo.' },
      diff: { name: 'Comparar', blurb: 'Ver instrucción a instrucción qué falta.' },
      track: { name: 'Medir', blurb: 'Publicar cuánto del juego ya es C.' },
    } satisfies Record<Stage, { name: string; blurb: string }>,
  },
  footer: {
    note: 'Proyectos de preservación y estudio. No distribuimos datos ni binarios de los juegos.',
    trademarks: 'Los nombres de los juegos son marcas de sus respectivos dueños.',
  },
  region: { us: 'EE. UU.', jp: 'Japón', eu: 'Europa' } satisfies Record<Region, string>,
  theme: { toLight: 'Cambiar a tema claro', toDark: 'Cambiar a tema oscuro' },
  language: 'Idioma',
}

export type Messages = typeof es

const en: Messages = {
  nav: { projects: 'Projects', approach: 'How we work', resources: 'Resources', github: 'GitHub' },
  hero: {
    eyebrow: 'Game decompilation',
    title: 'Bringing the classics back to source.',
    lead: 'ReGame Labs rebuilds PlayStation games as C source that, compiled with the original tools, produces the very same binaries, byte for byte.',
    ctaProjects: 'See projects',
    ctaGithub: 'Organization on GitHub',
  },
  stats: { games: 'games', releases: 'releases', functions: 'functions in C' },
  projects: {
    title: 'Projects',
    lead: 'Every release builds from the same source and is checked against the original executable.',
    code: 'Code',
    data: 'Data',
    functions: 'Functions',
    units: 'units',
    compiler: 'Compiler',
    fakeHacks: 'fake matches / hacks',
    repo: 'Repository',
    progress: 'Progress',
    live: 'Live from decomp.dev',
    loading: 'Asking decomp.dev…',
    snapshot: (date: string) => `Last published numbers · ${date}`,
  },
  approach: {
    title: 'How we work',
    items: [
      {
        title: 'Matching, not approximate',
        body: 'Every function is written in C until the period compiler emits exactly the same instructions. The build checks the result against the original SHA-1.',
      },
      {
        title: 'No game data',
        body: 'The repositories hold only code and tools. You need your own copy of the game to build.',
      },
      {
        title: 'Several releases, one source',
        body: 'The USA, Japan and Europe releases build from the same source tree, with the differences marked per version.',
      },
      {
        title: 'Measurable progress',
        body: 'objdiff measures every build and decomp.dev publishes the code, data and function progress of each release.',
      },
    ],
  },
  resources: {
    title: 'Resources',
    lead: 'The tools and references the decompilation community relies on. Travel the constellation to see where each one fits, or filter and open any card to learn what it does.',
    mapTitle: 'The road to a match',
    mapHint: 'Tap a star to see its tools',
    search: 'Search tools…',
    all: 'All',
    onlyUsed: 'Only the ones we use',
    used: 'We use it',
    more: 'What it does',
    less: 'Less',
    visit: 'Open',
    count: (n: number) => (n === 1 ? '1 resource' : `${n} resources`),
    empty: 'No tool matches those filters.',
    clear: 'Clear filters',
    reference: 'Reference',
    categories: {
      docs: 'Documentation',
      analysis: 'Binary analysis',
      debug: 'Debug info',
      matching: 'Matching decompilation',
    },
    stages: {
      explore: { name: 'Explore', blurb: 'Understand the binary: what is in it and where.' },
      split: { name: 'Split', blurb: 'Cut the executable into a project that rebuilds.' },
      decompile: { name: 'Decompile', blurb: 'A first C draft of every function.' },
      match: { name: 'Match', blurb: 'Tune the C until the compiler gives the same thing.' },
      diff: { name: 'Diff', blurb: 'See instruction by instruction what is missing.' },
      track: { name: 'Track', blurb: 'Publish how much of the game is C already.' },
    },
  },
  footer: {
    note: 'Preservation and research projects. We distribute no game data or binaries.',
    trademarks: 'Game titles are trademarks of their respective owners.',
  },
  region: { us: 'USA', jp: 'Japan', eu: 'Europe' },
  theme: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme' },
  language: 'Language',
}

export const messages: Record<Locale, Messages> = { es, en }

export const DEFAULT_LOCALE: Locale = 'en'

export const formatDate = (iso: string, locale: Locale) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale === 'es' ? 'es' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

export const formatNumber = (n: number, locale: Locale) =>
  n.toLocaleString(locale === 'es' ? 'es' : 'en-US')
