import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/Projectdetail";
import ScrollToTop from "./pages/ScrollToTop";
import Contact from "./pages/Contact";
import Cursor from "./pages/Cursor";
import Intro from "./pages/Intro";

/* Página principal.
   `revealed` llega desde App: el Hero solo se monta cuando la intro
   empieza a abrirse, así sus animaciones arrancan en ese momento. */
function Home({ revealed }) {
  return (
    <>
      <div id="home">{revealed && <Hero />}</div>
      <About />
      <Projects />
      <Contact />
    </>
  );
}

export default function App() {
  // Vive aquí (y no en Home) para que la intro no se repita
  // cuando vuelves del detalle de un proyecto a la página principal.
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      <style>{css}</style>

      <Cursor />
      <Intro onReveal={() => setRevealed(true)} />
      <ScrollToTop />

      <Routes>
        {/* "/" → página principal */}
        <Route path="/" element={<Home revealed={revealed} />} />
        {/* "/projects/grapy", "/projects/project-2"... → página de cada proyecto */}
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </>
  );
}

const css = `
html{scroll-behavior:smooth}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
`;
