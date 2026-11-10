import { useEffect } from 'react';

// 스크롤 등장 효과가 끝난 뒤에 하이라이트를 재생합니다.
export default function useScrollHighlight(scopeRef, selector) {
  useEffect(() => {
    const words = scopeRef.current?.querySelectorAll(selector) ?? [];
    if (!('IntersectionObserver' in window)) {
      words.forEach((word) => word.classList.add('is-on'));
      return;
    }
    const visible = new Set();
    const timers = new Map();
    const startVisible = () => {
      if (document.documentElement.classList.contains('intro-playing')) return;
      visible.forEach((word) => {
        const reveal = word.closest('[data-reveal]');
        if (timers.has(word) || (reveal && !reveal.classList.contains('is-revealed'))) return;
        const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
        const style = reveal && getComputedStyle(reveal);
        const duration = style ? parseFloat(style.transitionDuration) || 0 : 0;
        const delay = style ? parseFloat(style.transitionDelay) || 0 : 0;
        timers.set(word, setTimeout(() => {
          timers.delete(word);
          if (!visible.has(word)) return;
          visible.delete(word);
          observer.unobserve(word);
          word.classList.add('is-on');
        }, reduced ? 0 : (duration + delay) * 1000));
      });
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) visible.add(target);
        else visible.delete(target);
      });
      startVisible();
    }, { rootMargin: '0% 0% -12% 0%' });
    words.forEach((word) => observer.observe(word));
    const revealObserver = new MutationObserver(startVisible);
    revealObserver.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['class'] });
    return () => {
      observer.disconnect();
      revealObserver.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [scopeRef, selector]);
}
