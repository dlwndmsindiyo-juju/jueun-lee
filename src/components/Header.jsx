import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import hamIcon from '../assets/ham.svg';

const MENUS = [
  ['home', 'Home'],
  ['skills', 'Skills'],
  ['education', 'Education'],
  ['project', 'Project'],
  ['connect', 'Connect'],
];

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  // 상세 페이지에서는 Project 메뉴를 활성화
  const [activeId, setActiveId] = useState(isHome ? 'home' : 'project');

  // 홈에서만: 각 섹션이 화면에 보이면 해당 메뉴에 is-active 표시
  useEffect(() => {
    if (!isHome) return;
    const sections = MENUS.map(([id]) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = 140;
      let current = 'home';
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      });
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = 'connect';
      setActiveId(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isHome]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-header__logo" to="/">JUEUN LEE</Link>

        <nav
          className={`site-header__nav${open ? ' is-open' : ''}`}
          aria-label="주 메뉴"
          id="site-nav-menu"
        >
          <ul>
            {MENUS.map(([id, label]) => (
              <li key={id}>
                <Link
                  to={id === 'home' ? '/' : `/#${id}`}
                  className={(isHome ? activeId : 'project') === id ? 'is-active' : undefined}
                  aria-current={(isHome ? activeId : 'project') === id ? 'location' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="site-nav-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? '메뉴 닫기' : '메뉴 열기'}</span>
          {open ? (
            <svg viewBox="0 0 21 21" fill="none" aria-hidden="true">
              <path d="M5.5 5.5l10 10M15.5 5.5l-10 10" stroke="white" strokeLinecap="round" />
            </svg>
          ) : (
            <img src={hamIcon} alt="" />
          )}
        </button>
      </div>
    </header>
  );
}
