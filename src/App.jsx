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
import useReveal from "./hooks/useReveal";

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

// 서브페이지는 ?project=balenciaga 형태 (라우터 설치 불필요, 정적 호스팅에서도 동작)
export default function App() {
  const slug = new URLSearchParams(window.location.search).get("project");
  return slug ? <ProjectDetail slug={slug} /> : <Home />;
}
