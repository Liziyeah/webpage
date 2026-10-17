import { useEffect, useRef } from "react";

/* Elementos sobre los que el cursor "reacciona" (crece y se pone azul) */
const HOVERABLE =
  "a, button, [role='button'], .pj-card, .feature, .skill-card li, .pj-tags li";

export default function Cursor() {
  const wrap = useRef(null);

  useEffect(() => {
    // Solo en dispositivos con mouse (no en celular/tablet)
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const ease = reduce ? 1 : 0.45; // 1 = sin retraso, más bajo = más "flotante"

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let x = -100,
      y = -100; // posición real del mouse
    let sx = x,
      sy = y; // posición suavizada de la flecha
    let raf;

    const tick = () => {
      sx += (x - sx) * ease;
      sy += (y - sy) * ease;
      if (wrap.current)
        wrap.current.style.transform = `translate3d(${sx}px,${sy}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const show = (on) => wrap.current?.classList.toggle("on", on);

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      show(true);
    };

    const onOver = (e) => {
      const hovering = !!e.target.closest?.(HOVERABLE);
      wrap.current?.classList.toggle("hover", hovering);
    };

    const onDown = () => wrap.current?.classList.add("down");
    const onUp = () => wrap.current?.classList.remove("down");

    /* Confeti redondo al hacer clic */
    const onClick = (e) => {
      if (reduce) return;
      for (let i = 0; i < 7; i++) {
        const p = document.createElement("span");
        const angle = (Math.PI * 2 * i) / 7 + Math.random() * 0.5;
        const dist = 30 + Math.random() * 30;
        p.className = "cur-burst";
        p.style.left = `${e.clientX}px`;
        p.style.top = `${e.clientY}px`;
        p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
        p.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
        p.style.background = i % 2 ? "#f07ad8" : "#1a0cf0";
        p.addEventListener("animationend", () => p.remove());
        document.body.appendChild(p);
      }
    };

    const onLeave = () => show(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("click", onClick);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("click", onClick);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <style>{css}</style>

      <div ref={wrap} className="cur" aria-hidden="true">
        <div className="cur-arrow">
          <svg width="32" height="32" viewBox="0 0 24 24">
            {/* Flecha con esquinas redondeadas: el borde blanco grueso redondea las puntas */}
            <path
              d="M5 3 L5 20 L9.4 15.9 L12.4 22.2 L15.6 20.8 L12.7 14.6 L18.8 14.3 Z"
              fill="#f07ad8"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

const css = `
/* Oculta el cursor normal solo cuando el personalizado está activo */
html.has-custom-cursor,
html.has-custom-cursor *{cursor:none !important}

.cur{position:fixed;top:0;left:0;z-index:99999;pointer-events:none;opacity:0;
  transition:opacity .2s}
.cur.on{opacity:1}

/* La punta de la flecha cae justo en la posición del mouse */
.cur-arrow{width:32px;height:32px;margin:-4px 0 0 -6px;transform-origin:6px 4px;
  transition:transform .3s cubic-bezier(.34,1.56,.64,1)}
.cur-arrow svg{display:block;filter:drop-shadow(1.5px 2px 0 #9b4f8f)}
.cur-arrow path{transition:fill .2s}

/* Sobre un link / botón / tarjeta: crece, se inclina y se pone azul */
.cur.hover .cur-arrow{transform:scale(1.3) rotate(-8deg)}
.cur.hover .cur-arrow path{fill:#1a0cf0}
/* Al presionar: se encoge */
.cur.down .cur-arrow{transform:scale(.85)}

/* Confeti redondo al hacer clic */
.cur-burst{position:fixed;z-index:99998;pointer-events:none;width:10px;height:10px;margin:-5px 0 0 -5px;
  border-radius:50%;animation:cur-burst .7s ease-out forwards}
@keyframes cur-burst{
  to{transform:translate(var(--dx),var(--dy)) scale(0);opacity:0}}
`;
