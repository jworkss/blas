import { useEffect, useState } from "react";
import Blas from "./components/Blas.jsx";
import Proceso from "./components/Proceso.jsx";
import { paginas } from "./data/paginas.js";
import videos from "./data/videos.json";

// Rutas con "#/" para que funcione en GitHub Pages sin configuración extra
function useRuta() {
  const leer = () => window.location.hash.replace(/^#\/?/, "") || "inicio";
  const [ruta, setRuta] = useState(leer);
  useEffect(() => {
    const alCambiar = () => { setRuta(leer()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", alCambiar);
    return () => window.removeEventListener("hashchange", alCambiar);
  }, []);
  return ruta;
}

function Inicio() {
  return (
    <>
      <Blas />
      <section className="bloque">
        <h2>¿Por qué existe Blas?</h2>
        <p>Blas es un asistente virtual de voz y texto para ingresantes de la UNM, pensado para personas con baja visión, ciegas y mayores. Responde con datos públicos de la página oficial de la universidad y corre en una notebook, sin enviar información a la nube.</p>
        <p>Esta página reúne las justificaciones del proyecto. Nota personal: no todas las justificaciones están completadas, fueron tenidas en cuenta durante el desarrollo del proyecto.</p>
        <div className="tarjetas">
          {paginas.map((p) => (
            <a key={p.id} className="tarjeta" href={`#/${p.id}`}>
              <h3>{p.titulo}</h3>
              <p>{p.resumen}</p>
              <span>Ver justificación →</span>
            </a>
          ))}
        </div>
      </section>
      <section className="bloque">
        <h2>Cómo funciona, paso a paso</h2>
        <p>Explorá el recorrido operativo de una consulta, paso a paso.</p>
        <a className="enlace-boton" href="#/proceso">Ver las consultas</a>
      </section>
    </>
  );
}

function ProcesoPagina() {
  return (
    <article className="pagina proceso-pagina">
      <a href="#/">← Volver al inicio</a>
      <h2>Flujo de consultas </h2>
      <p>Este diagrama muestra el flujo operativo de una consulta en Blas. Representa los pasos del sistema, no el razonamiento interno del modelo. Podés pausar la animación y avanzar con los controles.</p>
      <Proceso />
    </article>
  );
}

function VideoPagina() {
  const elegirVideo = () =>
    videos.find((video) => video.maxWidth === null || window.innerWidth <= video.maxWidth);
  const [video, setVideo] = useState(elegirVideo);

  useEffect(() => {
    const alCambiarAncho = () => setVideo(elegirVideo());
    window.addEventListener("resize", alCambiarAncho);
    return () => window.removeEventListener("resize", alCambiarAncho);
  }, []);

  return (
    <article className="pagina video-pagina">
      <a href="#/">← Volver al inicio</a>
      <h1>Videos de Blas</h1>
      <p>El video se adapta al formato de pantalla: vertical, cuadrado u horizontal.</p>
      <p>Tanto, las animaciones como el audio fueron creados desde las IA locales desarrolladas por el equipo de Blas.</p>
      <video
        className={`video-responsivo video-${video.id}`}
        key={video.src}
        src={`${import.meta.env.BASE_URL}${video.src}`}
        controls
        playsInline
        preload="metadata"
        aria-label={`Video de Blas en formato ${video.formato.toLowerCase()}`}
      >
        Tu navegador no admite la reproducción de video.
      </video>
    </article>
  );
}

function Justificacion({ p }) {
  return (
    <article className="pagina">
      <a href="#/">← Volver al inicio</a>
      <h1>{p.titulo}</h1>
      <p>{p.resumen}</p>
      {p.puntos.map(([titulo, texto]) => (
        <div className="punto" key={titulo}>
          <h3>{titulo}</h3>
          <p>{texto}</p>
        </div>
      ))}
      <h2>Referencias</h2>
      <ul className="refs">
        {p.refs.map(([texto, url]) => (
          <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{texto}</a></li>
        ))}
      </ul>
    </article>
  );
}

export default function App() {
  const ruta = useRuta();
  const [contraste, setContraste] = useState(false);
  const esProceso = ruta === "proceso";
  const esVideo = ruta === "videos";
  const pagina = paginas.find((p) => p.id === ruta);

  useEffect(() => {
    window.altoContraste = contraste; // lo lee la animación de Blas
    document.body.classList.toggle("alto-contraste", contraste);
  }, [contraste]);

  return (
    <>
      <a className="saltar" href="#/" onClick={(e) => { e.preventDefault(); document.getElementById("contenido").focus(); }}>
        Saltar al contenido
      </a>
      <nav className="barra" aria-label="Principal">
        <a href="#/" aria-current={!pagina && !esProceso && !esVideo ? "page" : undefined}>Inicio</a>
        {paginas.map((p) => (
          <a key={p.id} href={`#/${p.id}`} aria-current={ruta === p.id ? "page" : undefined}>{p.corto}</a>
        ))}
        <a href="#/proceso" aria-current={esProceso ? "page" : undefined}>Flujo de consultas</a>
        <a href="#/videos" aria-current={esVideo ? "page" : undefined}>Videos</a>
        <button id="btn-contraste" aria-pressed={contraste} onClick={() => setContraste(!contraste)}>
          Modo alto contraste
        </button>
        <button className="boton-pdf" type="button" onClick={() => window.print()} title="Se abrirá el diálogo de impresión para guardar la página como PDF.">
          Guardar como PDF
        </button>
      </nav>
      <main id="contenido" tabIndex={-1}>
        {pagina ? (
          <Justificacion p={pagina} />
        ) : esProceso ? (
          <ProcesoPagina />
        ) : esVideo ? (
          <VideoPagina />
        ) : (
          <Inicio />
        )}
      </main>
      <footer className="pie">
        <p><strong>Universidad Nacional de Moreno</strong></p>
        <p>Carrera: Diseño multimedial · Materia: Taller de Diseño Multimedial 4 2026</p>
        <p>Alumnos: Duarte Marcos, Aimee Meza, Abigail Rolón</p>
        <p>Docentes: Natalia Rodriguez, Federico Barabino</p>
        <p>Proyecto académico. No es un servicio oficial de la Universidad Nacional de Moreno: los datos provienen de su sitio público y deben verificarse en <a href="https://www.unm.edu.ar" target="_blank" rel="noopener noreferrer">unm.edu.ar</a>.</p>
      </footer>
    </>
  );
}
