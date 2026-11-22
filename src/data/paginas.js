// Contenido de las páginas de justificación: [título, texto] y referencias [texto, enlace]
export const paginas = [
  {
    id: "accesibilidad",
    corto: "Accesibilidad",
    titulo: "Accesibilidad: contraste, voz y lectores de pantalla",
    resumen:
      "Un asistente solo ayuda si lo puede usar cualquier persona: con baja visión, ciega o mayor.",
    puntos: [
      [
        "Contraste medible",
        "Las pautas WCAG piden una relación de contraste de 4,5:1 para texto normal (nivel AA) y de 7:1 en el nivel mejorado (AAA). Blas incluye un modo de alto contraste y letra grande. Antes de afirmar que cumple, hay que medir los colores finales con un verificador.",
      ],
      [
        "Marco legal",
        "La Ley 26.653 y el Decreto 656/2019 regulan la accesibilidad de la información en páginas web, y la Ley 26.378 reconoce el acceso a la información como derecho humano. Falta confirmar con el área legal de la UNM si los alcanza.",
      ],
      [
        "Los datos se quedan en la institución",
        "Audio, consultas e historial se procesan en una notebook, sin servicios externos. La Ley 25.326 igual exige consentimiento informado, finalidad clara y medidas de seguridad.",
      ],
      [
        "Voz para personas ciegas",
        "Las personas ciegas usan los asistentes de voz como herramientas serias, pero los errores de reconocimiento las afectan más porque no pueden comprobar el resultado a simple vista. Por eso Blas muestra lo que entendió y ofrece también texto.",
      ],
      [
        "Conversar con el lector de pantalla",
        "En un estudio con personas ciegas o con baja visión, la mayoría creyó que la interacción conversacional enriquecería su experiencia con el lector de pantalla.",
      ],
      [
        "Personas mayores",
        "Los agentes conversacionales prometen un acceso de baja barrera para quienes tienen pocas competencias digitales. Blas usa frases cortas, botones grandes y un menú de opciones.",
      ],
      [
        "Pendiente: velocidad de voz",
        "Usuarios ciegos con experiencia suelen preferir un habla más rápida, y Blas habla algo más lento pensando en personas mayores. Falta agregar un control de velocidad.",
      ],
    ],
    refs: [
      [
        "W3C: contraste mínimo (1.4.3)",
        "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html",
      ],
      [
        "W3C: contraste mejorado (1.4.6)",
        "https://w3c.github.io/wcag/understanding/contrast-enhanced",
      ],

      [
        "Ley 25.326, protección de los datos personales",
        "https://www.argentina.gob.ar/normativa/nacional/64790/texto",
      ],
      [
        "Ley 26.653, accesibilidad de la información en páginas web",
        "https://www.argentina.gob.ar/normativa/nacional/175694/texto",
      ],
      [
        "Decreto 656/2019",
        "https://www.argentina.gob.ar/normativa/nacional/decreto-656-2019-328722/texto",
      ],
      [
        "Abdolrahmani et al. (2018), asistentes de voz y personas ciegas",
        "https://doi.org/10.1145/3234695.3236344",
      ],
      [
        "Phutane et al. (2023), Speaking with My Screen Reader",
        "https://doi.org/10.1145/3597638.3608404",
      ],
      [
        "Even et al. (2022), agentes conversacionales y adultos mayores",
        "https://doi.org/10.1007/s00391-022-02085-9",
      ],
    ],
  },
  {
    id: "transparencia",
    corto: "Transparencia",
    titulo: "Transparencia del proceso y confianza",
    resumen:
      "Mostrar qué está haciendo el sistema mientras responde puede aumentar la confianza, si es real y verificable.",
    puntos: [
      [
        "Mostrar el trabajo del sistema",
        "Buell y Norton (2011) hallaron que mostrar el esfuerzo que hace un sitio aumenta el valor percibido, incluso con esperas más largas. Midieron valor percibido, no desconfianza ante las respuestas instantáneas.",
      ],
      [
        "Etapas reales, sin trucos",
        "Blas informa lo que ocurre de verdad: escuchar, buscar en la base oficial, redactar y generar el audio. No agrega demoras artificiales.",
      ],
      [
        "Las demoras en chatbots tienen efectos mixtos",
        "En servicio al cliente, demoras dinámicas aumentaron la sensación de humanidad y la satisfacción (Gnewuch et al., 2018), pero otro estudio halló efectos opuestos según la experiencia previa (Gnewuch et al., 2022). Por eso es una hipótesis a validar en un piloto.",
      ],
      [
        "Flujo del sistema, no razonamiento interno",
        "El razonamiento paso a paso es una técnica de modelos de lenguaje grandes (Wei et al., 2022). El Chain of Thought de esta página solo representa los pasos operativos de Blas, no el razonamiento interno del modelo, y un modelo de 3.000 millones de parámetros no garantiza ese beneficio.",
      ],
      [
        "Confianza apropiada",
        "Las explicaciones pueden aumentar la aceptación de la IA aunque sea incorrecta (Bansal et al., 2021), y los razonamientos de un modelo pueden ser plausibles pero engañosos (Turpin et al., 2023). Por eso Blas responde solo con datos oficiales y avisa cuando no sabe. Mostrar la fuente de cada dato queda como mejora.",
      ],
      [
        "Evidencia en el ingreso universitario",
        "Un asistente conversacional en Georgia State University aumentó 3,3 puntos porcentuales la probabilidad de inscribirse a tiempo (Page y Gehlbach, 2017). Era por mensajes de texto y en Estados Unidos, sin voz.",
      ],
    ],
    refs: [
      [
        "Buell y Norton (2011), The Labor Illusion",
        "https://doi.org/10.1287/mnsc.1110.1376",
      ],
      [
        "Gnewuch et al. (2018), Faster Is Not Always Better",
        "https://aisel.aisnet.org/ecis2018_rp/113/",
      ],
      [
        "Gnewuch et al. (2022), Opposing Effects of Response Time",
        "https://aisel.aisnet.org/bise/vol64/iss6/5",
      ],
      [
        "Wei et al. (2022), Chain-of-Thought Prompting",
        "https://arxiv.org/abs/2201.11903",
      ],
      [
        "Turpin et al. (2023), Language Models Don't Always Say What They Think",
        "https://arxiv.org/abs/2305.04388",
      ],
      [
        "Bansal et al. (2021), Does the Whole Exceed its Parts?",
        "https://doi.org/10.1145/3411764.3445717",
      ],
      [
        "Page y Gehlbach (2017), asistente virtual y camino a la universidad",
        "https://doi.org/10.1177/2332858417749220",
      ],
    ],
  },
  {
    id: "ia-local",
    corto: "IA local y RAG",
    titulo: "IA local y base de conocimiento (RAG)",
    resumen:
      "Modelos que corren en una notebook y datos oficiales que se entregan en cada consulta para no inventar respuestas.",
    puntos: [
      [
        "Modelos livianos que corren localmente",
        "Llama 3.2 3B (Meta, 2024) redacta la respuesta: cuantizado ocupa unos 2 GB y entra en una GPU de 4 GB. Whisper small transcribe en CPU. bge-m3 busca por significado en más de 100 idiomas. Piper genera la voz y también se usa en un lector de pantalla gratuito.",
      ],
      [
        "RAG antes que entrenar el modelo",
        "Recuperar datos externos produce respuestas más factuales y actualizables (Lewis et al., 2020), y supera al ajuste fino para incorporar conocimiento nuevo (Ovadia et al., 2024). Los datos de la UNM cambian cada año: se edita un archivo y se recalculan solo las entradas modificadas.",
      ],
      [
        "La calidad empieza en los datos",
        "117 entradas con una idea cada una, docentes cargados por comisión, palabras clave y fuente con fecha. La búsqueda combina similitud semántica y coincidencia de palabras, y entrega a lo sumo tres fragmentos, porque los contextos largos empeoran el uso de la información (Liu et al., 2024).",
      ],
      [
        "Respuestas acotadas",
        "El modelo responde solo con los datos entregados, con temperatura baja, en dos a cuatro frases para ser escuchadas, y deriva al Departamento de Alumnos cuando falta información.",
      ],
      [
        "Mejora continua y límites",
        "Un script exporta las preguntas sin respuesta y las palabras más consultadas para decidir qué cargar. Límites: un modelo de 3B es más débil que uno de 8B (58 contra 66,7 en MMLU); no se evaluó el español rioplatense; Whisper varía según acento y ruido; falta una evaluación formal (aciertos de búsqueda, error de voz y escala SUS).",
      ],
    ],
    refs: [
      ["Meta (2024), Llama 3.2", "https://huggingface.co/blog/llama32"],
      ["Radford et al. (2022), Whisper", "https://arxiv.org/abs/2212.04356"],
      [
        "Chen et al. (2024), BGE M3-Embedding",
        "https://arxiv.org/abs/2402.03216",
      ],
      ["Piper, texto a voz local", "https://github.com/rhasspy/piper"],
      [
        "Lewis et al. (2020), Retrieval-Augmented Generation",
        "https://arxiv.org/abs/2005.11401",
      ],
      [
        "Ovadia et al. (2024), Fine-Tuning or Retrieval?",
        "https://doi.org/10.18653/v1/2024.emnlp-main.15",
      ],
      [
        "Liu et al. (2024), Lost in the Middle",
        "https://doi.org/10.1162/tacl_a_00638",
      ],
      [
        "Es et al. (2024), RAGAs: evaluación de RAG",
        "https://arxiv.org/abs/2309.15217",
      ],
    ],
  },
];
