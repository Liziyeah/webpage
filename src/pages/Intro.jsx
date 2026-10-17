import { useEffect, useRef, useState } from "react";

/* ───────── AJUSTES ───────── */
const HOLD = 850; // ms que dura la pantalla cubierta antes de abrirse
const PANELS = 7; // cantidad de "persianas"
const ONLY_FIRST_VISIT = false; // true = solo se muestra la primera vez por sesión

const shouldSkip = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  (ONLY_FIRST_VISIT && sessionStorage.getItem("intro-seen") === "1");

/**
 * Intro de persianas: los cuadros de color caen, cubren la pantalla
 * y luego se abren hacia arriba y hacia abajo.
 * Cuando empiezan a abrirse llama a `onReveal` (aparece el contenido).
 */
export default function Intro({ onReveal }) {
  const [phase, setPhase] = useState(() => (shouldSkip() ? "gone" : "load")); // load → exit → gone
  const revealRef = useRef(onReveal);
  revealRef.current = onReveal;

  useEffect(() => {
    // Si se omite la intro, muestra el contenido de una vez
    if (phase === "gone") {
      revealRef.current();
      return;
    }

    const root = document.documentElement;
    root.classList.add("intro-lock"); // bloquea el scroll mientras está cubierta
    window.scrollTo(0, 0);

    const timers = [];
    let fontsReady = false;
    let timeUp = false;
    let opened = false;

    const open = () => {
      if (opened || !fontsReady || !timeUp) return;
      opened = true;
      setPhase("exit");
      revealRef.current();
      timers.push(
        setTimeout(() => {
          setPhase("gone");
          root.classList.remove("intro-lock");
          sessionStorage.setItem("intro-seen", "1");
        }, 1250),
      );
    };

    // Espera a que carguen las fuentes (con tope de 2.5 s por si algo tarda)
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      fontsReady = true;
      open();
    });
    timers.push(
      setTimeout(() => {
        timeUp = true;
        open();
      }, HOLD),
    );
    timers.push(
      setTimeout(() => {
        fontsReady = true;
        open();
      }, 2500),
    );

    return () => {
      timers.forEach(clearTimeout);
      root.classList.remove("intro-lock");
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === "gone") return null;

  const panels = Array.from({ length: PANELS }, (_, i) => (
    <span key={i} style={{ "--i": i }} />
  ));

  return (
    <>
      <style>{css}</style>

      <div className={`intro ${phase}`} aria-hidden="true">
        {/* Las azules van detrás: entran primero y salen un poco después de las rosas */}
        <div className="in-panels back">{panels}</div>
        <div className="in-panels front">{panels}</div>
      </div>
    </>
  );
}

const css = `
html.intro-lock{overflow:hidden}

.intro{position:fixed;inset:0;z-index:99990;overflow:hidden}
.intro.exit{pointer-events:none}

.in-panels{position:absolute;inset:0;display:flex}
.in-panels span{flex:1;margin-right:-1px;
  /* ENTRADA: azul y rosa de cada columna caen JUNTAS (misma demora), así el azul queda
     escondido detrás del rosa. Van de izquierda a derecha. */
  animation:in-drop .5s cubic-bezier(.22,1,.36,1) backwards;
  animation-delay:calc(var(--i) * 40ms);
  /* SALIDA: se abren */
  transition:transform .7s cubic-bezier(.77,0,.18,1);
  transition-delay:calc(var(--i) * 40ms)}
.in-panels span:nth-child(even){animation-name:in-rise}

.in-panels.back span{background:#1a0cf0;transition-delay:calc(200ms + var(--i) * 40ms)}
.in-panels.front span{background:#f07ad8}

@keyframes in-drop{from{transform:translateY(-101%)}}
@keyframes in-rise{from{transform:translateY(101%)}}

/* al abrir: las impares suben y las pares bajan */
.intro.exit .in-panels span{transform:translateY(-101%)}
.intro.exit .in-panels span:nth-child(even){transform:translateY(101%)}
`;
