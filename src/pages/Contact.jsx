import Reveal from "./Reveal";
import { EMAIL, LINKEDIN, BEHANCE } from "../Link";

const STAR_PATH =
  "M12 1C13 8 16 11 23 12C16 13 13 16 12 23C11 16 8 13 1 12C8 11 11 8 12 1Z";

const Sparkle = ({ size, color, style }) => (
  <svg
    className="ct-sparkle"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={style}
    aria-hidden="true"
  >
    <path d={STAR_PATH} fill={color} />
  </svg>
);

const Svg = ({ children }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const MailIcon = () => (
  <Svg>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Svg>
);

const LinkedinIcon = () => (
  <Svg>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </Svg>
);

/* Quita "https://www." para mostrar el link limpio */
const clean = (url) => url.replace(/^https?:\/\/(www\.)?/, "");

const LINKS = [
  {
    icon: <MailIcon />,
    label: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
  },
  {
    icon: <LinkedinIcon />,
    label: clean(LINKEDIN),
    href: LINKEDIN,
    external: true,
  },
  {
    icon: <span className="ct-be">Bē</span>,
    label: clean(BEHANCE),
    href: BEHANCE,
    external: true,
  },
];

export default function Contact() {
  return (
    <>
      <style>{css}</style>

      <div className="ct-checker" aria-hidden="true" />

      <section id="contact" className="contact">
        <Sparkle
          size={28}
          color="#f07ad8"
          style={{ top: "14%", left: "46%" }}
        />
        <Sparkle
          size={18}
          color="#1a0cf0"
          style={{ top: "62%", left: "4%", animationDelay: "1s" }}
        />
        <Sparkle
          size={22}
          color="#9b4f8f"
          style={{ top: "20%", right: "6%", animationDelay: "1.8s" }}
        />

        <div className="ct-inner">
          {/* Título */}
          <Reveal direction="left">
            <h2 className="ct-title">
              <span>LET’S GET</span>
              <span className="ct-pink">IN TOUCH!</span>
            </h2>
          </Reveal>

          {/* Links */}
          <ul className="ct-links">
            {LINKS.map((l, i) => (
              <li key={l.label}>
                <Reveal direction="right" delay={i * 140}>
                  <a
                    className="ct-link"
                    href={l.href}
                    {...(l.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    <span className="ct-tile">{l.icon}</span>
                    <span className="ct-label">{l.label}</span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal direction="none">
          <p className="ct-copy">
            © {new Date().getFullYear()} lizi — UX/UI Designer. ✦
          </p>
        </Reveal>
      </section>
    </>
  );
}

const css = `
/* Borde de cuadros que se desliza (igual que arriba del hero) */
.ct-checker{height:28px;margin-top:40px;
  background:repeating-conic-gradient(#f7b6e6 0 25%,#fff 0 50%) 0 0/28px 28px;
  }
@keyframes ct-slide{to{background-position:56px 0}}

.contact{--blue:#1a0cf0;--pink:#f07ad8;--pink-soft:#fbe3f4;--plum:#9b4f8f;
  position:relative;overflow:hidden;background:#fdf1ef;color:var(--blue);
  padding:clamp(56px,8vw,110px) 5vw 36px;scroll-margin-top:0;
  font-family:"Nunito",system-ui,sans-serif}

.ct-inner{position:relative;z-index:1;max-width:1200px;margin:0 auto;
  display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:clamp(32px,6vw,96px)}

/* Título grande en dos líneas */
.contact .ct-title{margin:0;display:flex;flex-direction:column;
  font-family:"Fredoka","Baloo 2",system-ui,sans-serif;font-weight:700;
  font-size:clamp(46px,8vw,112px);line-height:.95;letter-spacing:-.02em;color:var(--blue)}
.ct-pink{color:var(--pink);text-shadow:4px 4px 0 var(--blue);
  display:inline-block;transform-origin:left center;
  transition:transform .35s cubic-bezier(.34,1.56,.64,1)}
.ct-title:hover .ct-pink{transform:rotate(-3deg) scale(1.04)}

/* Lista de links */
.ct-links{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:22px}
.ct-link{display:inline-flex;align-items:center;gap:20px;color:var(--blue);text-decoration:none}
.ct-tile{flex:none;display:grid;place-items:center;width:60px;height:60px;border-radius:16px;
  background:var(--pink-soft);border:1.5px solid var(--pink);
  transition:transform .3s cubic-bezier(.34,1.56,.64,1),background .2s,color .2s}
.ct-be{font-family:"Fredoka",system-ui,sans-serif;font-weight:700;font-size:22px;line-height:1}
.ct-label{position:relative;font-size:clamp(17px,2vw,24px);font-weight:600;word-break:break-word}
.ct-label::after{content:"";position:absolute;left:0;bottom:-4px;height:2px;width:100%;
  background:var(--pink);transform:scaleX(0);transform-origin:left;transition:transform .3s}
.ct-link:hover .ct-tile{transform:rotate(-10deg) scale(1.12);background:var(--pink);color:#fff}
.ct-link:hover .ct-label::after{transform:scaleX(1)}

/* Copyright */
.ct-copy{margin:clamp(48px,7vw,88px) 0 0;text-align:center;font-size:14px;color:var(--plum)}

/* Estrellitas */
.ct-sparkle{position:absolute;pointer-events:none;animation:ct-twinkle 2.8s ease-in-out infinite}
@keyframes ct-twinkle{
  0%,100%{transform:scale(.7) rotate(0);opacity:.5}
  50%{transform:scale(1.2) rotate(45deg);opacity:1}}

@media (max-width:820px){
  .ct-inner{grid-template-columns:1fr}
}

@media (prefers-reduced-motion:reduce){
  .ct-checker,.ct-sparkle{animation:none}
}
`;
