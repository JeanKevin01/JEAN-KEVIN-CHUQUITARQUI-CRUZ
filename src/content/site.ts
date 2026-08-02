/**
 * Contenido del sitio, bilingüe (es / en).
 *
 * Regla de confidencialidad aplicada en todo el archivo:
 * el sistema se describe de forma genérica —"una operación minera",
 * "contratos de obra"— sin nombres de cliente, de campamento, de área de planta,
 * números de orden de trabajo ni datos de trabajadores.
 */

export type Lang = 'es' | 'en'
export type L = Record<Lang, string>

export const PERFIL = {
  nombre: 'Jean Kevin Chuquitarqui Cruz',
  rol: {
    es: 'Ingeniero Civil · Arquitectura de sistemas para control de obra',
    en: 'Civil Engineer · Systems architecture for construction control',
  } as L,
  ubicacion: { es: 'Arequipa, Perú', en: 'Arequipa, Peru' } as L,
  email: 'jean.chuquitarqui@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jean-kevin-chuquitarqui',
  github: 'https://github.com/JeanKevin01',
}

/* ── Hero ─────────────────────────────────────────────────────────── */

export const HERO = {
  kicker: {
    es: 'Bachiller en Ingeniería Civil — UCSP · Arequipa, Perú',
    en: 'BSc Civil Engineering — UCSP · Arequipa, Peru',
  } as L,
  titulo: {
    es: 'Del tareo en campo\nal resultado operativo.',
    en: 'From the field timesheet\nto the operating result.',
  } as L,
  subtitulo: {
    es: 'Sin Excel de por medio.',
    en: 'With no spreadsheet in between.',
  } as L,
  parrafo: {
    es: 'No vengo de la informática: vengo de la obra. Aprendí a programar porque el problema que tenía adelante no se resolvía con otra plantilla de Excel. Hoy diseño y construyo el sistema que mide si un proyecto de construcción realmente gana dinero.',
    en: 'I did not come from computer science: I came from the field. I learned to program because the problem in front of me could not be solved with one more spreadsheet template. Today I design and build the system that measures whether a construction project actually makes money.',
  } as L,
  cta1: { es: 'Ver el sistema', en: 'See the system' } as L,
  cta2: { es: 'Para una tesis', en: 'For a thesis' } as L,
  // La honestidad que vive en la pantalla 12 también tiene que estar arriba:
  // es lo que compra credibilidad con un académico en los primeros segundos.
  datos: [
    { es: 'En producción', en: 'In production' } as L,
    { es: '12 semanas', en: '12 weeks' } as L,
    { es: 'Una persona', en: 'One person' } as L,
    { es: 'En validación, sin usuarios activos', en: 'In validation, no active users' } as L,
  ],
}

/* ── El problema: la cadena rota ──────────────────────────────────── */

export const CADENA = {
  eyebrow: { es: '01 — El problema', en: '01 — The problem' } as L,
  titulo: {
    es: 'Cinco archivos que no se hablan',
    en: 'Five files that never talk to each other',
  } as L,
  intro: {
    es: 'En la oficina técnica de un contratista, el ciclo de control funciona así en la práctica. Cada salto es una re-digitación, y cada re-digitación es una oportunidad de error que nadie audita.',
    en: 'In a contractor’s technical office, the control cycle works like this in practice. Every hop is a re-entry, and every re-entry is an error nobody audits.',
  } as L,
  pasos: [
    {
      n: '01',
      t: { es: 'El turno se anota a mano', en: 'The shift is written by hand' } as L,
      d: {
        es: 'Cuaderno o mensaje de WhatsApp al final del turno.',
        en: 'A notebook or a WhatsApp message at the end of the shift.',
      } as L,
    },
    {
      n: '02',
      t: { es: 'Alguien lo re-digita', en: 'Someone retypes it' } as L,
      d: {
        es: 'Del papel a la primera hoja de cálculo, en oficina.',
        en: 'From paper into the first spreadsheet, back at the office.',
      } as L,
    },
    {
      n: '03',
      t: { es: 'Otro archivo calcula el avance', en: 'Another file computes progress' } as L,
      d: {
        es: 'Con fórmulas que solo su autor entiende del todo.',
        en: 'With formulas only their author fully understands.',
      } as L,
    },
    {
      n: '04',
      t: { es: 'Un tercero arma el informe', en: 'A third one builds the report' } as L,
      d: {
        es: 'El informe semanal de producción que se envía al cliente.',
        en: 'The weekly production report sent to the client.',
      } as L,
    },
    {
      n: '05',
      t: { es: 'A fin de mes, ¿ganamos o perdimos?', en: 'At month end: did we win or lose?' } as L,
      d: {
        es: 'Un cuarto archivo intenta responderlo. Llega tarde para corregir.',
        en: 'A fourth file tries to answer. It arrives too late to fix anything.',
      } as L,
    },
  ],
  remate: {
    es: 'Cuando el número final no cuadra, no hay forma de rastrear en qué eslabón se rompió. El problema no es que falte un software: es que **el dato nace desconectado del sistema que lo tiene que usar**.',
    en: 'When the final number does not add up, there is no way to trace which link broke. The problem is not a missing piece of software: **the data is born disconnected from the system that has to use it**.',
  } as L,
}

/* ── El recorrido de un dato ──────────────────────────────────────── */

/**
 * La pieza que demuestra la tesis del sitio: un registro de campo atraviesa
 * las cuatro etapas sin que nadie lo vuelva a digitar. Las cifras son un
 * ejemplo trabajado, no datos de una obra — se etiqueta como tal.
 */
export const RECORRIDO = {
  et: { es: 'Ejemplo trabajado', en: 'Worked example' } as L,
  titulo: {
    es: 'Un registro, cuatro etapas, cero re-digitación',
    en: 'One record, four stages, zero re-entry',
  } as L,
  pasos: [
    {
      n: '01',
      donde: { es: 'En campo, 6 de la tarde', en: 'On site, six in the evening' } as L,
      que: {
        es: 'Cuadrilla 3 · partida 3.2.1 · vaciado de concreto',
        en: 'Crew 3 · item 3.2.1 · concrete pour',
      } as L,
      dato: '8,0 HH',
      datoEn: '8.0 MH',
      nota: {
        es: 'El supervisor lo registra en el celular. Si no hay señal, queda en el teléfono y sube solo cuando vuelve.',
        en: 'The supervisor records it on the phone. With no signal it stays there and uploads by itself when coverage returns.',
      } as L,
    },
    {
      n: '02',
      donde: { es: 'Motor de valor ganado', en: 'Earned value engine' } as L,
      que: {
        es: 'Hito «vaciado» (40%) sobre un metrado de 15 m³',
        en: '“Pour” milestone (40%) over a 15 m³ quantity',
      } as L,
      dato: '+7,5 HH ganadas',
      datoEn: '+7.5 MH earned',
      nota: {
        es: 'El avance físico se convierte a horas-hombre con la productividad que el presupuesto le asignó a esa partida.',
        en: 'Physical progress converts to man-hours using the productivity the budget assigned to that work item.',
      } as L,
    },
    {
      n: '03',
      donde: { es: 'Indicadores de la semana', en: 'Weekly indicators' } as L,
      que: {
        es: '7,5 ganadas ÷ 8,0 gastadas, contra la curva del plan',
        en: '7.5 earned ÷ 8.0 spent, against the planned curve',
      } as L,
      dato: 'ISP 0,94',
      datoEn: 'ISP 0.94',
      nota: {
        es: 'Productividad y cronograma salen del mismo registro. Nadie abrió una hoja de cálculo.',
        en: 'Productivity and schedule come from the same record. Nobody opened a spreadsheet.',
      } as L,
    },
    {
      n: '04',
      donde: { es: 'Resultado operativo del mes', en: 'Monthly operating result' } as L,
      que: {
        es: 'Esas 8,0 HH entran al costo por la tarifa del cargo',
        en: 'Those 8.0 MH enter cost through the role’s rate',
      } as L,
      dato: 'margen −2,1%',
      datoEn: 'margin −2.1%',
      nota: {
        es: 'El mismo dato de las seis de la tarde llega hasta la pregunta que importa: ¿este proyecto gana dinero?',
        en: 'That same six-o’clock record reaches the question that matters: is this project making money?',
      } as L,
    },
  ],
  remate: {
    es: 'En la cadena rota de arriba, este mismo recorrido son **cinco archivos y cuatro re-digitaciones**. Aquí es una sola escritura.',
    en: 'In the broken chain above, this same journey is **five files and four re-entries**. Here it is a single write.',
  } as L,
}

/* ── Qué resuelve ─────────────────────────────────────────────────── */

export const RESUELVE = {
  eyebrow: { es: '02 — Qué resuelve', en: '02 — What it solves' } as L,
  titulo: {
    es: 'Cuatro cosas que dejan de pasar',
    en: 'Four things that stop happening',
  } as L,
  intro: {
    es: 'Sin entrar todavía en cómo está hecho por dentro: esto es lo que cambia en la oficina técnica el lunes por la mañana.',
    en: 'Without going into how it works inside yet: this is what changes in the technical office on Monday morning.',
  } as L,
  items: [
    {
      antes: {
        es: 'El informe semanal se armaba a mano, cruzando tres archivos.',
        en: 'The weekly report was assembled by hand, cross-checking three files.',
      } as L,
      ahora: {
        es: 'Sale del mismo dato que registró el supervisor en campo. Nadie vuelve a digitar nada.',
        en: 'It comes out of the same record the supervisor entered in the field. Nobody retypes anything.',
      } as L,
    },
    {
      antes: {
        es: 'El avance de una partida era la opinión de quien la miraba.',
        en: 'A work item’s progress was the opinion of whoever looked at it.',
      } as L,
      ahora: {
        es: 'Es la suma de hitos verificables: habilitado, encofrado, vaciado. Auditable ante el cliente que lo firma.',
        en: 'It is the sum of verifiable milestones: prep, formwork, pour. Auditable before the client who signs it.',
      } as L,
    },
    {
      antes: {
        es: 'Si el proyecto iba atrasado, se sabía al cierre del mes.',
        en: 'If the project was behind, you found out at month close.',
      } as L,
      ahora: {
        es: 'Se ve en la curva de la misma semana, cuando todavía se puede corregir.',
        en: 'You see it on the curve the same week, while there is still time to correct.',
      } as L,
    },
    {
      antes: {
        es: 'El supervisor sin señal anotaba en papel y lo pasaba al día siguiente, o al otro.',
        en: 'With no signal the supervisor wrote on paper and typed it in the next day, or the one after.',
      } as L,
      ahora: {
        es: 'Registra en el celular igual: queda en el teléfono y sube solo cuando vuelve la cobertura.',
        en: 'They record on the phone anyway: it stays there and uploads by itself when coverage returns.',
      } as L,
    },
  ],
  etAntes: { es: 'Antes', en: 'Before' } as L,
  etAhora: { es: 'Ahora', en: 'Now' } as L,
}

/* ── El producto, en pantalla ─────────────────────────────────────── */

export const PRODUCTO = {
  eyebrow: { es: '04 — El producto', en: '04 — The product' } as L,
  titulo: {
    es: 'Esto es lo que ve la oficina técnica',
    en: 'This is what the technical office sees',
  } as L,
  intro: {
    es: 'El sistema es real y está corriendo en producción; esto no son maquetas. Los datos que se ven corresponden a un proyecto de demostración, no a un cliente: la obra que valida el motor de cálculo está bajo confidencialidad.',
    en: 'The system is real and running in production; these are not mockups. The data shown belongs to a demonstration project, not to a client: the site that validates the calculation engine is under confidentiality.',
  } as L,
  ampliar: { es: 'Clic para ampliar', en: 'Click to enlarge' } as L,
  cerrar: { es: 'Cerrar', en: 'Close' } as L,
  cta: {
    t: { es: '¿Y con sus propios números?', en: 'And with your own numbers?' } as L,
    d: {
      es: 'El sistema está corriendo. Si quiere verlo con las partidas y las cuadrillas de su obra, una llamada de veinte minutos alcanza para saber si encaja.',
      en: 'The system is running. To see it with your own work items and crews, a twenty-minute call is enough to tell whether it fits.',
    } as L,
    boton: { es: 'Agendar una demostración', en: 'Book a walkthrough' } as L,
  },
  vistas: [
    {
      k: 'lookahead',
      t: { es: 'LookAhead a 4 semanas', en: 'Four-week look-ahead' } as L,
      pregunta: { es: '¿Qué viene y qué lo bloquea?', en: 'What is coming and what blocks it?' } as L,
      d: {
        es: 'La ventana móvil de cuatro semanas con la estructura real de la obra: partida, etapas con su peso, metrado base contra saldo, responsable y encadenamiento entre etapas. Se filtra por área y por frente, y sale en PDF para la reunión del lunes.',
        en: 'The rolling four-week window with the real work breakdown: work item, weighted stages, base quantity against remaining, owner and stage-to-stage links. Filterable by area and front, exportable to PDF for the Monday meeting.',
      } as L,
      chips: {
        es: ['ventana de 4 semanas', 'etapas ponderadas', 'saldo por partida', 'PDF'],
        en: ['4-week window', 'weighted stages', 'remaining per item', 'PDF'],
      },
    },
    {
      k: 'programacion',
      t: { es: 'Plan semanal y parte diario', en: 'Weekly plan and daily report' } as L,
      pregunta: { es: '¿Qué se planificó y qué pasó?', en: 'What was planned and what happened?' } as L,
      d: {
        es: 'El plan del planner y el reporte de campo en el mismo calendario: lo programado, lo ejecutado y las fotos que mandó el supervisor desde la obra. No son dos sistemas que después hay que cruzar.',
        en: 'The planner’s schedule and the field report on one calendar: what was scheduled, what was executed and the photos the supervisor sent from site. Not two systems to reconcile later.',
      } as L,
      chips: {
        es: ['plan semanal', 'ejecutado', 'evidencia fotográfica'],
        en: ['weekly plan', 'executed', 'photo evidence'],
      },
    },
    {
      k: 'histograma',
      t: { es: 'Histograma y ratios', en: 'Histogram and ratios' } as L,
      pregunta: { es: '¿Cuánta gente hace falta y rinde?', en: 'How many people, and do they perform?' } as L,
      d: {
        es: 'Cuánta mano de obra pide el plan cada día, y el ratio de horas-hombre por unidad de cada partida contra lo presupuestado. Verde si iguala o mejora el estándar, rojo si lo consume de más.',
        en: 'How much labour the plan requires each day, and each work item’s man-hours per unit against budget. Green if it matches or beats the standard, red if it burns more.',
      } as L,
      chips: {
        es: ['histograma de MO', 'ratio HH/unidad', 'real vs presupuesto'],
        en: ['labour histogram', 'MH per unit', 'actual vs budget'],
      },
    },
    {
      k: 'curva-s',
      t: { es: 'Curva S · valor ganado', en: 'S-curve · earned value' } as L,
      pregunta: { es: '¿Vamos atrasados o adelantados?', en: 'Are we behind or ahead?' } as L,
      d: {
        es: 'Tres curvas en el mismo gráfico: lo que el plan decía que se debía llevar, lo que realmente se ganó y lo que costó. Arriba, los índices que cualquier cliente que trabaje con valor ganado reconoce sin explicación previa.',
        en: 'Three curves on one chart: what the plan said should be done, what was actually earned and what it cost. Above them, the indices any client working with earned value recognises without explanation.',
      } as L,
      chips: {
        es: ['SPI', 'CPI', 'BAC', 'EAC', 'VAC', 'TCPI'],
        en: ['SPI', 'CPI', 'BAC', 'EAC', 'VAC', 'TCPI'],
      },
    },
    {
      k: 'valor-ganado',
      t: { es: 'Avance por hitos ponderados', en: 'Weighted-milestone progress' } as L,
      pregunta: { es: '¿Cuánto se avanzó de verdad?', en: 'How much progress is real?' } as L,
      d: {
        es: 'El porcentaje de avance del proyecto, las horas-hombre ganadas contra las gastadas y la proyección al término. Todo desagregable por fase, por disciplina y por área.',
        en: 'Project percent complete, earned man-hours against spent ones and the projection at completion. All of it broken down by phase, discipline and area.',
      } as L,
      chips: {
        es: ['% avance', 'HH ganadas', 'HH gastadas', 'proyección'],
        en: ['% complete', 'earned MH', 'spent MH', 'forecast'],
      },
    },
    {
      k: 'resumen-ejecutivo',
      t: { es: 'Resumen ejecutivo', en: 'Executive summary' } as L,
      pregunta: { es: '¿Qué se le manda al cliente?', en: 'What goes to the client?' } as L,
      d: {
        es: 'La tabla área × disciplina que antes se armaba a mano cada semana. Sale del mismo dato de campo, con el semáforo de productividad ya calculado por fila.',
        en: 'The area × discipline table that used to be assembled by hand every week. It comes from the same field record, with the productivity traffic light already computed per row.',
      } as L,
      chips: {
        es: ['por área', 'por disciplina', 'exportable a PDF'],
        en: ['by area', 'by discipline', 'PDF export'],
      },
    },
    {
      k: 'isp',
      t: { es: 'Productividad por disciplina', en: 'Productivity by discipline' } as L,
      pregunta: { es: '¿Dónde se está perdiendo?', en: 'Where are we losing?' } as L,
      d: {
        es: 'Horas planificadas, ganadas y gastadas por disciplina, con las horas improductivas registradas aparte para que no ensucien el indicador de las partidas.',
        en: 'Planned, earned and spent hours per discipline, with unproductive hours logged separately so they do not contaminate the work items’ indicator.',
      } as L,
      chips: {
        es: ['por disciplina', 'HH improductivas', 'ISP'],
        en: ['by discipline', 'unproductive MH', 'ISP'],
      },
    },
  ],
}

/* ── Restricciones físicas ────────────────────────────────────────── */

export const RESTRICCIONES = {
  eyebrow: { es: '05 — El terreno manda', en: '05 — The ground rules' } as L,
  titulo: {
    es: 'Cuatro restricciones físicas, no una moda tecnológica',
    en: 'Four physical constraints, not a tech trend',
  } as L,
  intro: {
    es: 'Casi todas las decisiones de arquitectura del sistema se explican por estas cuatro cosas. Ninguna es una preferencia de diseño.',
    en: 'Almost every architectural decision in the system follows from these four facts. None of them is a design preference.',
  } as L,
  items: [
    {
      icono: 'signal',
      t: { es: 'No hay señal', en: 'There is no signal' } as L,
      d: {
        es: 'En gran parte de una operación minera no hay cobertura. El sistema tiene que funcionar offline y sincronizar después sin duplicar ni perder nada.',
        en: 'Large parts of a mining operation have no coverage. The system must work offline and sync later without duplicating or losing anything.',
      } as L,
      consec: {
        es: '→ PWA offline-first con outbox idempotente',
        en: '→ Offline-first PWA with an idempotent outbox',
      } as L,
    },
    {
      icono: 'glove',
      t: { es: 'Se trabaja con guantes', en: 'People wear gloves' } as L,
      d: {
        es: 'Con sol, con polvo y apurado al final del turno. Cada pantalla extra es un dato que no se va a registrar.',
        en: 'Under the sun, in dust, in a hurry at the end of the shift. Every extra screen is a record that will never be entered.',
      } as L,
      consec: {
        es: '→ Registro por QR, mínimo de toques',
        en: '→ QR-based capture, minimum taps',
      } as L,
    },
    {
      icono: 'disk',
      t: { es: 'El disco cuesta', en: 'Storage costs money' } as L,
      d: {
        es: 'Las fotos de evidencia no pueden acumularse para siempre en un servidor que alguien paga cada mes.',
        en: 'Evidence photos cannot pile up forever on a server somebody pays for every month.',
      } as L,
      consec: {
        es: '→ Fotos en disco con retención y purga, no en la base de datos',
        en: '→ Photos on disk with retention and purge, never in the database',
      } as L,
    },
    {
      icono: 'pdf',
      t: { es: 'El cliente firma un PDF', en: 'The client signs a PDF' } as L,
      d: {
        es: 'El entregable que se acepta no es un dashboard bonito: es un documento imprimible con su sustento fotográfico.',
        en: 'The accepted deliverable is not a pretty dashboard: it is a printable document with its photographic backup.',
      } as L,
      consec: {
        es: '→ Generación de PDF en Python puro, sin navegador headless',
        en: '→ PDF generation in pure Python, no headless browser',
      } as L,
    },
  ],
}

/* ── El sistema ───────────────────────────────────────────────────── */

export const SISTEMA = {
  eyebrow: { es: '03 — El sistema', en: '03 — The system' } as L,
  nombre: 'ASTRA ERA',
  titulo: {
    es: 'Un dato de origen, una sola cadena',
    en: 'One source record, one single chain',
  } as L,
  intro: {
    es: 'Un supervisor registra en el celular quién trabajó, cuántas horas y en qué partida —incluso sin señal—. Ese dato alimenta solo, y sin re-digitación, el valor ganado, la programación Last Planner y el resultado operativo mensual del proyecto.',
    en: 'A supervisor records on a phone who worked, how many hours and on which work item —even with no signal. That single record feeds earned value, Last Planner scheduling and the monthly operating result, with no re-entry anywhere.',
  } as L,
  componentes: [
    {
      k: 'campo',
      t: { es: 'App de campo', en: 'Field app' } as L,
      d: {
        es: 'El supervisor registra el tareo (horas-hombre por trabajador y partida, con QR opcional) y el parte diario con fotos. Guarda siempre primero en el teléfono y sincroniza sola cuando vuelve la señal.',
        en: 'The supervisor records the timesheet (man-hours per worker and work item, optional QR) and the daily report with photos. It always saves to the phone first and syncs itself when signal returns.',
      } as L,
      stack: 'PWA · Service Worker · IndexedDB',
    },
    {
      k: 'panel',
      t: { es: 'Panel de oficina', en: 'Office panel' } as L,
      d: {
        es: 'Programación Last Planner (LookAhead, PPC, restricciones), valor ganado (ISP, Curva S, EVM), presupuesto y análisis de precios unitarios, resultado operativo mensual y exportables en PDF.',
        en: 'Last Planner scheduling (look-ahead, PPC, constraints), earned value (ISP, S-curve, EVM), budget and unit-price analysis, monthly operating result and PDF exports.',
      } as L,
      stack: 'React 19 · TypeScript · Vite',
    },
    {
      k: 'api',
      t: { es: 'API y motor de cálculo', en: 'API and calculation engine' } as L,
      d: {
        es: 'La fuente única de verdad. Todo cálculo de avance, desvío y margen ocurre aquí, en funciones puras cubiertas por tests, sobre un esquema versionado con migraciones reversibles.',
        en: 'The single source of truth. Every progress, deviation and margin calculation happens here, in pure tested functions, over a versioned schema with reversible migrations.',
      } as L,
      stack: 'FastAPI · PostgreSQL · Alembic',
    },
  ],
  flujo: [
    {
      t: { es: 'Tareo en campo', en: 'Field timesheet' } as L,
      d: { es: 'HH × trabajador × partida × día', en: 'MH × worker × work item × day' } as L,
    },
    {
      t: { es: 'Motor de valor ganado', en: 'Earned value engine' } as L,
      d: {
        es: 'hitos ponderados → % avance → HH ganadas',
        en: 'weighted milestones → % complete → earned MH',
      } as L,
    },
    {
      t: { es: 'ISP · Curva S · EVM · PPC', en: 'ISP · S-curve · EVM · PPC' } as L,
      d: {
        es: 'productividad, cronograma y cumplimiento',
        en: 'productivity, schedule and commitment reliability',
      } as L,
    },
    {
      t: { es: 'Resultado operativo', en: 'Operating result' } as L,
      d: { es: '¿el proyecto es rentable?', en: 'is the project profitable?' } as L,
    },
  ],
  sinIA: {
    t: {
      es: 'Este sistema no tiene inteligencia artificial adentro',
      en: 'This system has no artificial intelligence inside',
    } as L,
    d: {
      es: 'Es un sistema de medición determinista. No hay un modelo adivinando cuánto avanzó una partida, porque ese número tiene que ser auditable ante un cliente que lo va a firmar. La IA estuvo en cómo se construyó, no en lo que vende.',
      en: 'It is a deterministic measurement system. No model guesses how much a work item advanced, because that number has to be auditable before a client who will sign it. AI was in how it was built, not in what it sells.',
    } as L,
  },
}

/* ── Cifras ───────────────────────────────────────────────────────── */

export const CIFRAS = {
  eyebrow: { es: '06 — Cifras', en: '06 — Numbers' } as L,
  titulo: { es: 'Doce semanas, una persona', en: 'Twelve weeks, one person' } as L,
  corte: { es: 'Corte: 26 de julio de 2026', en: 'As of: July 26, 2026' } as L,
  items: [
    { v: 32400, suf: '', t: { es: 'líneas de código propias', en: 'lines of own code' } as L },
    { v: 161, suf: '', t: { es: 'endpoints de API', en: 'API endpoints' } as L },
    { v: 52, suf: '', t: { es: 'tablas en base de datos', en: 'database tables' } as L },
    {
      v: 33,
      suf: '',
      t: { es: 'migraciones reversibles', en: 'reversible migrations' } as L,
    },
    { v: 206, suf: '', t: { es: 'pruebas automatizadas', en: 'automated tests' } as L },
    { v: 72, suf: '', t: { es: 'verificaciones end-to-end', en: 'end-to-end checks' } as L },
    { v: 328, suf: '', t: { es: 'commits', en: 'commits' } as L },
    { v: 12, suf: '', t: { es: 'semanas de construcción', en: 'weeks of construction' } as L },
  ],
  validacion: {
    t: {
      es: 'No lo validé contra sí mismo',
      en: 'I did not validate it against itself',
    } as L,
    d: {
      es: 'Lo validé contra las hojas de cálculo reales que la organización ya aceptaba: el informe semanal de producción, el presupuesto meta y el cierre de un resultado operativo. El motor reproduce esos números exactos. No inventé una forma nueva de medir; repliqué la que ya se usaba, que es lo único que lo hace adoptable.',
      en: 'I validated it against the real spreadsheets the organization already accepted: the weekly production report, the target budget and the closing of an operating result. The engine reproduces those exact numbers. I did not invent a new way to measure; I replicated the one already in use, which is the only thing that makes it adoptable.',
    } as L,
    pruebas: [
      {
        t: { es: 'Informe semanal de producción', en: 'Weekly production report' } as L,
        d: {
          es: 'El % de avance del proyecto reproduce la celda del archivo original.',
          en: 'Project % complete reproduces the cell in the original file.',
        } as L,
      },
      {
        t: { es: 'Presupuesto meta', en: 'Target budget' } as L,
        d: {
          es: 'El parser reproduce el total exacto en USD y en horas-hombre.',
          en: 'The parser reproduces the exact total in USD and in man-hours.',
        } as L,
      },
      {
        t: { es: 'Resultado operativo mensual', en: 'Monthly operating result' } as L,
        d: {
          es: 'El motor reproduce el margen y el porcentaje del cierre real de referencia.',
          en: 'The engine reproduces the margin and percentage of the reference real closing.',
        } as L,
      },
    ],
  },
}

/* ── Grafo ────────────────────────────────────────────────────────── */

export const GRAFO = {
  eyebrow: { es: '07 — El código, por dentro', en: '07 — The code, from inside' } as L,
  titulo: { es: 'El grafo real del sistema', en: 'The real graph of the system' } as L,
  intro: {
    es: 'Esto no es una ilustración. Es el grafo de conocimiento extraído de los tres repositorios con un indexador estático: cada esfera es un archivo real, su tamaño es la cantidad de símbolos que define y cada arista es una relación de llamada agregada entre archivos. Gira, acerca y haz clic en cualquier nodo.',
    en: 'This is not an illustration. It is the knowledge graph extracted from the three repositories with a static indexer: every sphere is a real file, its size is how many symbols it defines, and every edge is an aggregated call relationship between files. Rotate, zoom and click any node.',
  } as L,
  leyenda: { es: 'Capas', en: 'Layers' } as L,
  capas: {
    'motor-ev': { es: 'Motor de valor ganado', en: 'Earned value engine' } as L,
    'api-http': { es: 'Rutas HTTP', en: 'HTTP routes' } as L,
    nucleo: { es: 'Núcleo compartido', en: 'Shared core' } as L,
    migraciones: { es: 'Migraciones', en: 'Migrations' } as L,
    tests: { es: 'Pruebas', en: 'Tests' } as L,
    parsers: { es: 'Parsers', en: 'Parsers' } as L,
    infra: { es: 'Infraestructura', en: 'Infrastructure' } as L,
    pantallas: { es: 'Pantallas', en: 'Screens' } as L,
    componentes: { es: 'Componentes', en: 'Components' } as L,
    pdf: { es: 'Documentos PDF', en: 'PDF documents' } as L,
    campo: { es: 'App de campo', en: 'Field app' } as L,
  } as Record<string, L>,
  ui: {
    todos: { es: 'Todo', en: 'All' } as L,
    girar: { es: 'Rotación', en: 'Auto-rotate' } as L,
    archivo: { es: 'Archivo', en: 'File' } as L,
    simbolos: { es: 'símbolos definidos', en: 'symbols defined' } as L,
    conexiones: { es: 'peso de conexiones', en: 'connection weight' } as L,
    capa: { es: 'Capa', en: 'Layer' } as L,
    repositorio: { es: 'Repositorio', en: 'Repository' } as L,
    vecinos: { es: 'Conecta con', en: 'Connects to' } as L,
    pista: {
      es: 'Arrastra para girar · rueda para acercar · clic en un nodo',
      en: 'Drag to rotate · scroll to zoom · click a node',
    } as L,
    cargando: { es: 'Cargando el grafo…', en: 'Loading the graph…' } as L,
    nota: {
      es: 'Vista agregada a nivel de archivo. El índice completo contiene 2.518 nodos y 8.801 aristas a nivel de símbolo (funciones, clases, rutas, variables).',
      en: 'File-level aggregated view. The full index holds 2,518 nodes and 8,801 edges at symbol level (functions, classes, routes, variables).',
    } as L,
  },
}

/* ── Para un asesor de tesis ──────────────────────────────────────── */

/**
 * Audiencia prioritaria del sitio. Redactado como borrador defendible: la
 * pregunta y el alcance los tiene que cerrar el asesor, pero llegar con esto
 * escrito cambia la conversación de "mira lo que hice" a "esto es dirigible".
 */
export const TESIS = {
  eyebrow: { es: '07 — Investigación', en: '07 — Research' } as L,
  titulo: {
    es: 'Esto también es una tesis',
    en: 'This is also a thesis',
  } as L,
  intro: {
    es: 'El sistema está construido y desplegado; falta medirlo. Lo que sigue es el diseño de investigación con el que se puede convertir el piloto en evidencia, planteado para discutirse y corregirse, no como algo cerrado.',
    en: 'The system is built and deployed; what is missing is measuring it. What follows is the research design that turns the pilot into evidence — written to be discussed and corrected, not as something closed.',
  } as L,
  pregunta: {
    et: { es: 'Pregunta de investigación', en: 'Research question' } as L,
    d: {
      es: '¿Qué efecto tiene sustituir la captura manual del tareo por captura digital en campo sobre la **latencia** y la **confiabilidad** de los indicadores de control de producción —avance físico, productividad y cumplimiento del plan— en un contrato de obra civil?',
      en: 'What effect does replacing manual timesheet capture with digital field capture have on the **latency** and **reliability** of production-control indicators —physical progress, productivity and plan compliance— in a civil works contract?',
    } as L,
  },
  bloques: [
    {
      t: { es: 'Diseño', en: 'Design' } as L,
      d: {
        es: 'Pre-experimental de un solo grupo, medición antes y después. La línea base es el proceso actual en hojas de cálculo, reconstruida de los informes ya emitidos; el período de tratamiento es el piloto con el sistema en los mismos frentes y con las mismas cuadrillas.',
        en: 'Single-group pre-experimental design with before/after measurement. The baseline is the current spreadsheet process, reconstructed from reports already issued; the treatment period is the pilot running on the same fronts with the same crews.',
      } as L,
    },
    {
      t: { es: 'Variables medidas', en: 'Measured variables' } as L,
      d: {
        es: 'Horas entre el cierre del turno y el indicador disponible · número de re-digitaciones por ciclo semanal · discrepancia entre el avance declarado y el avance auditable por hitos · PPC y causas de no cumplimiento · SPI y CPI del período.',
        en: 'Hours between shift close and indicator availability · re-entries per weekly cycle · gap between declared progress and milestone-auditable progress · PPC and non-completion causes · period SPI and CPI.',
      } as L,
    },
    {
      t: { es: 'Marco de referencia', en: 'Reference framework' } as L,
      d: {
        es: 'Earned Value Management (PMI) para avance y desvío · Last Planner System (Ballard) para confiabilidad de la planificación · Physical % Complete con Activity Steps, tal como lo modela Primavera P6, para que el avance sea auditable y no declarativo.',
        en: 'Earned Value Management (PMI) for progress and variance · Last Planner System (Ballard) for planning reliability · Physical % Complete with Activity Steps, as modelled by Primavera P6, so progress is auditable rather than declarative.',
      } as L,
    },
    {
      t: { es: 'Aporte esperado', en: 'Expected contribution' } as L,
      d: {
        es: 'Evidencia cuantitativa, en contexto peruano, de un problema que la literatura de lean construction describe pero rara vez mide: cuánto cuesta en tiempo y en exactitud que el dato de producción nazca desconectado del sistema que lo usa.',
        en: 'Quantitative evidence, in a Peruvian context, of a problem the lean-construction literature describes but rarely measures: what it costs in time and accuracy for production data to be born disconnected from the system that consumes it.',
      } as L,
    },
  ],
  agenda: {
    t: {
      es: 'Lo que todavía no está resuelto es parte de la agenda',
      en: 'What is still unsolved is part of the agenda',
    } as L,
    d: {
      es: 'Un sistema sin límites declarados no es investigable. Los dos que más pesan —la línea base congelada y un indicador de productividad que hoy da el doble del estándar presupuestado— están identificados, documentados y deliberadamente abiertos: son exactamente el tipo de pregunta que un piloto con datos reales puede cerrar.',
      en: 'A system with no declared limits is not researchable. The two that weigh most —the frozen baseline and a productivity indicator currently reading twice the budgeted standard— are identified, documented and deliberately open: precisely the kind of question a pilot with real data can settle.',
    } as L,
  },
  cta: { es: 'Conversemos sobre la tesis', en: 'Let’s talk about the thesis' } as L,
  ctaNota: {
    es: 'Veinte minutos bastan para ver si encaja con su línea de investigación.',
    en: 'Twenty minutes is enough to see whether it fits your research line.',
  } as L,
}

/* ── Puerta al detalle técnico ────────────────────────────────────── */

export const DETALLE = {
  eyebrow: { es: '08 — Detalle técnico', en: '08 — Technical detail' } as L,
  titulo: {
    es: 'Cómo está hecho por dentro',
    en: 'How it works inside',
  } as L,
  intro: {
    es: 'Hasta aquí está lo que el sistema resuelve. Lo que sigue es el criterio de ingeniería que lo sostiene: las decisiones de arquitectura, los errores que costaron entenderlas y lo que todavía no está resuelto. Es la parte que interesa en una conversación técnica seria —y la que se puede saltar sin perder el hilo—.',
    en: 'Up to here is what the system solves. What follows is the engineering judgment behind it: the architectural decisions, the bugs it took to understand them and what is still unsolved. It is the part that matters in a serious technical conversation —and the part you can skip without losing the thread.',
  } as L,
  mostrar: { es: 'Abrir el detalle', en: 'Open the detail' } as L,
  ocultar: { es: 'Cerrar el detalle', en: 'Close the detail' } as L,
}

/* ── Decisiones de arquitectura ───────────────────────────────────── */

export const DECISIONES = {
  eyebrow: { es: '08.1 — Criterio', en: '08.1 — Judgment' } as L,
  titulo: {
    es: 'Decisiones, no funcionalidades',
    en: 'Decisions, not features',
  } as L,
  intro: {
    es: 'Un asistente escribe funciones. Nadie más que el arquitecto sabe que sumar dos fuentes de horas destruye el indicador. Estas son las decisiones que sostienen el sistema, cada una con su costo explícito.',
    en: 'An assistant writes functions. Only the architect knows that adding two sources of hours destroys the indicator. These are the decisions that hold the system up, each with its explicit cost.',
  } as L,
  items: [
    {
      n: '4.1',
      t: {
        es: 'La moneda del sistema son horas-hombre, no soles',
        en: 'The system’s currency is man-hours, not money',
      } as L,
      d: {
        es: 'Todo avance físico se convierte a horas-hombre con la productividad presupuestada de cada partida. Instalaste 15 m³ de una partida cuyo estándar es 0,5 HH/m³ → ganaste 7,5 HH.',
        en: 'All physical progress converts to man-hours using each work item’s budgeted productivity. You placed 15 m³ of an item whose standard is 0.5 MH/m³ → you earned 7.5 MH.',
      } as L,
      porque: {
        es: 'Permite sumar concreto con acero y andamios en un solo indicador, y desacopla el control de producción del ruido de precios. El dinero entra después, en el resultado operativo, vía tarifa por cargo.',
        en: 'It lets you add concrete, steel and scaffolding into a single indicator, and decouples production control from price noise. Money enters later, in the operating result, through rate per role.',
      } as L,
    },
    {
      n: '4.2',
      t: {
        es: 'Hitos ponderados, no «80% a ojo»',
        en: 'Weighted milestones, not “about 80%”',
      } as L,
      d: {
        es: 'Cada partida se divide en etapas con pesos que suman exactamente 1,00 —validado en código, se rechaza si no—. Habilitado 30% · Encofrado 30% · Vaciado 40%. El avance es la suma ponderada, con tope anti-sobre-avance.',
        en: 'Each work item splits into stages whose weights sum exactly to 1.00 —enforced in code, rejected otherwise. Prep 30% · Formwork 30% · Pour 40%. Progress is the weighted sum, capped against over-reporting.',
      } as L,
      porque: {
        es: 'El «80% avanzado» declarado por un supervisor no es auditable. Un hito completado sí. Es el mismo mecanismo que Primavera P6 llama Physical % Complete con Activity Steps.',
        en: 'A supervisor’s “80% done” is not auditable. A completed milestone is. It is the same mechanism Primavera P6 calls Physical % Complete with Activity Steps.',
      } as L,
    },
    {
      n: '4.3',
      t: {
        es: 'Precedencia anti-doble-conteo: reemplazo, no suma',
        en: 'Anti-double-count precedence: replace, never add',
      } as L,
      d: {
        es: 'Las horas gastadas pueden venir de tres fuentes: el override manual del residente gana sobre todo; debajo, el tareo real del QR; al fondo, la migración histórica, que solo aplica si no hay nada arriba.',
        en: 'Spent hours can come from three sources: the site manager’s manual override wins over everything; below it, the real QR timesheet; at the bottom, the historical migration, which only applies if nothing above exists.',
      } as L,
      porque: {
        es: 'Si esto sumara, toda partida con carga histórica y tareo real duplicaría sus horas y el indicador de productividad se hundiría a la mitad sin que nadie se diera cuenta. Es un error silencioso, que es la peor clase de error.',
        en: 'If these added up, every item with both historical load and real timesheets would double its hours and the productivity indicator would sink by half with nobody noticing. That is a silent error, the worst kind.',
      } as L,
    },
    {
      n: '4.4',
      t: {
        es: 'Offline-first con outbox idempotente',
        en: 'Offline-first with an idempotent outbox',
      } as L,
      d: {
        es: 'La app guarda siempre primero en el teléfono y luego intenta la red. Cada envío lleva un identificador local; si la respuesta se pierde y el teléfono reintenta, el servidor reconoce el duplicado y devuelve el registro existente en vez de crear otro.',
        en: 'The app always saves to the phone first and only then tries the network. Each submission carries a local id; if the response is lost and the phone retries, the server recognizes the duplicate and returns the existing record instead of creating another.',
      } as L,
      porque: {
        es: 'Sin señal, «reintentar» es la conducta normal, no la excepción. Un sistema que duplica al reintentar es inservible en una mina.',
        en: 'With no signal, “retry” is normal behaviour, not an exception. A system that duplicates on retry is useless in a mine.',
      } as L,
    },
    {
      n: '4.5',
      t: {
        es: 'Fotos en disco con retención, no en la base de datos',
        en: 'Photos on disk with retention, not in the database',
      } as L,
      d: {
        es: 'Las fotos van al disco del servidor, re-encodeadas a JPEG ≤1600 px más miniatura, servidas con URLs firmadas de quince minutos —porque una etiqueta de imagen no puede mandar un header de autorización—. Purga automática a nueve semanas, con exportación previa del PDF.',
        en: 'Photos go to the server disk, re-encoded to JPEG ≤1600 px plus a thumbnail, served through fifteen-minute signed URLs —because an image tag cannot send an authorization header. Automatic purge at nine weeks, after the PDF has been exported.',
      } as L,
      porque: {
        es: 'Guardarlas en la base engorda los backups de forma irreversible; guardarlas para siempre es un costo que crece sin techo. El PDF exportado es el archivo permanente; la foto en disco es temporal.',
        en: 'Storing them in the database bloats backups irreversibly; storing them forever is a cost with no ceiling. The exported PDF is the permanent archive; the photo on disk is temporary.',
      } as L,
    },
    {
      n: '4.6',
      t: {
        es: 'PDF sin navegador headless',
        en: 'PDF without a headless browser',
      } as L,
      d: {
        es: 'El sustento de valorización se exporta como un ZIP con un PDF por partida, generado con una librería en Python puro que embebe las fotos directo del disco.',
        en: 'The valuation backup exports as a ZIP with one PDF per work item, generated by a pure-Python library that embeds photos straight from disk.',
      } as L,
      porque: {
        es: 'La alternativa —Chromium headless— mete cientos de megas y una superficie de fallo enorme en el servidor para producir un archivo. El costo no justificaba la comodidad.',
        en: 'The alternative —headless Chromium— adds hundreds of megabytes and a huge failure surface on the server just to produce a file. The cost did not justify the convenience.',
      } as L,
    },
  ],
}

/* ── Problemas difíciles ──────────────────────────────────────────── */

export const PROBLEMAS = {
  eyebrow: { es: '08.2 — Los bugs que enseñan', en: '08.2 — The bugs that teach' } as L,
  titulo: {
    es: 'El error que no revienta, solo miente',
    en: 'The bug that does not crash — it lies',
  } as L,
  intro: {
    es: 'Estos tres son los que valen para una conversación técnica seria. Ninguno produjo una excepción: los tres producían números plausibles y equivocados.',
    en: 'These three are the ones worth a serious technical conversation. None of them raised an exception: all three produced plausible, wrong numbers.',
  } as L,
  items: [
    {
      t: {
        es: 'Tres presupuestos que se contradecían entre sí',
        en: 'Three budgets contradicting each other',
      } as L,
      hallazgo: {
        es: 'El sistema tenía tres bases de horas y cada indicador usaba una distinta: el % de avance contra una, el desvío contra otra, la incidencia contra una tercera. Mientras nadie reproyectara un metrado, los números coincidían y el error era invisible.',
        en: 'The system had three hour baselines and each indicator used a different one: % complete against one, deviation against another, weighting against a third. As long as nobody re-forecast a quantity, the numbers matched and the bug was invisible.',
      } as L,
      resolucion: {
        es: 'Se estudió cómo lo modela Primavera P6 —Original Budget, Current Budget, At Completion— y se definió un presupuesto al término único con precedencia explícita, donde una decisión aprobada por oficina le gana siempre a un recálculo automático.',
        en: 'I studied how Primavera P6 models it —Original Budget, Current Budget, At Completion— and defined a single budget at completion with explicit precedence, where an office-approved decision always beats an automatic recalculation.',
      } as L,
      prueba: {
        es: 'Existe una prueba dorada contra el informe semanal real. Con la nueva regla ese número se reproduce exacto, sin tocar el test. No fue una elección de gusto: fue la única que reproducía la realidad medida.',
        en: 'There is a golden test against the real weekly report. Under the new rule that number reproduces exactly, without touching the test. It was not a matter of taste: it was the only choice that reproduced measured reality.',
      } as L,
    },
    {
      t: {
        es: 'La curva que no podía decir «vas atrasado»',
        en: 'The curve that could not say “you are behind”',
      } as L,
      hallazgo: {
        es: 'La Curva S graficaba valor ganado y costo real: dos curvas reales, ninguna línea base. Sin la curva de lo planificado no existe la dimensión de cronograma. El sistema sabía decir «gasté bien o mal», pero era estructuralmente incapaz de decir «voy atrasado».',
        en: 'The S-curve plotted earned value and actual cost: two real curves, no baseline. Without the planned curve there is no schedule dimension. The system could say “I spent well or badly”, but was structurally unable to say “I am behind”.',
      } as L,
      resolucion: {
        es: 'El valor planificado se construyó desde el módulo de programación, que ya guardaba el metrado programado día a día. La clave fue usar exactamente la misma fórmula que el valor ganado, cambiando solo el numerador —programado en vez de real— para que ambas curvas fueran comparables.',
        en: 'Planned value was built from the scheduling module, which already stored programmed quantities day by day. The key was using exactly the same formula as earned value, changing only the numerator —planned instead of actual— so both curves stay comparable.',
      } as L,
      prueba: {
        es: 'Un test verifica que si lo programado se ejecuta exacto, valor planificado y valor ganado coinciden al céntimo. Sin esa garantía el índice de cronograma mentiría siempre y nadie lo notaría.',
        en: 'A test verifies that if the plan is executed exactly, planned value and earned value match to the cent. Without that guarantee the schedule index would lie forever and nobody would notice.',
      } as L,
    },
    {
      t: {
        es: 'Texto libre que partía el margen del mes en dos',
        en: 'Free text that split the month’s margin in two',
      } as L,
      hallazgo: {
        es: 'Un campo de «área» que el supervisor podía reescribir en el celular convivía con el «área» que agrupaba el informe ejecutivo. La auditoría siguió y encontró el mismo patrón en el campo de disciplina, que además cruzaba el costo con la meta por igualdad de texto: una variante de escritura partía el cruce en dos y descuadraba el margen del mes.',
        en: 'A free-text “area” field the supervisor could rewrite on the phone coexisted with the “area” that grouped the executive report. The audit went on and found the same pattern in the discipline field, which matched cost against target by string equality: one spelling variant split the join in two and threw off the month’s margin.',
      } as L,
      resolucion: {
        es: 'La solución no fue bloquear el campo ni borrarlo, sino separar dos conceptos que estaban mezclados: el Área —dimensión presupuestal, estable, la fija el proyecto— y el Frente —dimensión operativa, la elige el supervisor de un catálogo que se auto-alimenta y se normaliza para no duplicar variantes—.',
        en: 'The fix was not to lock or delete the field, but to separate two concepts that had been conflated: Area —a budget dimension, stable, set by the project— and Front —an operational dimension, chosen by the supervisor from a self-feeding catalogue that normalizes to avoid duplicate variants.',
      } as L,
      prueba: {
        es: 'Se comprobó primero que ambos campos no alimentaban el mismo cálculo —el miedo inicial era infundado—, pero sí podían divergir en el documento que ve el cliente.',
        en: 'It was first verified that both fields did not feed the same calculation —the initial fear was unfounded— but they could indeed diverge in the document the client sees.',
      } as L,
    },
  ],
  atrapados: {
    t: {
      es: 'Dos errores atrapados antes de producción',
      en: 'Two bugs caught before production',
    } as L,
    items: [
      {
        es: 'Una migración masiva de estilos convirtió atributos SVG de los gráficos a variables CSS. Las variables CSS no resuelven dentro de atributos SVG: habría roto todos los gráficos en ambos temas. Se detectó con una búsqueda dirigida antes del despliegue —no la atrapó el asistente, la atrapó la verificación—.',
        en: 'A bulk style migration converted the charts’ SVG attributes into CSS variables. CSS variables do not resolve inside SVG attributes: it would have broken every chart in both themes. It was caught by a targeted search before deployment —not by the assistant, by the verification.',
      } as L,
      {
        es: 'El importador descartaba en silencio las asignaciones con cero horas. Se convirtió en conteo explícito, registro y confirmación al usuario. Un dato que desaparece sin avisar es peor que un error visible.',
        en: 'The importer silently dropped assignments with zero hours. It became an explicit count, a log entry and a user confirmation. Data that vanishes without warning is worse than a visible error.',
      } as L,
    ],
  },
}

/* ── Lo que no está resuelto ──────────────────────────────────────── */

export const PENDIENTE = {
  eyebrow: { es: '08.3 — Honestidad', en: '08.3 — Honesty' } as L,
  titulo: {
    es: 'Lo que todavía no está resuelto',
    en: 'What is still unsolved',
  } as L,
  intro: {
    es: 'Esta sección probablemente vale más que la lista de logros. Un sistema sin límites declarados es un sistema que no se ha mirado a sí mismo.',
    en: 'This section is probably worth more than the list of achievements. A system with no declared limits is a system that has not looked at itself.',
  } as L,
  items: [
    {
      t: { es: 'Línea base congelada', en: 'Frozen baseline' } as L,
      d: {
        es: 'La Curva S mide contra el plan vigente, que se edita en vivo. Medir atraso contra un blanco móvil da un índice de cronograma cercano a 1,00 siempre. Está identificado, con el diseño esbozado —un snapshot versionado, como el Baseline de P6— y deliberadamente pospuesto hasta tener datos reales del piloto: decidir su diseño ahora sería especular.',
        en: 'The S-curve measures against the live plan, which is edited continuously. Measuring delay against a moving target yields a schedule index near 1.00 forever. It is identified, with the design sketched —a versioned snapshot, like P6’s Baseline— and deliberately postponed until real pilot data exists: designing it now would be speculation.',
      } as L,
    },
    {
      t: { es: 'Un indicador sospechoso', en: 'A suspicious indicator' } as L,
      d: {
        es: 'En los datos de validación la productividad da 2,00, el doble del estándar presupuestado. Lo más probable es que el tareo aún no capture todas las horas. Está anotado como bloqueante a verificar antes del piloto, porque un indicador inflado no sería defendible.',
        en: 'In validation data, productivity reads 2.00 — twice the budgeted standard. Most likely the timesheet is not yet capturing all hours. It is flagged as a blocker to verify before the pilot, because an inflated indicator would not be defensible.',
      } as L,
    },
    {
      t: { es: 'Sin usuarios activos todavía', en: 'No active users yet' } as L,
      d: {
        es: 'El sistema está en validación. Todo lo medido es contra datos de prueba y carga histórica. No hay tracción que simular.',
        en: 'The system is under validation. Everything measured is against test data and historical load. There is no traction to fake.',
      } as L,
    },
    {
      t: { es: 'Multi-proyecto', en: 'Multi-project' } as L,
      d: {
        es: 'La arquitectura lo contempla pero no está construido. Espera al segundo proyecto real para no diseñar en abstracto.',
        en: 'The architecture contemplates it but it is not built. It waits for the second real project so as not to design in the abstract.',
      } as L,
    },
    {
      t: {
        es: 'Importación desde Primavera P6 / MS Project',
        en: 'Import from Primavera P6 / MS Project',
      } as L,
      d: {
        es: 'Identificada como objetivo. El modelo ya es compatible en lo estructural —WBS jerárquico, actividades, hitos ponderados, dependencias fin-inicio con lag—; falta el concepto de línea base, que es justamente el punto anterior.',
        en: 'Identified as a goal. The model is already structurally compatible —hierarchical WBS, activities, weighted milestones, finish-to-start dependencies with lag; what is missing is the baseline concept, which is precisely the point above.',
      } as L,
    },
  ],
}

/* ── Método de trabajo con IA ─────────────────────────────────────── */

export const METODO = {
  eyebrow: { es: '08.4 — Método', en: '08.4 — Method' } as L,
  titulo: { es: 'Dónde estuvo el humano', en: 'Where the human was' } as L,
  intro: {
    es: 'Este sistema se construyó con asistencia de inteligencia artificial. Lo honesto es decir exactamente qué parte no la hizo la máquina.',
    en: 'This system was built with AI assistance. The honest thing is to state exactly which part the machine did not do.',
  } as L,
  items: [
    {
      t: { es: 'Definir el modelo de dominio', en: 'Define the domain model' } as L,
      d: {
        es: 'Qué es una partida, un hito, una fase, un presupuesto al término. Ningún modelo lo sabe por ti.',
        en: 'What a work item, a milestone, a phase, a budget at completion actually are. No model knows that for you.',
      } as L,
    },
    {
      t: { es: 'Decidir los trade-offs', en: 'Decide the trade-offs' } as L,
      d: {
        es: 'Disco contra base de datos. Reemplazo contra suma. Auto-alta contra rechazo en el catálogo. Plan rodante contra línea base congelada.',
        en: 'Disk vs database. Replace vs add. Auto-create vs reject in the catalogue. Rolling plan vs frozen baseline.',
      } as L,
    },
    {
      t: {
        es: 'Detectar cuándo el asistente se equivocó',
        en: 'Detect when the assistant was wrong',
      } as L,
      d: {
        es: 'La migración de estilos que habría roto todos los gráficos la atrapó una verificación dirigida, no el asistente.',
        en: 'The style migration that would have broken every chart was caught by a targeted verification, not by the assistant.',
      } as L,
    },
    {
      t: { es: 'Decidir qué NO construir', en: 'Decide what NOT to build' } as L,
      d: {
        es: 'Y escribir por qué, para que la decisión sobreviva al olvido.',
        en: 'And write down why, so the decision survives being forgotten.',
      } as L,
    },
    {
      t: { es: 'Traer el conocimiento del terreno', en: 'Bring the ground knowledge' } as L,
      d: {
        es: 'Cómo se comporta un supervisor a las seis de la tarde con el celular en la mano y los guantes puestos.',
        en: 'How a supervisor behaves at six in the evening, phone in hand, gloves on.',
      } as L,
    },
  ],
  cierre: {
    es: 'La máquina acelera la escritura. No sustituye saber qué hay que escribir, ni por qué.',
    en: 'The machine speeds up the writing. It does not replace knowing what to write, or why.',
  } as L,
}

/* ── Trayectoria ──────────────────────────────────────────────────── */

export const TRAYECTORIA = {
  eyebrow: { es: '09 — Trayectoria', en: '09 — Background' } as L,
  titulo: { es: 'Obra, modelo y código', en: 'Field, model and code' } as L,
  experiencia: [
    {
      periodo: { es: 'Set 2025 — Feb 2026', en: 'Sep 2025 — Feb 2026' } as L,
      rol: {
        es: 'Asistente de Residencia y Producción',
        en: 'Site Management and Production Assistant',
      } as L,
      org: {
        es: 'Obras civiles y movimiento de tierras · unidad minera',
        en: 'Civil works and earthworks · mining unit',
      } as L,
      puntos: [
        {
          es: 'Automaticé el flujo de reportabilidad diaria mediante scripts, reduciendo el tiempo de entrega en un 60% y garantizando la precisión técnica para la aprobación inmediata de la supervisión.',
          en: 'Automated the daily reporting flow with scripts, cutting delivery time by 60% and guaranteeing the technical accuracy needed for immediate approval by supervision.',
        } as L,
        {
          es: 'Lideré la sustentación técnica de trabajos extraordinarios, logrando la valorización y cobro de más de USD 30 000 en adicionales en un solo mes, mediante un control riguroso de horas-hombre y horas-máquina.',
          en: 'Led the technical justification of extra works, achieving valuation and collection of over USD 30,000 in additionals in a single month, through rigorous man-hour and machine-hour control.',
        } as L,
      ],
    },
    {
      periodo: { es: 'Nov 2024 — actualidad', en: 'Nov 2024 — present' } as L,
      rol: {
        es: 'Desarrollador de soluciones de automatización y agentes de IA',
        en: 'Automation and AI agent solutions developer',
      } as L,
      org: {
        es: 'Consultoría propia en automatización e infraestructura',
        en: 'Own consultancy in automation and infrastructure',
      } as L,
      puntos: [
        {
          es: 'Arquitectura y despliegue de un sistema agéntico RAG integrado con n8n y Supabase para gestión de bases de datos no estructuradas en atención al cliente.',
          en: 'Architecture and deployment of a RAG agentic system integrated with n8n and Supabase for unstructured database management in customer service.',
        } as L,
        {
          es: 'Lógica de persistencia y gestión de estados con Redis para flujos de alta demanda, garantizando integridad de datos en procesos multimodales.',
          en: 'Persistence logic and state management with Redis for high-demand flows, guaranteeing data integrity in multimodal processes.',
        } as L,
        {
          es: 'Taller técnico de 4 horas a profesionales sobre entornos de producción para automatización: máquinas virtuales en la nube, Docker y herramientas open source.',
          en: 'Four-hour technical workshop for professionals on production environments for automation: cloud virtual machines, Docker and open-source tooling.',
        } as L,
      ],
    },
    {
      periodo: { es: 'Ago 2024 — Dic 2024', en: 'Aug 2024 — Dec 2024' } as L,
      rol: { es: 'Diseñador BIM — losa deportiva', en: 'BIM designer — sports slab' } as L,
      org: { es: 'Proyecto integral', en: 'Turnkey project' } as L,
      puntos: [
        {
          es: 'Modelo BIM federado completo integrando arquitectura, estructuras e instalaciones para asegurar coherencia y viabilidad del proyecto.',
          en: 'Full federated BIM model integrating architecture, structures and MEP to ensure project coherence and feasibility.',
        } as L,
      ],
    },
    {
      periodo: { es: 'Feb 2024 — Jul 2024', en: 'Feb 2024 — Jul 2024' } as L,
      rol: {
        es: 'Modelador Revit — arquitectura y estructuras',
        en: 'Revit modeller — architecture and structures',
      } as L,
      org: { es: 'ABGHA', en: 'ABGHA' } as L,
      puntos: [
        {
          es: 'Modelado BIM integral de un proyecto hotelero de seis niveles, convirtiendo planos 2D en un modelo 3D construible.',
          en: 'Full BIM modelling of a six-storey hotel project, turning 2D drawings into a buildable 3D model.',
        } as L,
        {
          es: 'Detección y solución de más de 25 conflictos entre disciplinas en fase de diseño, previniendo sobrecostos en obra.',
          en: 'Detection and resolution of over 25 cross-discipline clashes in design phase, preventing cost overruns on site.',
        } as L,
      ],
    },
  ],
  educacion: {
    t: { es: 'Formación', en: 'Education' } as L,
    items: [
      {
        t: { es: 'Bachiller en Ingeniería Civil', en: 'BSc in Civil Engineering' } as L,
        d: {
          es: 'Universidad Católica San Pablo · enero 2026',
          en: 'Universidad Católica San Pablo · January 2026',
        } as L,
      },
      {
        t: { es: 'Excelencia académica', en: 'Academic excellence' } as L,
        d: {
          es: 'Tercio superior · becado por rendimiento (PRONABEC)',
          en: 'Top third of class · merit scholarship (PRONABEC)',
        } as L,
      },
      {
        t: {
          es: '1er puesto — Concurso de rotura de probetas a resistencia controlada',
          en: '1st place — Controlled-strength concrete cylinder contest',
        } as L,
        d: {
          es: 'ACI UCSP · categoría Expertos · 2023',
          en: 'ACI UCSP · Experts category · 2023',
        } as L,
      },
      {
        t: { es: 'Líder estructural — voluntariado', en: 'Structural lead — volunteer work' } as L,
        d: {
          es: 'Diseño estructural, arquitectónico, sanitario y eléctrico de un pabellón educativo.',
          en: 'Structural, architectural, plumbing and electrical design of a school building.',
        } as L,
      },
    ],
  },
  certificaciones: {
    t: { es: 'Certificaciones seleccionadas', en: 'Selected certifications' } as L,
    // Selección deliberada: las de obra y dirección de proyectos, que son las
    // que pesan ante un asesor de ingeniería civil. Las de IA y automatización
    // viven en el LinkedIn; aquí restaban foco.
    items: [
      { t: 'Metrados y lectura de planos — SENCICO / TEDI', d: '2022–2023' },
      {
        t: 'Diseño y cálculo de instalaciones eléctricas y sanitarias — CIP Piura / CECAPED',
        d: '2022',
      },
      { t: 'Congreso Internacional de Dirección de Proyectos — PMI Sur Perú', d: '2022 · 2024' },
      { t: 'XXX Congreso Nacional de Estudiantes de Ingeniería Civil — UNI', d: '2023' },
    ],
  },
}

/* ── Stack ────────────────────────────────────────────────────────── */

export const STACK = {
  eyebrow: { es: '10 — Herramientas', en: '10 — Tooling' } as L,
  titulo: { es: 'Lo que uso y para qué', en: 'What I use and what for' } as L,
  intro: {
    es: 'Ordenado por dominio. Cada fila responde a un problema que tuve delante, no a una lista de tendencias.',
    en: 'Ordered by domain. Every row answers a problem I actually had in front of me, not a trend list.',
  } as L,
  grupos: [
    {
      t: { es: 'Backend y datos', en: 'Backend and data' } as L,
      items: [
        'Python',
        'FastAPI',
        'PostgreSQL',
        'SQLAlchemy',
        'Alembic',
        'SQL',
        'pandas',
        'openpyxl',
        'pdfplumber',
      ],
      d: {
        es: 'El motor de cálculo del sistema de control de obra y la automatización de reportes diarios en construcción.',
        en: 'The calculation engine of the construction control system and the automation of daily site reports.',
      } as L,
    },
    {
      t: { es: 'Frontend', en: 'Frontend' } as L,
      items: ['React 19', 'TypeScript', 'Vite', 'PWA / Service Worker', 'IndexedDB', 'Three.js'],
      d: {
        es: 'Panel de oficina y app de campo offline-first. Esta misma página está hecha con ese stack.',
        en: 'Office panel and offline-first field app. This very page is built with that stack.',
      } as L,
    },
    {
      t: { es: 'IA agéntica y orquestación', en: 'Agentic AI and orchestration' } as L,
      items: [
        'n8n',
        'LangChain',
        'Model Context Protocol',
        'Claude',
        'OpenAI',
        'Gemini',
        'LlamaParse',
        'Redis',
        'Supabase',
        'Milvus',
      ],
      d: {
        es: 'Flujos multi-agente con memoria conversacional, colas de mensajes, defensa contra inyección de prompts y extracción documental a datos relacionales.',
        en: 'Multi-agent flows with conversational memory, message queues, prompt-injection defence and document extraction into relational data.',
      } as L,
    },
    {
      t: { es: 'Infraestructura', en: 'Infrastructure' } as L,
      items: ['Docker', 'Coolify', 'Google Cloud', 'Cloudflare Pages', 'GitHub Actions', 'Nginx'],
      d: {
        es: 'Despliegue propio de todo lo que construyo: aprendí DevOps porque hacía falta para poner algo en producción.',
        en: 'I deploy everything I build myself: I learned DevOps because it was necessary to put anything into production.',
      } as L,
    },
    {
      t: { es: 'BIM / VDC / CAD', en: 'BIM / VDC / CAD' } as L,
      items: ['Revit', 'Navisworks', 'Civil 3D', 'AutoCAD', 'C# (.NET)', 'ETABS'],
      d: {
        es: 'Modelado federado, detección de interferencias y automatización topográfica: importación de puntos, depuración de triangulaciones y extracción de sólidos 3D.',
        en: 'Federated modelling, clash detection and survey automation: point import, TIN cleanup and 3D solid extraction.',
      } as L,
    },
    {
      t: { es: 'Gestión y analítica', en: 'Management and analytics' } as L,
      items: [
        'Power BI',
        'DAX',
        'MS Project',
        'Primavera P6 (modelo)',
        'Last Planner System',
        'EVM',
        'VBA',
      ],
      d: {
        es: 'Modelos en estrella sobre avance, tareo y compras; medidas de valor ganado, CPI/SPI y proyección al término.',
        en: 'Star schemas over progress, timesheets and purchasing; earned value measures, CPI/SPI and estimate at completion.',
      } as L,
    },
  ],
}

/* ── Propósito / cierre ───────────────────────────────────────────── */

export const PROPOSITO = {
  eyebrow: { es: '11 — Propósito', en: '11 — Purpose' } as L,
  titulo: {
    es: 'Lo que BIM hizo con la geometría, sin hacer para el costo',
    en: 'What BIM did for geometry, still undone for cost',
  } as L,
  cuerpo: {
    es: 'BIM resolvió un problema concreto: un modelo único del que todos consumen, en vez de planos sueltos que se desincronizan sin que nadie note. Para el control de producción y de costo eso está sin hacer. Cinco archivos que no se hablan son exactamente el problema que BIM ya resolvió del otro lado.\n\nMi propósito es marcar un estándar donde el trabajo repetitivo quede en el pasado y toda la información del control de obra viva en un solo lugar. No como aspiración: como sistema construido, medido y corregido.',
    en: 'BIM solved a concrete problem: a single model everyone consumes, instead of loose drawings that drift apart without anyone noticing. For production and cost control that remains undone. Five files that never talk to each other are exactly the problem BIM already solved on the other side.\n\nMy purpose is to set a standard where repetitive work belongs to the past and all construction-control information lives in one place. Not as an aspiration: as a system built, measured and corrected.',
  } as L,
  contacto: { es: 'Hablemos', en: 'Let’s talk' } as L,
  nota: {
    es: 'Este sitio está construido con React 19, TypeScript y Three.js. El grafo que gira más arriba es el código real del sistema, indexado y proyectado. El código de esta página también es público.',
    en: 'This site is built with React 19, TypeScript and Three.js. The graph spinning above is the system’s real code, indexed and projected. The code of this page is public too.',
  } as L,
}

export const NAV = {
  items: [
    { id: 'inicio', t: { es: 'Inicio', en: 'Home' } as L },
    { id: 'problema', t: { es: 'Problema', en: 'Problem' } as L },
    { id: 'resuelve', t: { es: 'Qué resuelve', en: 'What it solves' } as L },
    { id: 'sistema', t: { es: 'Sistema', en: 'System' } as L },
    { id: 'producto', t: { es: 'El producto', en: 'The product' } as L },
    { id: 'cifras', t: { es: 'Cifras', en: 'Numbers' } as L },
    { id: 'tesis', t: { es: 'Tesis', en: 'Thesis' } as L },
    { id: 'trayectoria', t: { es: 'Trayectoria', en: 'Background' } as L },
    { id: 'contacto', t: { es: 'Contacto', en: 'Contact' } as L },
  ],
  menu: { es: 'Secciones', en: 'Sections' } as L,
  cerrar: { es: 'Cerrar', en: 'Close' } as L,
}
