// ============================================================================
// 1. VARIABLES DE CONFIGURACIÓN (MODIFICA AQUÍ PARA PERSONALIZAR)
// ============================================================================

// [MODIFICAR TIEMPO]: Duración total del ciclo en frames (60 frames = 1 segundo).
// 480 frames = 8 segundos en total (2 segundos por cada una de las 4 etapas).
let duracionCiclo = 480;

// [MODIFICAR TIEMPO]: Velocidad con la que flota Blas arriba y abajo (más alto = más rápido)
let velocidadFlotacion = 0.05;

// [MODIFICAR FORMA]: Radio del círculo contenedor principal y cantidad de ondas de voz
let radioCirculoBase = 130;
let cantidadOndasVoz = 3;

// [MODIFICAR TEXTO]: Las 4 etapas reales de tu arquitectura local (PDF)
const etapasSistema = [
  "1. Whisper: Transcribiendo tu voz...",
  "2. bge-m3: Buscando en base oficial UNM...",
  "3. Llama 3.2: Redactando respuesta clara...",
  "4. Piper: Generando audio accesible...",
];

// [MODIFICAR COLORES]: Paleta en JavaScript (Normal vs Alto Contraste)
let modoAltoContraste = false;
const paletaNormal = {
  fondo: "#fdfdfd",
  puntosFondo: "#dce7f5",
  violetaClaro: "#757cd2",
  violetaOscuro: "#4a4b9b",
  grisTrazo: "#4f4f4f",
  blancoCuerpo: "#ffffff",
};

const paletaContraste = {
  fondo: "#09183e",
  puntosFondo: "#16295a",
  violetaClaro: "#ffd60a",
  violetaOscuro: "#ffffff",
  grisTrazo: "#09183e",
  blancoCuerpo: "#ffffff",
};

// Referencias a elementos del HTML
let elTextoEtapa;
let elBarraProgreso;

// ============================================================================
// 2. CONFIGURACIÓN INICIAL DE P5.JS
// ============================================================================
function setup() {
  const cont = document.getElementById("canvas-container");
  let canvas = createCanvas(cont.clientWidth, cont.clientHeight);
  canvas.parent("canvas-container");

  elTextoEtapa = document.getElementById("texto-etapa");
  elBarraProgreso = document.getElementById("progreso-relleno");

}

// ============================================================================
// 3. BUCLE PRINCIPAL DE ANIMACIÓN (60 VECES POR SEGUNDO)
// ============================================================================
function draw() {
  let colores = window.altoContraste ? paletaContraste : paletaNormal; // lo define la página (React)
  background(colores.fondo);

  // Calcular tiempo normalizado de 0.0 a 1.0
  let progresoTotal = (frameCount % duracionCiclo) / duracionCiclo;

  // Determinar en cuál de las 4 etapas estamos (0, 1, 2 o 3)
  let indiceEtapa = floor(progresoTotal * etapasSistema.length);
  actualizarInterfazHTML(indiceEtapa, progresoTotal);

  // Dibujar capas de atrás hacia adelante:
  dibujarTramaPuntos(colores); // Capa 1: Fondo de puntos celestes del PDF

  push();
  translate(width / 2, height / 2 + 15); // Dejar espacio entre el encabezado y Blas
  dibujarCirculosPDF(colores, progresoTotal); // Capa 2: Los arcos/anillos violetas del PDF
  dibujarOndasVoz(colores, indiceEtapa); // Capa 3: Ondas reactivas al audio
  dibujarAvatarBlas(colores, indiceEtapa); // Capa 4: Personaje Blas flotando
  pop();
}

// ============================================================================
// 4. FUNCIONES DE DIBUJO (MODIFICA FORMAS AQUÍ)
// ============================================================================

// [MODIFICAR FORMA]: Trama de puntos decorativos del fondo (estilo diapositivas PDF)
function dibujarTramaPuntos(colores) {
  fill(colores.puntosFondo);
  noStroke();
  let separacion = 36; // Cambia este número para juntar o separar los puntos
  for (let x = 0; x < width; x += separacion) {
    for (let y = 0; y < height; y += separacion) {
      // Efecto ola sutil en el tamaño de los puntos
      let tamano = map(
        sin(frameCount * 0.03 + x * 0.01 + y * 0.01),
        -1,
        1,
        4,
        10,
      );
      circle(x, y, tamano);
    }
  }
}

// [MODIFICAR FORMA]: Círculo relleno y anillo exterior característicos de tu presentación
function dibujarCirculosPDF(colores, t) {
  // Respiración suave del círculo
  let pulso = sin(t * TWO_PI * 2) * 8;
  let r = radioCirculoBase + pulso;

  // Círculo interior relleno
  noStroke();
  fill(colores.violetaClaro);
  circle(0, 0, r * 2);

  // Anillo exterior separado (el doble borde blanco/violeta de tus diapositivas)
  noFill();
  stroke(colores.violetaClaro);
  strokeWeight(10); // Grosor del anillo exterior
  circle(0, 0, (r + 22) * 2);
}

// [MODIFICAR FORMA]: Ondas concéntricas que se expanden cuando Whisper escucha (etapa 0) o Piper habla (etapa 3)
function dibujarOndasVoz(colores, etapa) {
  // Solo emitir ondas activas en etapa 0 (Voz entrada) o etapa 3 (Voz salida)
  if (etapa === 0 || etapa === 3) {
    noFill();
    for (let i = 0; i < cantidadOndasVoz; i++) {
      // Desfase entre ondas
      let cicloOnda = (frameCount * 0.015 + i / cantidadOndasVoz) % 1;
      let diametro = map(
        cicloOnda,
        0,
        1,
        radioCirculoBase * 2,
        radioCirculoBase * 3.4,
      );
      let transparencia = map(cicloOnda, 0, 1, 200, 0);

      let c = color(colores.violetaOscuro);
      c.setAlpha(transparencia);
      stroke(c);
      strokeWeight(4);
      circle(0, 0, diametro);
    }
  }
}

// [MODIFICAR FORMA]: Representación geométrica minimalista y animada de "Blas"
function dibujarAvatarBlas(colores, etapa) {
  // Movimiento de flotación espectral (arriba/abajo)
  let flotarY = sin(frameCount * velocidadFlotacion) * 12;

  // Si está en etapa 1 o 2 (pensando/buscando), se inclina levemente
  let inclinacion =
    etapa === 1 || etapa === 2 ? sin(frameCount * 0.08) * 0.08 : 0;

  push();
  translate(0, flotarY);
  rotate(inclinacion);

  // --- Cuerpito espectral ---
  fill(colores.blancoCuerpo);
  stroke(colores.grisTrazo);
  strokeWeight(5);

  // Cabeza redondeada
  rectMode(CENTER);
  rect(0, -10, 130, 105, 55, 55, 45, 45);

  // --- Orejas de gato ---
  // Oreja izquierda
  triangle(-55, -45, -45, -90, -15, -58);
  // Oreja derecha
  triangle(55, -45, 45, -90, 15, -58);

  // Interior violeta de las orejas
  noStroke();
  fill(colores.violetaClaro);
  triangle(-47, -50, -42, -78, -22, -58);
  triangle(47, -50, 42, -78, 22, -58);

  // --- Cuernitos / Mechones centrales violetas ---
  triangle(-18, -58, -10, -82, -2, -58);
  triangle(2, -58, 10, -82, 18, -58);

  // --- Collar institucional ---
  fill(colores.violetaOscuro);
  rect(0, 44, 76, 12, 6);

  // --- Ojos y expresiones dinámicas según la etapa ---
  fill(colores.grisTrazo);
  noStroke();

  if (etapa === 2) {
    // Etapa 2 (Procesando): Ojos concentrados / parpadeo rápido
    rect(-26, -12, 22, 6, 3);
    rect(26, -12, 22, 6, 3);
  } else {
    // Ojos ovalados amigables (parpadeo natural cada 150 frames)
    let alturaOjo = frameCount % 150 < 6 ? 4 : 26;
    ellipse(-26, -12, 16, alturaOjo);
    ellipse(26, -12, 16, alturaOjo);
  }

  // Mejillas violetas
  fill(colores.violetaClaro);
  ellipse(-42, 4, 16, 8);
  ellipse(42, 4, 16, 8);

  // --- Boca reactiva a la voz ---
  stroke(colores.grisTrazo);
  strokeWeight(4);
  if (etapa === 3) {
    // Etapa 3 (Piper hablando): La boca se abre y cierra al ritmo de la voz
    let aperturaBoca = map(sin(frameCount * 0.4), -1, 1, 4, 18);
    fill(colores.violetaClaro);
    ellipse(0, 12, 18, aperturaBoca);
  } else {
    // Sonrisa tranquila de gato (formato "w")
    noFill();
    arc(-6, 8, 12, 10, 0, PI);
    arc(6, 8, 12, 10, 0, PI);
  }

  pop();
}

// ============================================================================
// 5. SINCRONIZACIÓN CON EL HTML Y RESPONSIVIDAD
// ============================================================================
function actualizarInterfazHTML(indiceEtapa, progresoTotal) {
  if (elTextoEtapa.textContent !== etapasSistema[indiceEtapa]) {
    elTextoEtapa.textContent = etapasSistema[indiceEtapa];
  }
  elBarraProgreso.style.width = `${progresoTotal * 100}%`;
}

function windowResized() {
  const c = document.getElementById("canvas-container");
  if (c) resizeCanvas(c.clientWidth, c.clientHeight);
}

export { setup, draw, windowResized };
