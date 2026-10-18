import Reveal from "./Reveal";

/* Iconos en SVG (estilo línea) para no depender de librerías */
const Icon = ({ children, size = 28, ...p }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    {children}
  </svg>
);

const ICONS = {
  star: (
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  ),
  user: (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  pen: (
    <>
      <path d="m12 19 7-7 3 3-7 7-3-3z" />
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="m2 2 7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </>
  ),
  book: (
    <>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
};

/* Estrellita rosa con halo blanco que gira (se usa en los títulos) */
const StarBadge = ({ size = 76 }) => (
  <svg
    className="spin-star"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M12 1C13 8 16 11 23 12C16 13 13 16 12 23C11 16 8 13 1 12C8 11 11 8 12 1Z"
      fill="#f07ad8"
      stroke="#fff"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const FEATURES = [
  {
    icon: "star",
    title: "Creative",
    text: "I love bringing ideas to life through clean visuals, thoughtful details and user centered design",
  },
  {
    icon: "user",
    title: "User Focused",
    text: "I design with empathy and always think about how users feel and interact",
  },
  {
    icon: "pen",
    title: "Problem Solver",
    text: "I enjoy challenges and finding simple, effective solutions to complex problems",
  },
  {
    icon: "book",
    title: "Always Learning",
    text: "I’m constantly exploring new tools, trends and ways to grow as a designer",
  },
];

const SKILLS = [
  {
    icon: "monitor",
    title: "Design",
    items: ["Figma", "Adobe Creative Suite", "Canva", "Notion"],
  },
  {
    icon: "code",
    title: "Development",
    items: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    icon: "star",
    title: "Other",
    items: ["UI Design", "UX Research", "Prototyping", "Wireframing"],
  },
];

export default function About() {
  return (
    <>
      <style>{css}</style>

      <section id="about" className="about">
        {/* ---- Tarjeta About me ---- */}
        <Reveal>
          <div className="about-card">
            <div className="about-left">
              <div className="about-head">
                <StarBadge />
                <h2>About me</h2>
              </div>
              <p>
                I’m a passionate UX/UI designer who loves creating meaningful
                and beautiful digital experiences.
              </p>
              <p>
                I enjoy turning ideas into clean, user-friendly designs that
                solve real problems and make people’s lives easier.
              </p>
            </div>

            <span className="divider" aria-hidden="true" />

            <div className="features">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={200 + i * 130}>
                  <article className="feature">
                    <div className="feature-head">
                      <span className="tile">
                        <Icon>{ICONS[f.icon]}</Icon>
                      </span>
                      <h3>{f.title}</h3>
                    </div>
                    <p>{f.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ---- Skills & Tools ---- */}
        <Reveal>
          <div className="about-head skills-head">
            <StarBadge size={60} />
            <h2>Skills &amp; Tools</h2>
          </div>
        </Reveal>

        <div className="skills">
          {SKILLS.map((s, i) => (
            <Reveal key={s.title} delay={i * 150}>
              <div className="skill-card">
                <h3>
                  <Icon size={30} className="skill-icon">
                    {ICONS[s.icon]}
                  </Icon>
                  {s.title}
                </h3>
                <ul>
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

const css = `
.about{--blue:#1a0cf0;--pink:#f07ad8;--pink-soft:#fbe3f4;
  max-width:1200px;margin:0 auto;padding:40px 5vw 80px;color:var(--blue);
  font-family:"Nunito",system-ui,sans-serif;scroll-margin-top:16px}
.about h2,.about h3{font-family:"Fredoka","Baloo 2",system-ui,sans-serif;margin:0}
.about p{margin:0;line-height:1.6}

/* Títulos grandes: azul + Fredoka (más específico para ganarle a estilos globales) */
.about .about-head{display:flex;align-items:center;gap:14px;margin-bottom:24px}
.about .about-head h2{font-family:"Fredoka","Baloo 2",system-ui,sans-serif;font-weight:700;
  font-size:clamp(32px,4vw,48px);color:var(--blue);margin:0}
.about .skills-head{margin:56px 0 24px}

/* Reveal (por si no está definido en otro lado) */
.about .reveal{opacity:0;transform:translateY(40px) scale(.97);
  transition:opacity .6s ease-out,transform .7s cubic-bezier(.34,1.56,.64,1)}
.about .reveal.in{opacity:1;transform:none}

/* Tarjeta grande */
.about-card{display:grid;grid-template-columns:1fr 2px 1.7fr;gap:clamp(24px,4vw,56px);
  background:#fdf1ef;border:1.5px solid var(--pink);border-radius:clamp(36px,6vw,64px);
  padding:clamp(28px,5vw,64px)}
.about-left{display:flex;flex-direction:column;gap:20px}
.about-left p{font-size:clamp(15px,1.4vw,17px)}
@keyframes spin{to{transform:rotate(360deg)}}

.divider{background:linear-gradient(var(--pink),var(--pink-soft));border-radius:2px;opacity:.7}

/* Rasgos 2x2 */
.features{display:grid;grid-template-columns:1fr 1fr;gap:32px clamp(24px,4vw,56px)}
.feature-head{display:flex;align-items:center;gap:16px;margin-bottom:14px}
.feature h3{font-size:clamp(20px,2vw,26px);font-weight:700;line-height:1.15;color:var(--blue)}
.feature p{font-size:clamp(14px,1.3vw,16px)}
.tile{flex:none;display:grid;place-items:center;width:60px;height:60px;border-radius:16px;
  background:var(--pink-soft);border:1.5px solid var(--pink);
  transition:transform .3s cubic-bezier(.34,1.56,.64,1),background .2s}
.feature:hover .tile{transform:rotate(-10deg) scale(1.12);background:var(--pink)}
.feature:hover .tile svg{color:#fff}
.tile svg{transition:color .2s}

/* Skills */
.skills{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
.skill-card{height:100%;background:rgba(247,182,230,.16);border:1.5px solid var(--pink);
  border-radius:28px;padding:22px 24px 26px;
  transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s}
.skill-card:hover{transform:translateY(-6px);box-shadow:5px 7px 0 var(--pink)}
.skill-card h3{display:flex;align-items:center;gap:14px;font-size:20px;font-weight:600;
  margin-bottom:18px;color:var(--blue)}
.skill-icon{color:var(--pink)}
.skill-card ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:10px}
.skill-card li{padding:5px 18px;border:1.5px solid var(--pink);border-radius:999px;
  background:#fff;font-size:14px;font-weight:700;cursor:default;
  transition:transform .2s cubic-bezier(.34,1.56,.64,1),background .2s,color .2s}

/* Responsive */
@media (max-width:860px){
  .about-card{grid-template-columns:1fr}
  .divider{height:2px;width:100%}
}
@media (max-width:560px){.features{grid-template-columns:1fr}}

@media (prefers-reduced-motion:reduce){
  .spin-star{animation:none}
  .about .reveal{opacity:1;transform:none;transition:none}
}
`;
