import { useEffect } from "react";
import { Routes, Route, useLocation, useParams, Navigate } from "react-router-dom";
import "./App.css";
import "./index.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Project from "./components/Project";
import Connect from "./components/Connect";
import ToTop from "./components/ToTop";
import Footer from "./components/Footer";
import ProjectDetail from "./pages/ProjectDetail";
import useIntro from "./hooks/useIntro";
import useReveal from "./hooks/usereveal";

function Home() {
  const introDone = useIntro();
  useReveal(introDone);
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <Skills />
        <Education />
        <Project />
        <Connect />
        <ToTop />
      </main>
      <Footer />
    </>
  );
}

// URL 파라미터(:slug)를 읽어서 ProjectDetail에 prop으로 전달
function ProjectDetailRoute() {
  const { slug } = useParams();
  return <ProjectDetail slug={slug} />;
}

// 페이지 이동 시: 해시(#project 등)가 있으면 해당 섹션으로, 없으면 맨 위로
function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 0);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, key]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectDetailRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
