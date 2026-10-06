type Text = { es: string; en: string }

export type ResourceCategory = 'docs' | 'analysis' | 'debug' | 'matching' | 'projects' | 'community'

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
    url: 'https://decomp.wiki/',
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
    id: 'sotn-wiki',
    name: 'sotn-decomp wiki',
    url: 'https://github.com/Xeeynamo/sotn-decomp/wiki/Decompilation',
    category: 'docs',
    platforms: ['PS1'],
    used: false,
    summary: {
      en: 'Hands-on PS1 decompilation guides from the biggest PS1 matching project.',
      es: 'Guías prácticas de decompilación de PS1 del mayor proyecto matching de PS1.',
    },
    details: {
      en: 'Walks through decompiling a function from start to finish, then collects the tricks for register mismatches and the workflow for deduplicating code shared between overlays. Most of it applies to any PS1 game built with GCC and ASPSX.',
      es: 'Recorre la decompilación de una función de principio a fin y reúne los trucos para descuadres de registros y el flujo para deduplicar código compartido entre overlays. Casi todo aplica a cualquier juego de PS1 compilado con GCC y ASPSX.',
    },
  },
  {
    id: 'gcc-tips',
    name: 'GCC 2.8.1 Tips and Tricks',
    url: 'https://github.com/pmret/papermario/wiki/GCC-2.8.1-Tips-and-Tricks',
    category: 'docs',
    platforms: ['Multi'],
    used: false,
    summary: {
      en: 'A catalogue of the C patterns that make old GCC emit exactly the code you want.',
      es: 'Un catálogo de los patrones de C que hacen que el GCC antiguo emita justo el código que buscas.',
    },
    details: {
      en: 'Written by the Paper Mario team for the N64, but PsyQ shipped GCC 2.x too, so most of it carries over: how to coax the register allocator, reorder loads, keep or drop temporaries and shape loops and switches until the output matches.',
      es: 'Lo escribió el equipo de Paper Mario para N64, pero PsyQ también traía GCC 2.x, así que casi todo se aplica: cómo convencer al reparto de registros, reordenar cargas, conservar o eliminar temporales y dar forma a bucles y switches hasta que la salida coincida.',
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
    id: 'psyq-libref',
    name: 'PsyQ Library Reference',
    url: 'https://psx.arthus.net/sdk/Psy-Q/DOCS/LibRef47.pdf',
    category: 'docs',
    platforms: ['PS1'],
    used: false,
    summary: {
      en: 'Sony\'s reference for the PS1 runtime libraries: every function, struct and constant.',
      es: 'La referencia de Sony de las librerías de PS1: cada función, struct y constante.',
    },
    details: {
      en: 'Games call into libgpu, libgte, libcd, libspu, libpad and friends all the time. This manual (version 4.7) gives each function\'s prototype and behaviour, so you can name those calls, type their arguments and understand what the game is asking the hardware to do.',
      es: 'Los juegos llaman todo el tiempo a libgpu, libgte, libcd, libspu, libpad y compañía. Este manual (versión 4.7) da el prototipo y el comportamiento de cada función, para que puedas nombrar esas llamadas, tipar sus argumentos y entender qué le pide el juego al hardware.',
    },
  },
  {
    id: 'r3000-manual',
    name: 'IDT R30xx Software Reference',
    url: 'https://student.cs.uwaterloo.ca/~cs350/common/r3000-manual.pdf',
    category: 'docs',
    platforms: ['PS1'],
    used: false,
    summary: {
      en: 'The manual for the MIPS R3000 family, the CPU inside the PS1.',
      es: 'El manual de la familia MIPS R3000, la CPU de la PS1.',
    },
    details: {
      en: 'Covers the instruction set, the pipeline, load and branch delay slots, exceptions and the cache. When an instruction in a diff looks out of place, this is where you learn why the CPU needs it there.',
      es: 'Cubre el set de instrucciones, el pipeline, los delay slots de cargas y saltos, las excepciones y la caché. Cuando una instrucción del diff parece fuera de lugar, aquí aprendes por qué la CPU la necesita ahí.',
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
    id: 'mips-abi',
    name: 'MIPS System V ABI',
    url: 'https://refspecs.linuxfoundation.org/elf/mipsabi.pdf',
    category: 'docs',
    platforms: ['Multi'],
    used: false,
    summary: {
      en: 'The calling convention MIPS compilers follow: registers, stack frames and relocations.',
      es: 'La convención de llamadas que siguen los compiladores MIPS: registros, marcos de pila y relocaciones.',
    },
    details: {
      en: 'Which registers carry arguments and return values, which ones a function must preserve, how the stack frame is laid out and how relocations work in object files. With it you can read a function\'s prologue and tell at a glance what it takes and what it keeps on the stack.',
      es: 'Qué registros llevan argumentos y valores de retorno, cuáles debe preservar una función, cómo se organiza el marco de pila y cómo funcionan las relocaciones en los objetos. Con esto lees el prólogo de una función y sabes de un vistazo qué recibe y qué guarda en la pila.',
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
    id: 'psyq-signatures',
    name: 'psx_psyq_signatures',
    url: 'https://github.com/lab313ru/psx_psyq_signatures',
    category: 'analysis',
    stage: 'explore',
    platforms: ['PS1'],
    used: false,
    summary: {
      en: 'Byte signatures for every PsyQ library, by SDK version.',
      es: 'Firmas de bytes de cada librería de PsyQ, por versión del SDK.',
    },
    details: {
      en: 'Each library object is described as a byte pattern with wildcards where relocations go. ghidra_psx_ldr uses them to name SDK functions automatically, and they tell you which PsyQ version a game linked, so you know which library code you can take as is instead of decompiling it.',
      es: 'Cada objeto de librería se describe como un patrón de bytes con comodines donde van las relocaciones. ghidra_psx_ldr las usa para nombrar las funciones del SDK automáticamente, y te dicen qué versión de PsyQ enlazó el juego, para saber qué código de librería puedes tomar tal cual en vez de decompilarlo.',
    },
  },
  {
    id: 'mipsmatch',
    name: 'mipsmatch',
    url: 'https://github.com/ttkb-oss/mipsmatch',
    category: 'analysis',
    stage: 'split',
    platforms: ['PS1'],
    used: false,
    summary: {
      en: 'Fingerprints the code you matched and finds it again in other binaries.',
      es: 'Toma huellas del código que ya igualaste y lo encuentra en otros binarios.',
    },
    details: {
      en: 'Reads the functions you already matched from your map file and ELF, then scans other executables or overlays for the same code. Born in sotn-decomp, where it locates shared functions across dozens of overlays; handy for splitting a new overlay quickly.',
      es: 'Lee las funciones que ya igualaste desde tu archivo map y tu ELF, y busca el mismo código en otros ejecutables u overlays. Nació en sotn-decomp, donde localiza funciones compartidas entre decenas de overlays; muy útil para dividir rápido un overlay nuevo.',
    },
  },
  {
    id: 'coddog',
    name: 'coddog',
    url: 'https://github.com/ethteck/coddog',
    category: 'analysis',
    stage: 'decompile',
    platforms: ['Multi'],
    used: false,
    summary: {
      en: 'Finds functions that look alike, in one game or across many.',
      es: 'Encuentra funciones que se parecen, en un juego o entre muchos.',
    },
    details: {
      en: 'Compares functions by their opcodes and reports exact duplicates, close relatives and partial overlaps. Point it at your game and at other decomp projects and it tells you which functions someone already matched elsewhere, so you can reuse that C instead of starting from zero.',
      es: 'Compara funciones por sus opcodes y reporta duplicados exactos, parientes cercanos y coincidencias parciales. Apúntalo a tu juego y a otros proyectos de decomp y te dice qué funciones alguien ya igualó en otra parte, para reutilizar ese C en vez de empezar de cero.',
    },
  },
  {
    id: 'pcsx-redux',
    name: 'PCSX-Redux',
    url: 'https://pcsx-redux.consoledev.net/',
    category: 'debug',
    stage: 'explore',
    platforms: ['PS1'],
    used: false,
    summary: {
      en: 'A PS1 emulator built for developers, with a full debugger.',
      es: 'Un emulador de PS1 hecho para desarrolladores, con un depurador completo.',
    },
    details: {
      en: 'Breakpoints on execution, reads and writes, a memory editor, a GDB server Ghidra can attach to and Lua scripting to automate it all. Watching the real game run is the quickest way to learn what a function does and which values it receives. It also ships psyq-obj-parser, which turns PsyQ objects into ELF.',
      es: 'Breakpoints de ejecución, lectura y escritura, editor de memoria, un servidor GDB al que Ghidra se puede conectar y scripting en Lua para automatizarlo todo. Ver el juego real corriendo es la forma más rápida de saber qué hace una función y qué valores recibe. También trae psyq-obj-parser, que convierte objetos de PsyQ en ELF.',
    },
  },
  {
    id: 'duckstation',
    name: 'DuckStation',
    url: 'https://github.com/stenzek/duckstation',
    category: 'debug',
    stage: 'explore',
    platforms: ['PS1'],
    used: false,
    summary: {
      en: 'An accurate, fast PS1 emulator with a built-in debugger.',
      es: 'Un emulador de PS1 preciso y rápido, con depurador integrado.',
    },
    details: {
      en: 'Its CPU debugger has breakpoints, memory views and a GDB server. A great second opinion when you need to confirm what the original game does, and an easy way to play-test a rebuilt disc image.',
      es: 'Su depurador de CPU tiene breakpoints, vistas de memoria y un servidor GDB. Una gran segunda opinión cuando necesitas confirmar qué hace el juego original, y una forma fácil de probar jugando una imagen de disco reconstruida.',
    },
  },
  {
    id: 'no-psx',
    name: 'no$psx',
    url: 'https://problemkaputt.de/psx.htm',
    category: 'debug',
    stage: 'explore',
    platforms: ['PS1'],
    used: false,
    summary: {
      en: 'A debugger-emulator from the author of psx-spx.',
      es: 'Un emulador-depurador del autor de psx-spx.',
    },
    details: {
      en: 'Windows-only and closed source, but its debugger is very complete: disassembler, breakpoints, profiler and viewers for VRAM and I/O. It also loads .SYM debug files, so when a disc shipped with one you can debug the game with its original names.',
      es: 'Solo para Windows y de código cerrado, pero su depurador es muy completo: desensamblador, breakpoints, profiler y visores de VRAM y E/S. También carga archivos de depuración .SYM, así que si un disco traía uno puedes depurar el juego con sus nombres originales.',
    },
  },
  {
    id: 'pcsx2',
    name: 'PCSX2 debugger',
    url: 'https://pcsx2.net/docs/advanced/debugger/',
    category: 'debug',
    stage: 'explore',
    platforms: ['PS2'],
    used: false,
    summary: {
      en: 'The PS2 emulator, with a debugger for both the EE and the IOP.',
      es: 'El emulador de PS2, con depurador para el EE y el IOP.',
    },
    details: {
      en: 'Disassembly, breakpoints, memory search and register views for both CPUs. It imports symbols from ELF symbol tables, STABS/mdebug and .sym files, so a leftover debug build shows its real function names. Most PS2 projects also use it to test their rebuilt ELF.',
      es: 'Desensamblado, breakpoints, búsqueda en memoria y vista de registros para ambas CPU. Importa símbolos de tablas ELF, STABS/mdebug y archivos .sym, así que una build de depuración olvidada muestra sus nombres reales. La mayoría de proyectos de PS2 también lo usa para probar su ELF reconstruido.',
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
    id: 'symdump',
    name: 'symdump',
    url: 'https://github.com/stohrendorf/symdump',
    category: 'debug',
    stage: 'explore',
    platforms: ['PS1'],
    used: false,
    summary: {
      en: 'Reads the .SYM debug files some PS1 discs shipped by mistake.',
      es: 'Lee los archivos de depuración .SYM que algunos discos de PS1 trajeron por error.',
    },
    details: {
      en: 'A .SYM file is the debug output of the SN Systems linker: function names, globals, types and source file names. When one is left on a disc, symdump turns it into readable declarations, and the project gets real names and struct layouts for free.',
      es: 'Un .SYM es la salida de depuración del linker de SN Systems: nombres de funciones, globales, tipos y archivos fuente. Cuando quedó uno en un disco, symdump lo convierte en declaraciones legibles, y el proyecto obtiene nombres reales y la forma de sus structs gratis.',
    },
  },
  {
    id: 'retroreversing-symbols',
    name: 'RetroReversing symbol lists',
    url: 'https://www.retroreversing.com/ps1-debug-symbols',
    category: 'debug',
    platforms: ['PS1', 'PS2'],
    used: false,
    summary: {
      en: 'Lists of PS1 and PS2 discs that still carry debug symbols.',
      es: 'Listas de discos de PS1 y PS2 que todavía traen símbolos de depuración.',
    },
    details: {
      en: 'Catalogues of retail and demo discs that shipped .SYM or .MAP files on PS1, with a sister page (ps2-unstripped) for PS2 ELFs that kept their symbols. Check them before starting a game: a demo of the same title with symbols can save months of naming work.',
      es: 'Catálogos de discos comerciales y demos que traían archivos .SYM o .MAP en PS1, con una página hermana (ps2-unstripped) para los ELF de PS2 que conservaron sus símbolos. Revísalos antes de empezar un juego: una demo del mismo título con símbolos puede ahorrar meses de nombrar funciones.',
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
    id: 'spimdisasm',
    name: 'spimdisasm',
    url: 'https://github.com/Decompollaborate/spimdisasm',
    category: 'matching',
    stage: 'split',
    platforms: ['Multi'],
    used: true,
    summary: {
      en: 'The MIPS disassembler behind splat.',
      es: 'El desensamblador MIPS detrás de splat.',
    },
    details: {
      en: 'Turns code and data into assembly that reassembles to the same bytes, working out where functions, strings, jump tables and symbols are. splat calls it for every segment; you meet it directly when a symbol is detected wrong.',
      es: 'Convierte código y datos en ensamblador que vuelve a ensamblar los mismos bytes, deduciendo dónde hay funciones, strings, tablas de saltos y símbolos. splat lo llama en cada segmento; lo tratas directamente cuando un símbolo se detecta mal.',
    },
  },
  {
    id: 'rabbitizer',
    name: 'rabbitizer',
    url: 'https://github.com/Decompollaborate/rabbitizer',
    category: 'matching',
    stage: 'split',
    platforms: ['Multi'],
    used: true,
    summary: {
      en: 'A MIPS instruction decoder that knows the PS1 GTE and the PS2 EE.',
      es: 'Un decodificador de instrucciones MIPS que conoce el GTE de PS1 y el EE de PS2.',
    },
    details: {
      en: 'The library spimdisasm, coddog and other tools use to decode each instruction, including the GTE opcodes of the PS1 and the R5900 instructions of the PS2. You rarely call it yourself, but it is why the disassembly understands the console\'s own instructions.',
      es: 'La librería que usan spimdisasm, coddog y otras herramientas para decodificar cada instrucción, incluidos los opcodes del GTE de PS1 y las instrucciones R5900 de PS2. Pocas veces la llamas tú, pero gracias a ella el desensamblado entiende las instrucciones propias de la consola.',
    },
  },
  {
    id: 'mkpsxiso',
    name: 'mkpsxiso',
    url: 'https://github.com/Lameguy64/mkpsxiso',
    category: 'matching',
    stage: 'split',
    platforms: ['PS1'],
    used: true,
    summary: {
      en: 'Extracts and rebuilds PS1 disc images, file by file.',
      es: 'Extrae y reconstruye imágenes de disco de PS1, archivo por archivo.',
    },
    details: {
      en: 'dumpsxiso unpacks a disc and writes an XML recording where every file sits; mkpsxiso reads it back and builds an image with the very same layout. We use dumpsxiso to pull the executables and data files the build needs out of each disc.',
      es: 'dumpsxiso desempaqueta un disco y escribe un XML con la posición de cada archivo; mkpsxiso lo lee y arma una imagen con exactamente la misma disposición. Nosotros usamos dumpsxiso para sacar de cada disco los ejecutables y datos que necesita la build.',
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
    id: 'psyq-headers',
    name: 'psyq_headers',
    url: 'https://github.com/jype0/psyq_headers',
    category: 'matching',
    stage: 'decompile',
    platforms: ['PS1'],
    used: true,
    summary: {
      en: 'C headers for the PsyQ SDK libraries.',
      es: 'Headers de C para las librerías del SDK PsyQ.',
    },
    details: {
      en: 'The prototypes, structs and macros of libgpu, libgte, libcd and the rest, ready to include. With them, decompiled code calls the SDK with the right types, exactly as the original source did.',
      es: 'Los prototipos, structs y macros de libgpu, libgte, libcd y el resto, listos para incluir. Con ellos, el código decompilado llama al SDK con los tipos correctos, tal como lo hacía el código original.',
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
    id: 'decompme-compilers',
    name: 'decomp.me compilers',
    url: 'https://github.com/decompme/compilers',
    category: 'matching',
    stage: 'match',
    platforms: ['Multi'],
    used: false,
    summary: {
      en: 'The archive of original compilers decomp.me runs, ready to download.',
      es: 'El archivo de compiladores originales que usa decomp.me, listos para descargar.',
    },
    details: {
      en: 'Build recipes and packaged releases for the compilers behind decomp.me, from the PsyQ GCC builds of the PS1 to the many ee-gcc and Metrowerks versions of the PS2. Finding the exact build a game used is the first step of any match, and this is where to look.',
      es: 'Recetas de build y releases empaquetadas de los compiladores detrás de decomp.me, desde los GCC de PsyQ de la PS1 hasta las muchas versiones de ee-gcc y Metrowerks de la PS2. Encontrar la build exacta que usó un juego es el primer paso de cualquier match, y aquí es donde buscar.',
    },
  },
  {
    id: 'wibo',
    name: 'wibo',
    url: 'https://github.com/decompals/wibo',
    category: 'matching',
    stage: 'match',
    platforms: ['Multi'],
    used: false,
    summary: {
      en: 'Runs old Windows compilers on Linux and macOS, without Wine.',
      es: 'Ejecuta compiladores antiguos de Windows en Linux y macOS, sin Wine.',
    },
    details: {
      en: 'Many original toolchains only exist as 32-bit Windows programs, like the Metrowerks compiler for the PS2. wibo loads them directly and is small and fast enough for CI and for decomp.me itself.',
      es: 'Muchas toolchains originales solo existen como programas de Windows de 32 bits, como el compilador Metrowerks de PS2. wibo los carga directamente y es lo bastante pequeño y rápido para el CI y para el propio decomp.me.',
    },
  },
  {
    id: 'mwccgap',
    name: 'mwccgap',
    url: 'https://github.com/mkst/mwccgap',
    category: 'matching',
    stage: 'match',
    platforms: ['PS2'],
    used: false,
    summary: {
      en: 'Lets PS2 games built with Metrowerks be decompiled one function at a time.',
      es: 'Permite decompilar función por función los juegos de PS2 hechos con Metrowerks.',
    },
    details: {
      en: 'MWCC cannot mix C with inline assembly the way GCC does, which breaks the usual INCLUDE_ASM workflow. mwccgap compiles the C and then splices in the original assembly of the functions not decompiled yet, so a file can be matched little by little.',
      es: 'MWCC no puede mezclar C con ensamblador inline como GCC, y eso rompe el flujo habitual de INCLUDE_ASM. mwccgap compila el C y luego inserta el ensamblador original de las funciones aún no decompiladas, para igualar un archivo poco a poco.',
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
  {
    id: 'sotn-decomp',
    name: 'sotn-decomp',
    url: 'https://github.com/Xeeynamo/sotn-decomp',
    category: 'projects',
    platforms: ['PS1'],
    used: false,
    summary: {
      en: 'Castlevania: Symphony of the Night, the largest PS1 matching decomp.',
      es: 'Castlevania: Symphony of the Night, el mayor decomp matching de PS1.',
    },
    details: {
      en: 'Dozens of overlays and several releases (the PSP one too) built from the same source, with splat, maspsx and tooling to find code shared between overlays. When you wonder how to structure something, it has probably been solved here already.',
      es: 'Decenas de overlays y varias versiones (también la de PSP) construidas desde el mismo código, con splat, maspsx y herramientas para encontrar código compartido entre overlays. Si te preguntas cómo estructurar algo, probablemente ya está resuelto aquí.',
    },
  },
  {
    id: 'silent-hill-decomp',
    name: 'silent-hill-decomp',
    url: 'https://github.com/shdecompilations/silent-hill-decomp',
    category: 'projects',
    platforms: ['PS1'],
    used: false,
    summary: {
      en: 'Silent Hill (1999), almost fully matched.',
      es: 'Silent Hill (1999), igualado casi por completo.',
    },
    details: {
      en: 'A nearly complete PS1 decomp whose wiki documents its tooling, such as detecting functions shared between overlays and loading overlays into Ghidra. A good picture of what the finish line looks like.',
      es: 'Un decomp de PS1 casi completo cuya wiki documenta sus herramientas, como detectar funciones compartidas entre overlays y cargar overlays en Ghidra. Una buena imagen de cómo se ve la meta.',
    },
  },
  {
    id: 'mgs-reversing',
    name: 'mgs_reversing',
    url: 'https://github.com/FoxdieTeam/mgs_reversing',
    category: 'projects',
    platforms: ['PS1'],
    used: false,
    summary: {
      en: 'Metal Gear Solid, with its main executable fully matched.',
      es: 'Metal Gear Solid, con su ejecutable principal igualado por completo.',
    },
    details: {
      en: 'The main executable is matched and the team is working through the overlays. A mature codebase that shows how a big PS1 game reads once it is back in C.',
      es: 'El ejecutable principal está igualado y el equipo avanza por los overlays. Un código maduro que muestra cómo se lee un juego grande de PS1 cuando vuelve a estar en C.',
    },
  },
  {
    id: 'chronicle',
    name: 'Chronicle',
    url: 'https://github.com/TheMoonPeople/Chronicle',
    category: 'projects',
    platforms: ['PS2'],
    used: false,
    summary: {
      en: 'Dark Cloud, a completed PS2 matching decomp in C++.',
      es: 'Dark Cloud, un decomp matching de PS2 terminado, en C++.',
    },
    details: {
      en: 'The text and data of the NTSC 1.02 release and the PAL review build match, overlays included. Its scripts wire up objdiff, m2c and decomp.me neatly, which makes it a clean finished example to learn from for a PS2 project.',
      es: 'El código y los datos de la versión NTSC 1.02 y de la build de prensa PAL coinciden, overlays incluidos. Sus scripts conectan objdiff, m2c y decomp.me de forma ordenada, lo que lo vuelve un ejemplo terminado y limpio del que aprender para un proyecto de PS2.',
    },
  },
  {
    id: 'sly1',
    name: 'sly1',
    url: 'https://github.com/TheOnlyZac/sly1',
    category: 'projects',
    platforms: ['PS2'],
    used: false,
    summary: {
      en: 'Sly Cooper and the Thievius Raccoonus, a well-documented PS2 decomp.',
      es: 'Sly Cooper and the Thievius Raccoonus, un decomp de PS2 muy bien documentado.',
    },
    details: {
      en: 'Still early in its progress, but its contributor guide and its MIPS and PS2 cheat sheet are among the best introductions to a PS2 project built with ee-gcc and splat.',
      es: 'Su progreso aún es temprano, pero su guía para contribuir y su chuleta de MIPS y PS2 están entre las mejores introducciones a un proyecto de PS2 hecho con ee-gcc y splat.',
    },
  },
  {
    id: '3s-decomp',
    name: '3s-decomp',
    url: 'https://github.com/crowded-street/3s-decomp',
    category: 'projects',
    platforms: ['PS2'],
    used: false,
    summary: {
      en: 'Street Fighter III: 3rd Strike, the reference for PS2 games built with Metrowerks.',
      es: 'Street Fighter III: 3rd Strike, la referencia para juegos de PS2 hechos con Metrowerks.',
    },
    details: {
      en: 'The game code is fully decompiled, with mwccps2 running under wibo and mwccgap for the functions still in assembly. If your PS2 game was built with MWCC instead of GCC, start by reading how this project is set up.',
      es: 'El código del juego está decompilado por completo, con mwccps2 corriendo bajo wibo y mwccgap para las funciones que siguen en ensamblador. Si tu juego de PS2 se compiló con MWCC en vez de GCC, empieza leyendo cómo está montado este proyecto.',
    },
  },
  {
    id: 'ps1-ps2-decomp-discord',
    name: 'PS1/PS2 Decompilation',
    url: 'https://discord.gg/VwCPdfbxgm',
    category: 'community',
    platforms: ['PS1', 'PS2'],
    used: false,
    summary: {
      en: 'The Discord where PS1 and PS2 decomp projects meet.',
      es: 'El Discord donde se reúnen los proyectos de decomp de PS1 y PS2.',
    },
    details: {
      en: 'Thousands of people working on matching decomps for both consoles, with many projects hosted there. The place to ask why a function will not match, which compiler a game used, or whether someone already knows that engine.',
      es: 'Miles de personas trabajando en decomps matching de ambas consolas, con muchos proyectos alojados ahí. El lugar para preguntar por qué una función no hace match, qué compilador usó un juego o si alguien ya conoce ese motor.',
    },
  },
  {
    id: 'psx-dev',
    name: 'PSX.Dev',
    url: 'https://discord.gg/QByKPpH',
    category: 'community',
    platforms: ['PS1'],
    used: false,
    summary: {
      en: 'The PS1 development and reverse-engineering community.',
      es: 'La comunidad de desarrollo e ingeniería inversa de PS1.',
    },
    details: {
      en: 'Home of the people behind PCSX-Redux, psx-spx and the open PS1 SDKs. Less about matching, but the best place for questions about the hardware, the SDK or the emulators.',
      es: 'El hogar de la gente detrás de PCSX-Redux, psx-spx y los SDK abiertos de PS1. Menos centrada en matching, pero el mejor sitio para preguntas sobre el hardware, el SDK o los emuladores.',
    },
  },
  {
    id: 'decomp-me-discord',
    name: 'decomp.me Discord',
    url: 'https://discord.gg/sutqNShRRs',
    category: 'community',
    platforms: ['Multi'],
    used: false,
    summary: {
      en: 'The community around decomp.me, across every console.',
      es: 'La comunidad alrededor de decomp.me, de todas las consolas.',
    },
    details: {
      en: 'Matching decompilers from the N64, GameCube, PS1, PS2 and more. Good for tool questions and for sharing a scratch you are stuck on.',
      es: 'Gente de decomps matching de N64, GameCube, PS1, PS2 y más. Bueno para dudas sobre herramientas y para compartir un scratch en el que te atascaste.',
    },
  },
]
