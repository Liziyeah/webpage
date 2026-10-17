import Reveal from "./Reveal";
import { PROJECTS } from "../Projects";
import { BEHANCE } from "../Link";

/* Inclinación (r) y desnivel (y) de cada tarjeta.
   Fila 1 = primeras 3, fila 2 = siguientes 3. Cámbialos a tu gusto. */
const TILTS = [
  { r: -4, y: 6 }, // 1
  { r: 3.5, y: 52 }, // 2  (más abajo)
  { r: -2.5, y: 14 }, // 3
  { r: 3, y: 14 }, // 4
  { r: -3.5, y: 54 }, // 5  (más abajo)
  { r: 4, y: 6 }, // 6
];

const STAR_PATH =
  "M12 1C13 8 16 11 23 12C16 13 13 16 12 23C11 16 8 13 1 12C8 11 11 8 12 1Z";

const StarBadge = ({ size = 64 }) => (
  <svg
    className="pj-star"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d={STAR_PATH}
      fill="#f07ad8"
      stroke="#fff"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

/* Estrellitas decorativas de fondo */
const Sparkle = ({ size, color, style }) => (
  <svg
    className="pj-sparkle"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={style}
    aria-hidden="true"
  >
    <path d={STAR_PATH} fill={color} />
  </svg>
);

export default function Projects() {
  return (
    <>
      <style>{css}</style>

      <section id="projects" className="projects">
        <span id="work" />

        <Sparkle
          size={30}
          color="#f7b6e6"
          style={{ top: "6%", right: "12%" }}
        />
        <Sparkle
          size={18}
          color="#9b4f8f"
          style={{ top: "18%", right: "28%", animationDelay: ".8s" }}
        />
        <Sparkle
          size={22}
          color="#1a0cf0"
          style={{ top: "52%", left: "2%", animationDelay: "1.5s" }}
        />

        {/* Título a la izquierda */}
        <Reveal>
          <header className="pj-head">
            <div className="pj-title">
              <StarBadge />
              <h2>My Projects</h2>
            </div>
          </header>
        </Reveal>

        <div className="pj-grid">
          {PROJECTS.map((p, i) => {
            const t = TILTS[i % TILTS.length];
            return (
              <Reveal key={p.slug} delay={(i % 3) * 140}>
                <article
                  className="pj-card"
                  style={{ "--r": `${t.r}deg`, "--y": `${t.y}px` }}
                >
                  {/* ── Foto del proyecto ── */}
                  <div className="pj-photo">
                    {p.image ? (
                      <img src={p.image} alt={p.title} />
                    ) : (
                      <div className="pj-placeholder">
                        <StarBadge size={44} />
                        <span>Tu foto aquí</span>
                      </div>
                    )}
                  </div>

                  <div className="pj-body">
                    <h3>{p.title}</h3>
                    {p.text && <p>{p.text}</p>}

                    <ul className="pj-tags">
                      {p.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>

                    <div className="pj-actions">
                      {p.behance ? (
                        <a
                          className="pj-btn"
                          href={p.behance}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Details
                        </a>
                      ) : (
                        <span className="pj-btn is-disabled">Coming soon</span>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* ── Banner: conoce más de mi trabajo ── */}
        <Reveal>
          <div className="pj-more">
            <div className="pj-more-text">
              <StarBadge size={48} />
              <div>
                <h3>Want to see more?</h3>
                <p>There’s a lot more in my portfolio :D</p>
              </div>
            </div>

            <a
              className="pj-more-btn"
              href={BEHANCE}
              target="_blank"
              rel="noreferrer"
            >
              See more of my work
              <span className="arrow">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}

const css = `
.projects{--blue:#1a0cf0;--pink:#f07ad8;--pink-soft:#fbe3f4;--plum:#9b4f8f;
  position:relative;width:100%;max-width:1200px;margin:0 auto;padding:40px 5vw 120px;color:var(--blue);
  font-family:"Nunito",system-ui,sans-serif;scroll-margin-top:16px}

/* Encabezado (izquierda) */
.pj-head{text-align:left;margin-bottom:40px}
.pj-title{display:flex;align-items:center;gap:14px}
.projects .pj-title h2{font-family:"Fredoka","Baloo 2",system-ui,sans-serif;font-weight:700;
  font-size:clamp(32px,4vw,48px);color:var(--blue);margin:0}
@keyframes pj-spin{to{transform:rotate(360deg)}}

/* Estrellitas de fondo */
.pj-sparkle{position:absolute;pointer-events:none;animation:pj-twinkle 2.8s ease-in-out infinite}
@keyframes pj-twinkle{
  0%,100%{transform:scale(.7) rotate(0);opacity:.5}
  50%{transform:scale(1.2) rotate(45deg);opacity:1}}

/* Cuadrícula: 3 por fila, 2 filas */
.pj-grid{--k:1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));
  column-gap:clamp(24px,3.5vw,48px);row-gap:clamp(48px,6vw,88px);width:100%}

/* Tarjeta inclinada y escalonada */
.pj-card{height:100%;display:flex;flex-direction:column;background:#fff;
  border:2px solid var(--blue);border-radius:30px;padding:14px;
  box-shadow:5px 7px 0 var(--plum);
  transform:translateY(calc(var(--y) * var(--k))) rotate(calc(var(--r) * var(--k)));
  transition:transform .45s cubic-bezier(.34,1.56,.64,1),box-shadow .3s}
.pj-card:hover{
  transform:translateY(calc(var(--y) * var(--k) - 12px)) rotate(0deg) scale(1.03);
  box-shadow:10px 14px 0 var(--plum)}

/* Foto */
.pj-photo{aspect-ratio:16/10;border-radius:18px;overflow:hidden;background:var(--pink-soft);
  border:1.5px solid var(--pink)}
.pj-photo img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease}
.pj-card:hover .pj-photo img{transform:scale(1.07)}
.pj-placeholder{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;
  background:repeating-conic-gradient(var(--pink-soft) 0 25%,#fff 0 50%) 0 0/24px 24px;
  color:var(--pink);font-weight:700;font-size:14px}
.pj-placeholder span{background:#fff;padding:2px 12px;border-radius:999px;border:1.5px solid var(--pink)}

/* Contenido */
.pj-body{display:flex;flex-direction:column;flex:1;padding:16px 6px 6px}
.projects .pj-body h3{font-family:"Fredoka","Baloo 2",system-ui,sans-serif;font-weight:700;
  font-size:22px;margin:0 0 8px;color:var(--blue)}
.pj-body p{margin:0 0 14px;font-size:14px;line-height:1.55}

.pj-tags{list-style:none;margin:0 0 18px;padding:0;display:flex;flex-wrap:wrap;gap:8px}
.pj-tags li{padding:3px 14px;border:1.5px solid var(--pink);border-radius:999px;background:#fff;
  font-size:13px;font-weight:700;
  transition:transform .2s cubic-bezier(.34,1.56,.64,1),background .2s,color .2s}
.pj-tags li:hover{transform:translateY(-2px) rotate(-3deg);background:var(--pink);color:#fff}

/* Botón */
.pj-actions{display:flex;align-items:center;gap:10px;margin-top:auto}
.pj-btn{position:relative;overflow:hidden;flex:1;display:inline-flex;align-items:center;justify-content:center;
  min-height:44px;border-radius:999px;background:var(--pink);color:#fff;text-decoration:none;
  font-weight:700;line-height:1;
  transition:transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .2s}
.pj-btn:hover{transform:translateY(-2px) scale(1.03);box-shadow:3px 4px 0 var(--plum)}
.pj-btn:active{transform:scale(.97);box-shadow:none}
.pj-btn::after{content:"";position:absolute;top:0;left:-70%;width:50%;height:100%;
  background:linear-gradient(100deg,transparent,rgba(255,255,255,.6),transparent);transform:skewX(-20deg)}
.pj-btn:hover::after{left:130%;transition:left .6s}
.pj-btn.is-disabled{background:var(--pink-soft);color:var(--pink);border:1.5px dashed var(--pink);
  cursor:default;pointer-events:none}
.pj-btn.is-disabled::after{display:none}

/* Banner "ver más" */
.pj-more{margin-top:clamp(48px,7vw,96px);display:flex;align-items:center;justify-content:space-between;
  gap:24px;flex-wrap:wrap;background:var(--pink-soft);border:2px solid var(--blue);border-radius:999px;
  padding:18px 20px 18px 36px;box-shadow:5px 6px 0 var(--plum)}
.pj-more-text{display:flex;align-items:center;gap:16px}
.projects .pj-more h3{font-family:"Fredoka","Baloo 2",system-ui,sans-serif;font-weight:700;
  font-size:clamp(20px,2.4vw,28px);margin:0;color:var(--blue)}
.pj-more p{margin:2px 0 0;font-size:15px;line-height:1.4}
.pj-more-btn{display:inline-flex;align-items:center;gap:16px;min-height:58px;padding:0 10px 0 30px;
  border-radius:999px;background:var(--blue);color:#fff;font-weight:700;font-size:16px;
  text-decoration:none;white-space:nowrap;
  transition:transform .25s cubic-bezier(.34,1.56,.64,1),box-shadow .25s}
.pj-more-btn .arrow{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;
  background:var(--pink);transition:transform .35s cubic-bezier(.34,1.56,.64,1)}
.pj-more-btn:hover{transform:translateY(-3px);box-shadow:4px 5px 0 var(--pink)}
.pj-more-btn:hover .arrow{transform:translateX(4px) rotate(-45deg)}
.pj-more-btn:active{transform:scale(.97);box-shadow:none}

/* Responsive: en pantallas pequeñas se reduce la inclinación y el desnivel */
@media (max-width:1000px){
  .pj-grid{grid-template-columns:repeat(2,minmax(0,1fr));--k:.6}
}
@media (max-width:640px){
  .pj-grid{grid-template-columns:1fr;--k:0}
}
@media (max-width:820px){
  .pj-more{border-radius:36px;padding:24px;flex-direction:column;text-align:center;justify-content:center}
  .pj-more-text{flex-direction:column}
}

@media (prefers-reduced-motion:reduce){
  .pj-star,.pj-sparkle{animation:none}
  .pj-card,.pj-photo img{transition:none}
}
`;
