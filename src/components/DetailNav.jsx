import { useEffect, useRef, useState } from 'react';
import './DetailNav.css';

const HEADER_H = 90; // 고정 헤더 높이 (App.css의 .site-header__inner height)

/**
 * 프로젝트 상세 페이지 섹션 목차 + 읽기 진행률.
 *  - 스크롤하면 현재 읽는 섹션이 강조되고, 하단 바/링이 진행률만큼 채워집니다.
 *  - 탭을 누르면 해당 섹션으로 이동합니다.
 * items: [{ id: '섹션 요소의 id', label: '탭 글자' }, ...]  (페이지 위→아래 순서)
 */
export default function DetailNav({ items }) {
  const navRef = useRef(null);
  const tabsRef = useRef(null);
  const btnRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [pct, setPct] = useState(0);
  const [pill, setPill] = useState({ x: 4, w: 0 });

  // 스크롤 → 진행률(%) 과 현재 섹션 계산
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const nav = navRef.current;
      const sections = items.map((it) => document.getElementById(it.id)).filter(Boolean);
      if (!nav || !sections.length) return;

      const navH = nav.offsetHeight;
      const y = window.scrollY;
      const top = (el) => el.getBoundingClientRect().top + y;
      const padTop = (el) => parseFloat(getComputedStyle(el).paddingTop) || 0;

      // 진행률: 첫 섹션이 목차 아래에 닿을 때 0%, 마지막 섹션 끝이 화면 하단에 닿을 때 100%
      const start = top(sections[0]) - (HEADER_H + navH);
      const end = sections[sections.length - 1].getBoundingClientRect().bottom + y - window.innerHeight;
      const p = end > start ? Math.min(1, Math.max(0, (y - start) / (end - start))) : 0;
      navRef.current.style.setProperty('--p', p.toFixed(4));
      setPct(Math.round(p * 100));

      // 현재 섹션: 내용 시작점이 목차 바로 아래 기준선을 지난 마지막 섹션
      const line = HEADER_H + navH + 60;
      let idx = 0;
      sections.forEach((s, i) => {
        if (top(s) + padTop(s) - y <= line) idx = i;
      });
      if (p > 0.985) idx = sections.length - 1;
      setActive(idx);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

  // 활성 탭 뒤에서 미끄러지는 알약 위치/너비
  useEffect(() => {
    const measure = () => {
      const b = btnRefs.current[active];
      if (b) setPill({ x: b.offsetLeft, w: b.offsetWidth });
    };
    measure();
    if (!window.ResizeObserver) return;
    const ro = new ResizeObserver(measure);
    ro.observe(tabsRef.current);
    btnRefs.current.forEach((b) => b && ro.observe(b));
    return () => ro.disconnect();
  }, [active, items]);

  const go = (id) => {
    const el = document.getElementById(id);
    const nav = navRef.current;
    if (!el || !nav) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // 섹션 제목이 목차 바로 아래(16px)에 오도록 위치 계산 (섹션 위쪽 padding만큼 보정)
    const padTop = parseFloat(getComputedStyle(el).paddingTop) || 0;
    const top = el.getBoundingClientRect().top + window.scrollY - (HEADER_H + nav.offsetHeight + 16 - padTop);
    window.scrollTo({ top, left: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  const done = pct >= 99;

  return (
    <nav className="detail-nav" ref={navRef} aria-label="프로젝트 상세 목차">
      <div className="detail-nav__inner">
        <div className="detail-nav__tabs" ref={tabsRef}>
          <span
            className="detail-nav__pill"
            aria-hidden="true"
            style={{ width: pill.w, opacity: pill.w ? 1 : 0, transform: `translateX(${pill.x}px)` }}
          />
          {items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              ref={(el) => (btnRefs.current[i] = el)}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => go(it.id)}
            >
              {it.label}
            </button>
          ))}
        </div>

        <span
          className={`detail-nav__ring${done ? ' is-done' : ''}`}
          role="progressbar"
          aria-label="읽은 정도"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        >
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <circle className="t" cx="24" cy="24" r="20" />
            <circle className="p" cx="24" cy="24" r="20" pathLength="100" />
          </svg>
          <span aria-hidden="true">{pct}%</span>
          <i aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M6 12.5l4 4L18 8" /></svg>
          </i>
        </span>
      </div>
      <span className="detail-nav__bar" aria-hidden="true" />
    </nav>
  );
}
