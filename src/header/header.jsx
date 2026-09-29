import { useEffect, useState } from 'react';

const MENUS = [
  ['home', 'Home'],
  ['skills', 'Skills Ability'],
  ['education', 'Education'],
  ['project', 'Project'],
  ['connect', 'Connect'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  // 각 섹션이 화면에 보이면 해당 메뉴에 is-active 표시
  useEffect(() => {
    const sections = MENUS.map(([id]) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-header__logo" href="#home">JUEUN LEE</a>

        <nav
          className={`site-header__nav${open ? ' is-open' : ''}`}
          aria-label="주 메뉴"
          id="site-nav-menu"
        >
          <ul>
            {MENUS.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={activeId === id ? 'is-active' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
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
          <span className="sr-only">메뉴 열기</span>
          <span className="site-header__toggle-bar" />
        </button>
      </div>
    </header>
  );
}