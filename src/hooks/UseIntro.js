import { useEffect, useState } from "react";

/**
 * 인트로(타이틀 애니메이션)가 끝나는 시점을 감지합니다.
 *  - 진행 중: <html class="intro-playing"> (스크롤 잠금)
 *  - 종료 후: <html class="intro-done">    (헤더 → 히어로 순서로 CSS 애니메이션 시작)
 * 타이틀 첫 번째 span의 title-out 애니메이션이 가장 늦게 끝나므로 그 이벤트를 기준으로 합니다.
 */
export default function useIntro() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let done = false;
    let fallback;

    window.scrollTo(0, 0);

    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(fallback);
      html.classList.remove("intro-playing");
      html.classList.add("intro-done");
      setIntroDone(true);
    };

    // 모션 최소화 환경: 애니메이션이 없으므로 즉시 종료
    if (reduced) {
      finish();
      return;
    }

    html.classList.add("intro-playing");
    const target = document.querySelector(
      ".hero-homepage__title span:first-child",
    );
    const onEnd = (e) => {
      if (e.animationName === "title-out") finish();
    };
    target?.addEventListener("animationend", onEnd);
    fallback = setTimeout(finish, 4000); // 안전장치

    return () => {
      clearTimeout(fallback);
      target?.removeEventListener("animationend", onEnd);
      html.classList.remove("intro-playing", "intro-done");
    };
  }, []);

  return introDone;
}
