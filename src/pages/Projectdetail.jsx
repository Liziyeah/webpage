import { useParams, Link, Navigate } from "react-router-dom";
import Reveal from "./Reveal";
import { PROJECTS } from "../Projects";

export default function ProjectDetail() {
  // `slug` es la parte final de la dirección: /projects/grapy → "grapy"
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  // Si el proyecto no existe, vuelve al inicio
  if (!project) return <Navigate to="/" replace />;

  return (
    <>
      <style>{css}</style>

      <div className="pd-checker" aria-hidden="true" />

      <main className="pd">
        <Link className="pd-back" to="/#projects">
          ← Back to projects
        </Link>

        <Reveal>
          <h1>{project.title}</h1>
        </Reveal>

        <ul className="pd-tags">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        {project.image && (
          <Reveal>
            <img className="pd-img" src={project.image} alt={project.title} />
          </Reveal>
        )}

        <Reveal>
          <p className="pd-text">
            {project.intro ||
              project.text ||
              "Pronto: aquí irá la descripción de este proyecto."}
          </p>
        </Reveal>

        {project.gallery?.map((img, i) => (
          <Reveal key={i}>
            <img
              className="pd-img"
              src={img}
              alt={`${project.title} ${i + 1}`}
            />
          </Reveal>
        ))}

        {project.link && (
          <Reveal>
            <a
              className="pd-cta"
              href={project.link}
              target="_blank"
              rel="noreferrer"
            >
              View prototype
            </a>
          </Reveal>
        )}
      </main>
    </>
  );
}

const css = `
/* Esta página no incluye el Hero, así que necesita su propio fondo y reset */
:root{color-scheme:light}
html,body{margin:0;width:100%;background:#fff8f3}
body{display:block;place-items:unset;min-width:0;overflow-x:hidden}
#root{max-width:none;width:100%;margin:0;padding:0;text-align:left;border:0}

.pd-checker{height:28px;
  background:repeating-conic-gradient(#f7b6e6 0 25%,#fff 0 50%) 0 0/28px 28px;
  animation:pd-slide 4s linear infinite}
@keyframes pd-slide{to{background-position:56px 0}}

.pd{max-width:900px;margin:0 auto;padding:40px 5vw 96px;color:#1a0cf0;
  font-family:"Nunito",system-ui,sans-serif}
.pd h1{font-family:"Fredoka","Baloo 2",system-ui,sans-serif;font-weight:700;
  font-size:clamp(36px,6vw,64px);line-height:1.1;margin:24px 0 14px;color:#1a0cf0}

.pd-back{display:inline-block;color:#1a0cf0;text-decoration:none;font-weight:700;
  transition:transform .2s}
.pd-back:hover{transform:translateX(-5px)}

.pd-tags{list-style:none;margin:0 0 28px;padding:0;display:flex;flex-wrap:wrap;gap:8px}
.pd-tags li{padding:3px 14px;border:1.5px solid #f07ad8;border-radius:999px;background:#fff;
  font-size:13px;font-weight:700}

.pd-img{display:block;width:100%;margin-bottom:28px;border:2px solid #1a0cf0;border-radius:24px;
  box-shadow:5px 6px 0 #9b4f8f}
.pd-text{max-width:680px;margin:0 0 28px;line-height:1.7;font-size:17px}

.pd-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 32px;
  border-radius:999px;background:#f07ad8;color:#fff;font-weight:700;text-decoration:none;
  transition:transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .2s}
.pd-cta:hover{transform:translateY(-3px) scale(1.04);box-shadow:3px 4px 0 #9b4f8f}

@media (prefers-reduced-motion:reduce){.pd-checker{animation:none}}
`;
