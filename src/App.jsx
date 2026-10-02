import "./App.css";
import "./index.css";
import "./sections.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Project from "./components/Project";
import Connect from "./components/Connect";
import ToTop from "./components/ToTop";
import Footer from "./components/Footer";
import useIntro from "./hooks/useIntro";
import useReveal from "./hooks/useReveal";

function App() {
  // 인트로(3초) 종료 감지 → <html>에 intro-done → 헤더/히어로 등장
  const introDone = useIntro();
  // 인트로 이후 스크롤 시 [data-reveal] 요소 등장
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
        {/* 반드시 main의 마지막 자식 */}
        <ToTop />
      </main>
      <Footer />
    </>
  );
}

export default App;
