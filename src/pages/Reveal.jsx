import { useEffect, useRef, useState } from "react";

/* Estilos del efecto: se inyectan una sola vez en toda la app */
const CSS = `
.rv{
  opacity:0;
  filter:blur(6px);
  transition:
    opacity 1s ease,
    filter 1s ease,
    transform 1s cubic-bezier(.22,1,.36,1);
  will-change:opacity,transform,filter;
}
.rv-up{transform:translateY(48px)}
.rv-left{transform:translateX(-56px)}
.rv-right{transform:translateX(56px)}
.rv-zoom{transform:scale(.92)}
.rv-none{transform:none}

.rv.in{opacity:1;filter:none;transform:none}

@media (prefers-reduced-motion:reduce){
  .rv{opacity:1;filter:none;transform:none;transition:none}
}
`;

if (typeof document !== "undefined" && !document.getElementById("rv-style")) {
  const tag = document.createElement("style");
  tag.id = "rv-style";
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

/**
 * Hace que su contenido aparezca poco a poco al hacer scroll.
 *
 * Props:
 *  - direction: "up" (default) | "left" | "right" | "zoom" | "none"
 *  - delay:     retraso en ms (útil para escalonar elementos)
 *  - once:      true (default) aparece una vez; false = se desvanece al salir y reaparece
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  once = true,
  className = "",
}) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShow(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`rv rv-${direction} ${show ? "in" : ""} ${className}`}
      style={{ transitionDelay: show ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
