import { useLayoutEffect, useState } from "react";

const INTRO_SEEN_KEY = 'portfolio:intro-seen';
let introSeen = false;

function hasSeenIntro() {
  try { return introSeen || sessionStorage.getItem(INTRO_SEEN_KEY) === '1'; }
  catch { return introSeen; }
}

/**
 * 인트로(타이틀 애니메이션)가 끝나는 시점을 감지합니다.
 *  - 진행 중: <html class="intro-playing"> (스크롤 잠금)
 *  - 종료 후: <html class="intro-done">    (헤더 → 히어로 순서로 CSS 애니메이션 시작)
 * 타이틀 첫 번째 span의 title-out 애니메이션이 가장 늦게 끝나므로 그 이벤트를 기준으로 합니다.
 */
export default function useIntro() {
  const [introDone, setIntroDone] = useState(hasSeenIntro);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let done = false;
    let fallback;

    // 같은 탭에서는 홈 재방문과 새로고침 시 인트로를 생략합니다.
    if (hasSeenIntro()) {
      html.classList.remove('intro-playing');
      html.classList.add('intro-done', 'intro-skip');
      return () => html.classList.remove('intro-done', 'intro-skip');
    }

    window.scrollTo(0, 0);

    const finish = () => {
      if (done) return;
      done = true;
      introSeen = true;
      try { sessionStorage.setItem(INTRO_SEEN_KEY, '1'); } catch { /* 저장이 차단돼도 현재 방문에서는 유지 */ }
      clearTimeout(fallback);
      html.classList.remove("intro-playing");
      html.classList.add("intro-done");
      setIntroDone(true);
    };

    // 모션 최소화 환경: 애니메이션이 없으므로 즉시 종료
    if (reduced) {
      finish();
      return () => html.classList.remove('intro-playing', 'intro-done');
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
