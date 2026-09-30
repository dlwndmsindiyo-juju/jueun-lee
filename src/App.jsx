import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import "./index.css";
import Header from './components/Header'
import HeroSection from "./components/HeroSection";
import useIntro from './hooks/useIntro';
import useReveal from './hooks/useReveal';

function App() {
  // 인트로 종료 감지 → <html>에 intro-done 클래스 (헤더/히어로 등장 트리거)
    const introDone = useIntro();
    // 인트로 이후 스크롤 시 [data-reveal] 요소 순차 등장
    useReveal(introDone);
  return (
    <>
      <Header />
      <main>
        {/* HeroSection 안에 HeroCarousel + HeroProfile이 이미 들어 있습니다. */}
        <HeroSection />
      </main>
    </>
  );
}

export default App;
