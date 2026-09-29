import { useEffect } from 'react';

/**
 * [data-reveal] 요소를 스크롤로 화면에 들어올 때 순서대로 나타냅니다.
 * enabled(인트로 종료)가 true가 된 뒤, 히어로 등장 애니메이션이 끝날 때까지
 * 기다렸다가 관찰을 시작합니다.
 */
export default function useReveal(enabled, startDelay = 1800) {
  useEffect(() => {
    if (!enabled) return;
    let io;
    const timer = setTimeout(() => {
      io = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }),
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
      );
      document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    }, startDelay);
    return () => { clearTimeout(timer); io?.disconnect(); };
  }, [enabled, startDelay]);
}