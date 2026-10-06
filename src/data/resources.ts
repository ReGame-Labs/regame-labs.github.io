type Text = { es: string; en: string }

export type ResourceCategory = 'docs' | 'analysis' | 'debug' | 'matching'

/** Where a tool fits in the matching workflow; reference material sits outside it */
export type Stage = 'explore' | 'split' | 'decompile' | 'match' | 'diff' | 'track'

export const stages: Stage[] = ['explore', 'split', 'decompile', 'match', 'diff', 'track']

export interface Resource {
  id: string
  name: string
  url: string
  category: ResourceCategory
  stage?: Stage
  platforms: ('PS1' | 'PS2' | 'Multi')[]
  /** A tool our own projects build or work with */
  used: boolean
  summary: Text
  details: Text
}

export const resources: Resource[] = [
  {
    id: 'decompedia',
    name: 'Decompedia',
    url: 'https://wiki.decomp.dev/',
    category: 'docs',
    platforms: ['Multi'],
    used: false,
    summary: {
      en: 'A shared wiki about decompiling games, across many platforms.',
      es: 'Una wiki compartida sobre decompilar juegos, de muchas plataformas.',
    },
    details: {
      en: 'The best first stop: guides to set up a project, the compilers each console used, and the tricks the community has learned for matching their output. Read it before you start, and come back whenever a function won\'t match.',
      es: 'La mejor primera parada: guías para montar un proyecto, los compiladores de cada consola y los trucos que la comunidad aprendió para igualar su salida. Léela antes de empezar y vuelve cada vez que una función no haga match.',
    },
  },
  {
    id: 'psx-spx',
    name: 'psx-spx',
    url: 'https://psx-spx.consoledev.net/',
    category: 'docs',
    platforms: ['PS1'],
    used: false,
    summary: {
      en: 'The PlayStation hardware reference: CPU, GTE, GPU, SPU, CD-ROM and memory map.',
      es: 'La referencia del hardware de PlayStation: CPU, GTE, GPU, SPU, CD-ROM y mapa de memoria.',
    },
    details: {
      en: 'When the code writes to a strange address or packs a GPU command, this is where you find out what it means. Essential to give real names to registers, hardware structs and drawing primitives.',
      es: 'Cuando el código escribe en una dirección rara o arma un comando de GPU, aquí descubres qué significa. Imprescindible para dar nombres reales a registros, structs de hardware y primitivas de dibujo.',
    },
  },
  {
    id: 'ps2tek',
    name: 'ps2tek',
    url: 'https://psi-rockin.github.io/ps2tek/',
    category: 'docs',
    platforms: ['PS2'],
    used: false,
    summary: {
      en: 'The PlayStation 2 hardware reference: Emotion Engine, IOP, GS, VUs and DMA.',
      es: 'La referencia del hardware de PlayStation 2: Emotion Engine, IOP, GS, VUs y DMA.',
    },
    details: {
      en: 'The PS2 counterpart of psx-spx: the memory map, the Graphics Synthesizer registers, the vector units and how data moves between them. Use it to understand what low-level code is talking to.',
      es: 'El equivalente de psx-spx para PS2: el mapa de memoria, los registros del Graphics Synthesizer, las unidades vectoriales y cómo se mueven los datos entre ellas. Úsala para entender con qué habla el código de bajo nivel.',
    },
  },
  {
    id: 'ghidra',
    name: 'Ghidra',
    url: 'https://github.com/NationalSecurityAgency/ghidra',
    category: 'analysis',
    stage: 'explore',
    platforms: ['Multi'],
    used: false,
    summary: {
      en: 'An open-source suite to disassemble, decompile and explore binaries.',
      es: 'Una suite de código abierto para desensamblar, decompilar y explorar binarios.',
    },
    details: {
      en: 'Load the executable, follow cross-references, rename functions and data as you understand them, and read its C-like decompiler output. It is the map you draw before splitting the game into a real project.',
      es: 'Cargas el ejecutable, sigues las referencias cruzadas, renombras funciones y datos a medida que los entiendes y lees la salida de su decompilador tipo C. Es el mapa que dibujas antes de dividir el juego en un proyecto real.',
    },
  },
  {
    id: 'ghidra-psx-ldr',
    name: 'ghidra_psx_ldr',
    url: 'https://github.com/lab313ru/ghidra_psx_ldr',
    category: 'analysis',
    stage: 'explore',
    platforms: ['PS1'],
    used: false,
    summary: {
      en: 'Teaches Ghidra to load and understand PlayStation executables.',
      es: 'Enseña a Ghidra a cargar y entender ejecutables de PlayStation.',
    },
    details: {
      en: 'Reads the PS-X EXE format, decodes the GTE coprocessor instructions and recognizes PsyQ library functions by signature, so the SDK code gets named for you and you can focus on the game\'s own.',
      es: 'Lee el formato PS-X EXE, decodifica las instrucciones del coprocesador GTE y reconoce por firma las funciones de las librerías PsyQ: el código del SDK se nombra solo y te concentras en el del juego.',
    },
  },
  {
    id: 'ghidra-ee',
    name: 'ghidra-emotionengine-reloaded',
    url: 'https://github.com/chaoticgd/ghidra-emotionengine-reloaded/',
    category: 'analysis',
    stage: 'explore',
    platforms: ['PS2'],
    used: false,
    summary: {
      en: 'Lets Ghidra recognize and analyze PlayStation 2 Emotion Engine executables.',
      es: 'Permite a Ghidra reconocer y analizar ejecutables del Emotion Engine de PlayStation 2.',
    },
    details: {
      en: 'Adds the R5900 instruction set, with its 128-bit multimedia and vector unit instructions, that plain MIPS support doesn\'t know. Without it, much of a PS2 game disassembles as garbage.',
      es: 'Añade el juego de instrucciones del R5900, con sus instrucciones multimedia de 128 bits y de las unidades vectoriales, que el soporte MIPS normal no conoce. Sin él, buena parte de un juego de PS2 se desensambla como basura.',
    },
  },
  {
    id: 'ccc',
    name: 'CCC',
    url: 'https://github.com/chaoticgd/ccc/',
    category: 'debug',
    stage: 'explore',
    platforms: ['PS2'],
    used: false,
    summary: {
      en: 'Extracts .mdebug symbols from PS2 executables built with debug info.',
      es: 'Extrae los símbolos .mdebug de ejecutables de PS2 compilados con información de depuración.',
    },
    details: {
      en: 'When a build shipped with its symbol table, CCC recovers function names, types, structs and even the original source file layout, and can generate C headers and Ghidra data from them. A huge head start when it applies.',
      es: 'Cuando un build salió con su tabla de símbolos, CCC recupera nombres de funciones, tipos, structs e incluso la organización original de los archivos fuente, y genera headers en C y datos para Ghidra. Una ventaja enorme cuando se puede usar.',
    },
  },
  {
    id: 'splat',
    name: 'splat',
    url: 'https://github.com/ethteck/splat/',
    category: 'matching',
    stage: 'split',
    platforms: ['Multi'],
    used: true,
    summary: {
      en: 'Splits a binary into assembly, data and assets you can rebuild.',
      es: 'Divide un binario en ensamblador, datos y recursos que se pueden recompilar.',
    },
    details: {
      en: 'From a YAML file that says where each segment starts, splat cuts the executable into per-file assembly and data, and writes the linker script that puts it back together. It is the skeleton of the project: from day one the build reproduces the original, and you swap assembly for C one function at a time.',
      es: 'A partir de un YAML que dice dónde empieza cada segmento, splat corta el ejecutable en ensamblador y datos por archivo, y escribe el linker script que lo vuelve a unir. Es el esqueleto del proyecto: desde el primer día el build reproduce el original, y cambias ensamblador por C función a función.',
    },
  },
  {
    id: 'm2c',
    name: 'm2c',
    url: 'https://github.com/matt-kempster/m2c/',
    category: 'matching',
    stage: 'decompile',
    platforms: ['Multi'],
    used: true,
    summary: {
      en: 'A MIPS and PowerPC decompiler that turns assembly into a first C draft.',
      es: 'Un decompilador de MIPS y PowerPC que convierte ensamblador en un primer borrador en C.',
    },
    details: {
      en: 'Point it at a function\'s assembly and it writes C that is close to what the developers wrote, often closer than Ghidra for matching purposes. Rarely a match as is, but it saves most of the typing and shows the control flow.',
      es: 'Le das el ensamblador de una función y escribe C cercano a lo que escribieron los desarrolladores, a menudo más útil que Ghidra para hacer match. Casi nunca coincide tal cual, pero ahorra la mayor parte del tecleo y muestra el flujo de control.',
    },
  },
  {
    id: 'decomp-me',
    name: 'decomp.me',
    url: 'https://decomp.me/',
    category: 'matching',
    stage: 'match',
    platforms: ['Multi'],
    used: false,
    summary: {
      en: 'A web scratchpad to match C against assembly, together.',
      es: 'Un espacio web para igualar C contra ensamblador, en equipo.',
    },
    details: {
      en: 'Paste a function\'s assembly, pick the exact compiler and flags, and edit C while a live diff and score tell you how close you are. Share the link and others can fork your attempt: it is where stubborn functions get solved.',
      es: 'Pegas el ensamblador de una función, eliges el compilador y los flags exactos, y editas C mientras un diff en vivo y una puntuación te dicen qué tan cerca estás. Compartes el enlace y otros pueden continuar tu intento: ahí se resuelven las funciones difíciles.',
    },
  },
  {
    id: 'decomp-permuter',
    name: 'decomp-permuter',
    url: 'https://github.com/simonlindholm/decomp-permuter/',
    category: 'matching',
    stage: 'match',
    platforms: ['Multi'],
    used: true,
    summary: {
      en: 'Randomly rewrites C to find a version that matches the target.',
      es: 'Reescribe C al azar para encontrar una versión que coincida con el original.',
    },
    details: {
      en: 'For the last few percent: when the logic is right but registers or instruction order differ, the permuter tries thousands of equivalent rewrites (reordered statements, temporaries, casts) and keeps those that score better.',
      es: 'Para el último tramo: cuando la lógica es correcta pero los registros o el orden de instrucciones difieren, el permuter prueba miles de reescrituras equivalentes (sentencias reordenadas, temporales, casts) y se queda con las que puntúan mejor.',
    },
  },
  {
    id: 'maspsx',
    name: 'maspsx',
    url: 'https://github.com/mkst/maspsx',
    category: 'matching',
    stage: 'match',
    platforms: ['PS1'],
    used: true,
    summary: {
      en: 'Makes modern GNU as assemble GCC output the way the PsyQ SDK did.',
      es: 'Hace que el GNU as moderno ensamble la salida de GCC como lo hacía el SDK PsyQ.',
    },
    details: {
      en: 'PlayStation games were assembled with Sony\'s ASPSX, which expanded macros and placed nops its own way. maspsx sits between the compiler and the assembler and reproduces those quirks, so compiled C can be byte-identical.',
      es: 'Los juegos de PlayStation se ensamblaban con ASPSX de Sony, que expandía macros y colocaba nops a su manera. maspsx se pone entre el compilador y el ensamblador y reproduce esas manías, para que el C compilado sea idéntico byte a byte.',
    },
  },
  {
    id: 'old-gcc',
    name: 'old-gcc',
    url: 'https://github.com/decompals/old-gcc',
    category: 'matching',
    stage: 'match',
    platforms: ['PS1', 'PS2'],
    used: true,
    summary: {
      en: 'Ready-to-use builds of the old GCC versions games were compiled with.',
      es: 'Builds listos para usar de las versiones antiguas de GCC con las que se compilaron los juegos.',
    },
    details: {
      en: 'Matching needs the very compiler the developers used: GCC 2.7.2, 2.8.1, 2.95.2 and friends, patched to run on today\'s systems. Our projects build with these.',
      es: 'Para hacer match hace falta el mismo compilador que usaron los desarrolladores: GCC 2.7.2, 2.8.1, 2.95.2 y compañía, parcheados para funcionar en sistemas actuales. Nuestros proyectos compilan con ellos.',
    },
  },
  {
    id: 'asm-differ',
    name: 'asm-differ',
    url: 'https://github.com/simonlindholm/asm-differ',
    category: 'matching',
    stage: 'diff',
    platforms: ['Multi'],
    used: false,
    summary: {
      en: 'A command-line diff between your build\'s assembly and the original\'s.',
      es: 'Un diff en la terminal entre el ensamblador de tu build y el del original.',
    },
    details: {
      en: 'Shows the target and your output side by side, highlighting differing registers, instructions and offsets. In watch mode it rebuilds every time you save, so you can iterate on a function without leaving the editor.',
      es: 'Muestra el original y tu resultado lado a lado, resaltando registros, instrucciones y offsets distintos. En modo watch recompila cada vez que guardas, así iteras sobre una función sin salir del editor.',
    },
  },
  {
    id: 'objdiff',
    name: 'objdiff',
    url: 'https://github.com/encounter/objdiff',
    category: 'matching',
    stage: 'diff',
    platforms: ['Multi'],
    used: true,
    summary: {
      en: 'A local diffing tool for decompilation projects, with a GUI.',
      es: 'Una herramienta local de diff para proyectos de decompilación, con interfaz gráfica.',
    },
    details: {
      en: 'Compares every object file of your build against the original, function by function and symbol by symbol, and updates as you work. Its CLI also writes the progress reports our CI uploads for decomp.dev.',
      es: 'Compara cada archivo objeto de tu build contra el original, función por función y símbolo por símbolo, y se actualiza mientras trabajas. Su CLI además genera los reportes de progreso que nuestro CI sube para decomp.dev.',
    },
  },
  {
    id: 'decomp-dev',
    name: 'decomp.dev',
    url: 'https://decomp.dev/',
    category: 'matching',
    stage: 'track',
    platforms: ['Multi'],
    used: true,
    summary: {
      en: 'Tracks and publishes the progress of decompilation projects.',
      es: 'Sigue y publica el progreso de los proyectos de decompilación.',
    },
    details: {
      en: 'Reads the objdiff report of every build and turns it into history charts, a progress map of every unit and the badges you see in our READMEs and on this page.',
      es: 'Lee el reporte de objdiff de cada build y lo convierte en gráficas de historial, un mapa de progreso de cada unidad y los badges que ves en nuestros READMEs y en esta página.',
    },
  },
]
