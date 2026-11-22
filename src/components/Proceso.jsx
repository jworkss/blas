import { useEffect, useState } from "react";

// Nodos del diagrama de la presentación: [x, y, texto, grupo]
const N = {
  usuario: [20, 10, "Usuario del chat", "ui"],
  interfaz: [250, 10, "Interfaz de chat", "ui"],
  audio: [480, 10, "Audio generado", "ui"],
  servidor: [20, 120, "Servidor HTTPS", "rt"],
  voz: [250, 120, "Chat de voz", "rt"],
  texto: [480, 120, "Chat de texto", "rt"],
  cola: [710, 120, "Cola de solicitudes", "rt"],
  cuentas: [20, 230, "Cuentas y acceso", "rt"],
  herr: [250, 230, "Herramientas de voz", "rt"],
  proc: [710, 230, "Procesamiento de consultas", "rt"],
  bd: [20, 340, "Base de datos del chat", "kb"],
  cont: [250, 340, "Contenido de conocimiento", "kb"],
  kb: [480, 340, "Búsqueda (kb.js)", "kb"],
  emb: [710, 340, "Embeddings (bge-m3)", "kb"],
  certs: [20, 450, "Certificados TLS", "adm"],
  csv: [250, 450, "Exportación CSV", "adm"],
};
const W = 190, H = 54;
const centro = (id) => [N[id][0] + W / 2, N[id][1] + H / 2];

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
  const [paso, setPaso] = useState(0);
  const [auto, setAuto] = useState(!reducir);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setPaso((p) => (p + 1) % PASOS.length), 12000);
    return () => clearInterval(id);
  }, [auto]);

  const { t, d, ruta, on } = PASOS[paso];
  const trazo = "M" + ruta.map((n) => centro(n).join(",")).join(" L");
  const mover = (delta) => {
    setAuto(false);
    setPaso((actual) => Math.max(0, Math.min(PASOS.length - 1, actual + delta)));
  };
  const seleccionarPaso = (indice) => {
    setAuto(false);
    setPaso(indice);
  };

  return (
    <div className="proceso">
      <svg viewBox="0 0 920 510" role="img" aria-label="Diagrama del recorrido de una consulta en Blas, de la persona al servidor, la búsqueda, el modelo y el audio">
        <g key={paso}>
          <path d={trazo} className="flujo" />
          {!reducir && (
            <circle r="8" className="paquete">
              <animateMotion dur="8s" repeatCount="indefinite" path={trazo} />
            </circle>
          )}
        </g>
        {Object.entries(N).map(([id, [x, y, txt, grupo]]) => (
          <g key={id} className={`nodo ${grupo} ${on.includes(id) ? "on" : ""}`}>
            <rect x={x} y={y} width={W} height={H} rx="10" />
            <text x={x + W / 2} y={y + H / 2 + 4} textAnchor="middle">{txt}</text>
          </g>
        ))}
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
