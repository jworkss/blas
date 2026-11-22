import { useEffect } from "react";
import p5 from "p5";
import { setup, draw, windowResized } from "../animations/sketch.js";

// Animación de Blas (p5 en modo global) dentro de la portada
export default function Blas() {
  useEffect(() => {
    Object.assign(window, { setup, draw, windowResized });
    const instancia = new p5();
    return () => {
      instancia.remove();
      delete window.setup;
      delete window.draw;
      delete window.windowResized;
    };
  }, []);

  return (
    <section className="hero" aria-label="Animación de Blas">
      <header className="encabezado">
        <span className="etiqueta-unm">UNM · IA LOCAL ACCESIBLE</span>
        <h1>Hola, soy Blas</h1>
        <p className="sub">Asistente virtual de voz y texto para ingresantes. Funciona en una notebook, sin enviar datos a la nube.</p>
      </header>
      <div id="canvas-container" aria-hidden="true"></div>
      
      <div className="panel-estado">
        <div><h2> Chain-of-Thought</h2></div>
        <p id="texto-etapa">Escuchando consulta por voz...</p>
        <div className="barra-progreso"><div id="progreso-relleno"></div></div>
      </div>
    </section>
  );
}
