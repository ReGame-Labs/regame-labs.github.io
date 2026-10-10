import type { Region } from '../data/projects'
import type { ResourceCategory, Stage } from '../data/resources'

export type Locale = 'es' | 'en'

const es = {
  nav: { projects: 'Proyectos', approach: 'Cómo trabajamos', resources: 'Recursos', github: 'GitHub' },
  hero: {
    eyebrow: 'Decompilación de videojuegos',
    title: 'Devolvemos los clásicos a su código fuente.',
    lead: 'ReGame Labs reconstruye juegos clásicos en C que, al compilarse con las herramientas originales, produce los mismos binarios byte a byte.',
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
    search: 'Buscar recurso…',
    all: 'Todos',
    onlyUsed: 'Solo las que usamos',
    used: 'La usamos',
    more: 'Qué hace',
    less: 'Menos',
    visit: 'Abrir',
    count: (n: number) => (n === 1 ? '1 recurso' : `${n} recursos`),
    empty: 'Ningún recurso coincide con esos filtros.',
    clear: 'Quitar filtros',
    reference: 'Referencia',
    categories: {
      docs: 'Documentación',
      analysis: 'Análisis binario',
      debug: 'Depuración',
      matching: 'Decompilación matching',
      projects: 'Proyectos de referencia',
      community: 'Comunidad',
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
  chat: {
    open: 'Abrir el chat',
    close: 'Cerrar el chat',
    title: 'ReGame Labs',
    online: 'En línea',
    away: 'Respondemos en cuanto podamos',
    greeting:
      '¡Hola! Soy el asistente de ReGame Labs. Pregúntame por los proyectos, cómo compilarlos o cómo contribuir. Si necesitas a una persona, le paso la conversación al equipo.',
    you: 'Tú',
    assistant: 'Asistente',
    typing: 'El asistente está escribiendo…',
    placeholder: 'Escribe un mensaje…',
    send: 'Enviar',
    sending: 'Enviando…',
    verifying: 'Comprobando que eres humano…',
    privacy:
      'Primero responde un asistente automático, y guardamos la conversación para que el equipo pueda seguirla. No compartas datos sensibles.',
    emailPrompt: '¿Te vas antes de que respondamos? Deja un email y te escribimos (opcional).',
    emailPlaceholder: 'tu@email.com',
    emailSave: 'Guardar',
    emailSaved: (email: string) => `Si no estás, te escribimos a ${email}.`,
    emailRemove: 'Quitar',
    errors: {
      network: 'No pudimos conectar con el chat. Inténtalo en un momento.',
      captcha_required: 'Espera a que termine la verificación y vuelve a enviar.',
      captcha_failed: 'La verificación falló. Inténtalo de nuevo.',
      too_many_conversations: 'Demasiadas conversaciones nuevas desde aquí. Inténtalo mañana.',
      too_many_messages: 'Vas muy rápido. Espera un rato antes de enviar más mensajes.',
      message_too_long: 'El mensaje es demasiado largo (máximo 2000 caracteres).',
      invalid_email: 'Ese email no parece válido.',
      generic: 'Algo salió mal. Inténtalo de nuevo.',
    } as Record<string, string>,
  },
  support: {
    short: 'Apoyar',
    title: 'Apoya a ReGame Labs en Open Collective',
    cta: 'Apoyar el proyecto',
    footer: '¿Te sirve lo que hacemos? Cada donación y cada gasto son públicos en',
    footerLink: 'Open Collective',
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
    lead: 'ReGame Labs rebuilds classic games as C source that, compiled with the original tools, produces the very same binaries, byte for byte.',
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
    search: 'Search resources…',
    all: 'All',
    onlyUsed: 'Only the ones we use',
    used: 'We use it',
    more: 'What it does',
    less: 'Less',
    visit: 'Open',
    count: (n: number) => (n === 1 ? '1 resource' : `${n} resources`),
    empty: 'No resource matches those filters.',
    clear: 'Clear filters',
    reference: 'Reference',
    categories: {
      docs: 'Documentation',
      analysis: 'Binary analysis',
      debug: 'Debugging',
      matching: 'Matching decompilation',
      projects: 'Reference projects',
      community: 'Community',
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
  chat: {
    open: 'Open the chat',
    close: 'Close the chat',
    title: 'ReGame Labs',
    online: 'Online',
    away: 'We reply as soon as we can',
    greeting:
      "Hi! I'm the ReGame Labs assistant. Ask me about the projects, how to build them or how to contribute. If you need a person, I'll pass the conversation on to the team.",
    you: 'You',
    assistant: 'Assistant',
    typing: 'The assistant is typing…',
    placeholder: 'Write a message…',
    send: 'Send',
    sending: 'Sending…',
    verifying: 'Checking you are human…',
    privacy:
      "An automated assistant answers first, and we store the conversation so the team can follow up. Please don't share sensitive data.",
    emailPrompt: 'Leaving before we answer? Drop an email and we\'ll write to you (optional).',
    emailPlaceholder: 'you@email.com',
    emailSave: 'Save',
    emailSaved: (email: string) => `If you're away, we'll write to ${email}.`,
    emailRemove: 'Remove',
    errors: {
      network: 'Could not reach the chat. Try again in a moment.',
      captcha_required: 'Wait for the check to finish and send again.',
      captcha_failed: 'The check failed. Please try again.',
      too_many_conversations: 'Too many new conversations from here. Try again tomorrow.',
      too_many_messages: 'You are going fast. Wait a little before sending more.',
      message_too_long: 'The message is too long (2000 characters at most).',
      invalid_email: 'That email does not look right.',
      generic: 'Something went wrong. Please try again.',
    },
  },
  support: {
    short: 'Support',
    title: 'Support ReGame Labs on Open Collective',
    cta: 'Support the project',
    footer: 'Like what we do? Every donation and every expense is public on',
    footerLink: 'Open Collective',
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
