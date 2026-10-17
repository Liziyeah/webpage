import { useRef, useState } from "react";
import avatar from "../assets/lizi.png";
import logoPink from "../assets/logo-pink.png";
import logoBlue from "../assets/logoblue.png";

const STAR =
  "M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z";
function Star({ size = 24, color = "#f07ad8", style, className = "" }) {
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d={STAR} fill={color} />
    </svg>
  );
}

/* Letras que caen con rebote */
function FallingText({ text, start = 0, step = 70 }) {
  return (
    <span aria-label={text}>
      {[...text].map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="letter"
          style={{ animationDelay: `${start + i * step}ms` }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

/* Estrellas decorativas que titilan y flotan */
const STARS = [
  { top: "12%", left: "36%", size: 34, color: "#f07ad8", d: 0 },
  { top: "28%", left: "88%", size: 20, color: "#9b4f8f", d: 0.6 },
  { top: "62%", left: "30%", size: 16, color: "#9b4f8f", d: 1.1 },
  { top: "74%", left: "92%", size: 24, color: "#f07ad8", d: 0.3 },
  { top: "8%", left: "70%", size: 14, color: "#1a0cf0", d: 1.6 },
];

export default function Hero() {
  const heroRef = useRef(null);
  const last = useRef(0);
  const uid = useRef(0);
  const [sparks, setSparks] = useState([]);
  const [hop, setHop] = useState(false);

  const onMove = (e) => {
    const el = heroRef.current;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    // parallax: -0.5 … 0.5
    el.style.setProperty("--px", (x / r.width - 0.5).toFixed(3));
    el.style.setProperty("--py", (y / r.height - 0.5).toFixed(3));

    // estela de estrellitas
    const now = performance.now();
    if (now - last.current < 70) return;
    last.current = now;
    const id = ++uid.current;
    const color = id % 2 ? "#f07ad8" : "#1a0cf0";
    setSparks((s) => [...s.slice(-12), { id, x, y, color }]);
    setTimeout(() => setSparks((s) => s.filter((p) => p.id !== id)), 800);
  };

  const onLeave = () => {
    heroRef.current.style.setProperty("--px", 0);
    heroRef.current.style.setProperty("--py", 0);
  };

  return (
    <>
      <style>{css}</style>

      <div className="checker" aria-hidden="true" />

      <header className="nav">
        <nav>
          {["Home", "About", "Projects", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}>
              {l}
            </a>
          ))}
        </nav>
      </header>

      <section
        ref={heroRef}
        className="hero"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {STARS.map((s, i) => (
          <Star
            key={i}
            className="twinkle"
            size={s.size}
            color={s.color}
            style={{ top: s.top, left: s.left, animationDelay: `${s.d}s` }}
          />
        ))}

        {sparks.map((p) => (
          <Star
            key={p.id}
            className="spark"
            size={14}
            color={p.color}
            style={{ left: p.x, top: p.y }}
          />
        ))}

        <div className="stage">
          <div className="avatar-wrap">
            <img
              className={`avatar ${hop ? "hop" : ""}`}
              src={avatar}
              alt="Ilustración de Lizi con un gato en la cabeza"
              onClick={() => setHop(true)}
              onAnimationEnd={(e) => e.animationName === "hop" && setHop(false)}
            />
          </div>
        </div>

        <div className="copy">
          <h1>
            <FallingText text="Hey!, I am " />
            <img className="name-logo" src={logoPink} alt="lizi" />
          </h1>

          <p className="role">
            <FallingText text="UX/UI Designer" start={1300} step={40} />
          </p>

          <p className="bio">
            I design digital experiences that are intuitive, functional and
            visually appealing. Focused on creating solutions that connect users
            with brands.
          </p>

          <div className="cta">
            <a className="btn solid" href="#work">
              View my work
            </a>
            <a className="btn outline" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

const css = `
:root{--blue:#1a0cf0;--pink:#f07ad8;--pink-soft:#f7b6e6;--plum:#9b4f8f;--bg:#fff8f3}
*{box-sizing:border-box}
:root{color-scheme:light}
html,body{margin:0;width:100%;background:var(--bg)}
body{display:block;place-items:unset;min-width:0;font-family:"Fredoka","Baloo 2",system-ui,sans-serif;overflow-x:hidden}
#root{max-width:none;width:100%;margin:0;padding:0;text-align:left;border:0}

/* Borde de cuadros que se desliza */
.checker{height:28px;
  background:repeating-conic-gradient(var(--pink-soft) 0 25%,#fff 0 50%) 0 0/28px 28px;
  animation:slide}
@keyframes slide{to{background-position:56px 0}}

.nav{display:flex;justify-content:space-between;align-items:center;padding:16px 5vw 0}
.logo{height:48px;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}
.logo:hover{transform:rotate(-6deg) scale(1.12)}
.nav nav{display:flex;gap:32px}
.nav a{color:var(--blue);text-decoration:none;font-size:14px;position:relative}
.nav a::after{content:"";position:absolute;left:0;bottom:-4px;height:2px;width:100%;
  background:var(--pink);transform:scaleX(0);transform-origin:left;transition:transform .25s}
.nav a:hover::after{transform:scaleX(1)}

.hero{--px:0;--py:0;position:relative;overflow:hidden;display:flex;align-items:center;
  justify-content:center;gap:clamp(32px,6vw,100px);padding:56px 5vw 96px;flex-wrap:wrap;min-height:calc(100vh - 90px)}

/* Escenario del avatar con parallax */
.stage{position:relative;width:min(480px,82vw);aspect-ratio:1}
.avatar-wrap{position:relative;z-index:2;
  transform:translate(calc(var(--px)*-16px),calc(var(--py)*-16px)) rotate(calc(var(--px)*4deg));
  transition:transform .2s ease-out}
.avatar{width:100%;display:block;cursor:pointer;
  animation:pop .9s cubic-bezier(.34,1.56,.64,1) both,float 4s ease-in-out 1s infinite}
.avatar.hop{animation:hop .5s ease-out}
@keyframes pop{from{opacity:0;transform:scale(.2) rotate(-25deg)}to{opacity:1;transform:none}}
@keyframes float{50%{transform:translateY(-12px) rotate(1.5deg)}}
@keyframes hop{30%{transform:translateY(-28px) scale(1.06,.96)}60%{transform:translateY(0) scale(.96,1.04)}}

.blob{position:absolute;background:var(--pink-soft);border-radius:999px;z-index:1;
  transition:transform .3s ease-out;animation:blobin .8s ease-out both}
.b1{width:60%;height:26%;top:6%;left:-10%;transform-origin:center;
  transform:translate(calc(var(--px)*26px),calc(var(--py)*26px)) rotate(-48deg)}
.b2{width:48%;height:22%;bottom:2%;right:-6%;
  transform:translate(calc(var(--px)*30px),calc(var(--py)*30px)) rotate(-48deg);animation-delay:.2s}
@keyframes blobin{from{opacity:0;scale:.3}to{opacity:1;scale:1}}

/* Texto */
.copy{display:flex;flex-direction:column;align-items:center;text-align:center;max-width:640px}
h1{margin:0;font-family:"Fredoka","Baloo 2",system-ui,sans-serif;font-weight:700;
  font-size:clamp(38px,5.5vw,68px);line-height:1.1;color:var(--blue);
  display:flex;align-items:center;justify-content:center;flex-wrap:wrap}
.letter{font-family:inherit;font-weight:inherit}
.name-logo{height:1.6em;margin-left:.1em;cursor:pointer;
  animation:drop .8s cubic-bezier(.34,1.56,.64,1) 800ms backwards;
  transition:transform .3s cubic-bezier(.34,1.56,.64,1)}
.name-logo:hover{transform:rotate(-6deg) scale(1.1)}

.role{display:inline-flex;align-items:center;justify-content:center;line-height:1.2;margin:14px 0;padding:8px 32px;border:2px solid var(--pink);
  border-radius:999px;color:var(--pink);background:#fff;font-size:clamp(18px,2vw,26px)}
.bio{max-width:560px;margin:0;font-size:clamp(16px,1.5vw,20px);color:var(--blue);line-height:1.55;opacity:0;animation:fade .8s ease-out 2s forwards}
.cta{display:flex;justify-content:center;flex-wrap:wrap;gap:16px;margin-top:22px;opacity:0;animation:fade .8s ease-out 2.2s forwards}
@keyframes fade{to{opacity:1}}

.btn{position:relative;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;line-height:1;min-height:52px;padding:0 32px;border-radius:999px;text-decoration:none;
  font-weight:600;transition:transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .2s}
.btn:hover{transform:translateY(-3px) scale(1.04);box-shadow:3px 4px 0 var(--plum)}
.btn:active{transform:translateY(0) scale(.97);box-shadow:none}
.solid{background:var(--pink);color:#fff}
.outline{border:2px solid var(--blue);color:var(--blue);background:transparent}
/* brillo que cruza el botón */
.btn::after{content:"";position:absolute;top:0;left:-70%;width:50%;height:100%;
  background:linear-gradient(100deg,transparent,rgba(255,255,255,.65),transparent);transform:skewX(-20deg)}
.btn:hover::after{left:130%;transition:left .6s}

/* Letras cayendo */
.letter{display:inline-block;opacity:0;animation:drop .7s cubic-bezier(.34,1.56,.64,1) forwards}
@keyframes drop{
  0%{opacity:0;transform:translateY(-140px) rotate(-14deg)}
  60%{opacity:1}
  100%{opacity:1;transform:none}}

/* Estrellas */
.twinkle{position:absolute;animation:twinkle 2.8s ease-in-out infinite;z-index:1}
@keyframes twinkle{
  0%,100%{transform:scale(.7) rotate(0);opacity:.55}
  50%{transform:scale(1.2) rotate(45deg);opacity:1}}
.spark{position:absolute;pointer-events:none;z-index:5;margin:-7px 0 0 -7px;
  animation:spark .8s ease-out forwards}
@keyframes spark{to{transform:translateY(24px) rotate(160deg) scale(0);opacity:0}}

@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation:none!important;transition:none!important}
  .letter,.bio,.cta{opacity:1}
  .spark{display:none}
}
`;
