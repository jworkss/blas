import { useEffect, useState } from "react";

// Nodos del diagrama: [x, y, texto, grupo]
const N = {
  usuario: [20, 50, "Usuario del chat", "ui"],
  interfaz: [250, 50, "Interfaz de chat", "ui"],
  audio: [480, 50, "Audio generado", "ui"],
  servidor: [20, 174, "Servidor HTTPS", "rt"],
  voz: [250, 174, "Chat de voz", "rt"],
  texto: [480, 174, "Chat de texto", "rt"],
  cola: [710, 174, "Cola de solicitudes", "rt"],
  cuentas: [20, 248, "Cuentas y acceso", "rt"],
  herr: [250, 248, "Herramientas de voz", "rt"],
  proc: [710, 248, "Procesamiento de consultas", "rt"],
  bd: [480, 372, "Base de datos del chat", "kb"],
  cont: [710, 372, "Contenido de conocimiento", "kb"],
  kb: [480, 446, "Búsqueda (kb.js)", "kb"],
  emb: [710, 446, "Embeddings (bge-m3)", "kb"],
  certs: [20, 372, "Certificados TLS", "adm"],
  csv: [250, 372, "Exportación CSV", "adm"],
};
const W = 190;
const H = 54;
const W_COMPACTO = 180;
const H_COMPACTO = 60;

const N_COMPACTOS = {
  usuario: [10, 50, N.usuario[2], "ui"],
  interfaz: [210, 50, N.interfaz[2], "ui"],
  audio: [10, 122, N.audio[2], "ui"],
  servidor: [10, 250, N.servidor[2], "rt"],
  cuentas: [210, 250, N.cuentas[2], "rt"],
  voz: [10, 322, N.voz[2], "rt"],
  texto: [210, 322, N.texto[2], "rt"],
  herr: [10, 394, N.herr[2], "rt"],
  cola: [210, 394, N.cola[2], "rt"],
  proc: [210, 466, N.proc[2], "rt"],
  bd: [10, 594, N.bd[2], "kb"],
  cont: [210, 594, N.cont[2], "kb"],
  kb: [10, 666, N.kb[2], "kb"],
  emb: [210, 666, N.emb[2], "kb"],
  certs: [10, 794, N.certs[2], "adm"],
  csv: [210, 794, N.csv[2], "adm"],
};

const ZONAS = {
  escritorio: [
    { id: "ui", titulo: "Experiencia de usuario", x: 10, y: 10, ancho: 680, alto: 108 },
    { id: "rt", titulo: "Tiempo de ejecución del asistente", x: 10, y: 134, ancho: 900, alto: 182 },
    { id: "adm", titulo: "Administración", x: 10, y: 332, ancho: 440, alto: 108 },
    { id: "kb", titulo: "Conocimientos y datos", x: 470, y: 332, ancho: 440, alto: 182 },
  ],
  compacto: [
    { id: "ui", titulo: "Experiencia de usuario", x: 0, y: 10, ancho: 400, alto: 186 },
    { id: "rt", titulo: "Tiempo de ejecución del asistente", x: 0, y: 210, ancho: 400, alto: 330 },
    { id: "kb", titulo: "Conocimientos y datos", x: 0, y: 554, ancho: 400, alto: 186 },
    { id: "adm", titulo: "Administración", x: 0, y: 754, ancho: 400, alto: 114 },
  ],
};

const ETIQUETAS_COMPACTAS = {
  usuario: ["Usuario del", "chat"],
  interfaz: ["Interfaz de", "chat"],
  audio: ["Audio generado"],
  servidor: ["Servidor HTTPS"],
  cuentas: ["Cuentas y", "acceso"],
  voz: ["Chat de voz"],
  texto: ["Chat de texto"],
  herr: ["Herramientas", "de voz"],
  cola: ["Cola de", "solicitudes"],
  proc: ["Procesamiento de", "consultas"],
  bd: ["Base de datos", "del chat"],
  cont: ["Contenido de", "conocimiento"],
  kb: ["Búsqueda", "(kb.js)"],
  emb: ["Embeddings", "(bge-m3)"],
  certs: ["Certificados TLS"],
  csv: ["Exportación CSV"],
};

const DESVIOS_COMPACTOS = {
  "herr>audio": (origen, destino) => [[200, origen[1]], [200, destino[1]]],
  "proc>kb": (origen, destino) => [[200, origen[1]], [200, destino[1]]],
  "kb>proc": (origen, destino) => [[200, origen[1]], [200, destino[1]]],
  "bd>csv": (origen, destino) => [[200, origen[1]], [200, destino[1]]],
};

function centro(id, nodos, ancho, alto) {
  return [nodos[id][0] + ancho / 2, nodos[id][1] + alto / 2];
}

function crearTrazo(ruta, nodos, ancho, alto, compacto) {
  const puntos = [];
  ruta.forEach((id, indice) => {
    const actual = centro(id, nodos, ancho, alto);
    if (indice > 0) {
      const anterior = ruta[indice - 1];
      const desvio = compacto && DESVIOS_COMPACTOS[`${anterior}>${id}`];
      if (desvio) {
        puntos.push(...desvio(centro(anterior, nodos, ancho, alto), actual));
      }
    }
    puntos.push(actual);
  });
  return "M" + puntos.map((punto) => punto.join(",")).join(" L");
}

const PASOS = [
  { t: "1. La persona habla o escribe", d: "Desde la interfaz de chat, por voz o por texto. La página se sirve por HTTPS para poder usar el micrófono.", ruta: ["usuario", "interfaz"], on: ["usuario", "interfaz"] },
  { t: "2. El servidor verifica la cuenta", d: "El servidor HTTPS enruta el pedido y el módulo de cuentas comprueba usuario y contraseña. Cada persona accede solo a su propio historial.", ruta: ["interfaz", "servidor", "cuentas"], on: ["interfaz", "servidor", "cuentas"] },
  { t: "3. Si es voz, se transcribe", d: "El chat de voz envía el audio a las herramientas de voz, donde Whisper lo convierte en texto en español. Si la consulta fue escrita, este paso se omite.", ruta: ["voz", "herr"], on: ["voz", "texto", "herr"] },
  { t: "4. La consulta espera su turno", d: "Voz y texto entran en una cola: se atiende una consulta a la vez, porque la notebook tiene una sola GPU. Luego se ejecuta en el procesamiento de consultas.", ruta: ["voz", "cola", "proc"], on: ["voz", "texto", "cola", "proc"] },
  { t: "5. Se busca en la base oficial", d: "kb.js pide a bge-m3 los vectores de la pregunta y los compara con el contenido de conocimiento, hecho con datos públicos de la UNM. Se eligen hasta tres fragmentos.", ruta: ["proc", "kb", "emb", "kb", "cont"], on: ["proc", "kb", "emb", "cont"] },
  { t: "6. Llama 3.2 redacta la respuesta", d: "Los fragmentos vuelven al procesamiento de consultas, que le pide al modelo una respuesta breve, clara y solo con esos datos.", ruta: ["cont", "kb", "proc"], on: ["kb", "proc"] },
  { t: "7. Piper genera el audio", d: "El texto pasa a las herramientas de voz, que sintetizan el audio y lo guardan como audio generado.", ruta: ["proc", "herr", "audio"], on: ["proc", "herr", "audio"] },
  { t: "8. Se guarda la conversación", d: "La pregunta y la respuesta se almacenan en la base de datos del chat, separadas por persona.", ruta: ["proc", "bd"], on: ["proc", "bd", "cuentas"] },
  { t: "9. La persona recibe la respuesta", d: "El servidor entrega el texto y sirve el audio guardado a la interfaz de chat, que lo reproduce.", ruta: ["servidor", "interfaz", "usuario"], on: ["servidor", "audio", "interfaz", "usuario"] },
  { t: "10. Administración y mejora", d: "Los certificados TLS cifran la conexión. La exportación CSV de monitoreo muestra qué preguntas quedaron sin respuesta para mejorar la base de conocimiento.", ruta: ["bd", "csv"], on: ["certs", "servidor", "bd", "csv"] },
];

export default function Proceso() {
  const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [compacto, setCompacto] = useState(() => window.matchMedia("(max-width: 900px)").matches);
  const [paso, setPaso] = useState(0);
  const [auto, setAuto] = useState(!reducir);

  useEffect(() => {
    const consulta = window.matchMedia("(max-width: 900px)");
    const actualizar = () => setCompacto(consulta.matches);
    consulta.addEventListener("change", actualizar);
    return () => consulta.removeEventListener("change", actualizar);
  }, []);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setPaso((p) => (p + 1) % PASOS.length), 12000);
    return () => clearInterval(id);
  }, [auto]);

  const { t, d, ruta, on } = PASOS[paso];
  const mover = (delta) => {
    setAuto(false);
    setPaso((actual) => Math.max(0, Math.min(PASOS.length - 1, actual + delta)));
  };
  const seleccionarPaso = (indice) => {
    setAuto(false);
    setPaso(indice);
  };

  const nodos = compacto ? N_COMPACTOS : N;
  const anchoNodo = compacto ? W_COMPACTO : W;
  const altoNodo = compacto ? H_COMPACTO : H;
  const viewBox = compacto ? "0 0 400 878" : "0 0 920 524";
  const trazo = crearTrazo(ruta, nodos, anchoNodo, altoNodo, compacto);
  return (
    <div className="proceso">
      <svg className={compacto ? "diagrama-svg compacto" : "diagrama-svg"} viewBox={viewBox} role="img" aria-label="Diagrama del recorrido de una consulta en Blas, de la persona al servidor, la búsqueda, el modelo y el audio">
        {ZONAS[compacto ? "compacto" : "escritorio"].map((zona) => (
          <g className={`zona zona-${zona.id}`} key={zona.id}>
            <rect x={zona.x} y={zona.y} width={zona.ancho} height={zona.alto} rx="12" />
            <text className="zona-titulo" x={zona.x + 14} y={zona.y + 23}>{zona.titulo}</text>
          </g>
        ))}
        <g key={paso}>
          <path d={trazo} className="flujo" />
          {!reducir && (
            <circle r="8" className="paquete">
              <animateMotion dur="8s" repeatCount="indefinite" path={trazo} />
            </circle>
          )}
        </g>
        {Object.entries(nodos).map(([id, [x, y, txt, grupo]]) => {
          const lineas = compacto ? ETIQUETAS_COMPACTAS[id] || [txt] : [txt];
          return (
            <g key={id} className={`nodo ${grupo} ${on.includes(id) ? "on" : ""}`}>
              <rect x={x} y={y} width={anchoNodo} height={altoNodo} rx="10" />
              <text x={x + anchoNodo / 2} y={y + altoNodo / 2 - (lineas.length > 1 ? 7 : 0)} textAnchor="middle">
                {lineas.map((linea, indice) => (
                  <tspan key={linea} x={x + anchoNodo / 2} dy={indice === 0 ? 0 : 15}>{linea}</tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="paso-info" aria-live={auto ? "off" : "polite"}>
        <p className="indicador-paso">Paso {paso + 1} de {PASOS.length}</p>
        <h3>{t}</h3>
        <p>{d}</p>
      </div>

      <div className="controles" role="group" aria-label="Controles de la animación">
        <div className="controles-reproduccion">
          <button onClick={() => mover(-1)} disabled={paso === 0}>Anterior</button>
          <button onClick={() => setAuto(!auto)} aria-pressed={auto}>{auto ? "Pausar" : "Reproducir"}</button>
          <button onClick={() => mover(1)} disabled={paso === PASOS.length - 1}>Siguiente</button>
        </div>
        <div className="selector-pasos" role="group" aria-label="Elegir un paso">
          {PASOS.map((item, i) => (
            <button
              key={item.t}
              aria-label={`Ir al paso ${i + 1}: ${item.t}`}
              aria-current={i === paso ? "step" : undefined}
              title={item.t}
              onClick={() => seleccionarPaso(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
