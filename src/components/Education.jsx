import { useEffect, useRef } from 'react';
import SectionHead from './SectionHead';
import Icon from './Icon';
import { delay } from '../hooks/reveal';
import { education as edu } from '../data/portfolio';

export default function Education() {
  const listRef = useRef(null);

  // 스크롤로 각 줄이 화면에 들어오면 is-on 을 붙여 배경이 왼쪽 → 텍스트 끝으로 펼쳐집니다.
  useEffect(() => {
    const items = listRef.current?.querySelectorAll('.edu-hl') ?? [];
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-on'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-on'); io.unobserve(e.target); }
      }),
      { rootMargin: '0px 0px -12% 0px' }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section education" id="education" aria-labelledby="education-title">
      <SectionHead id="education-title" title={edu.title} description={edu.description} />

      <article className="edu-card" data-reveal style={delay(0.2)}>
        <div className="edu-card__org" data-reveal style={delay(0.3)}>
          <Icon name="cap" size={22} />
          <strong>{edu.org}</strong>
          <span className="edu-card__badge">{edu.badge}</span>
        </div>
        <h3 className="edu-card__course" data-reveal style={delay(0.4)}>{edu.course}</h3>
        <p className="edu-card__meta" data-reveal style={delay(0.45)}>
          <span><Icon name="pin" size={18} />{edu.location}</span>
          <span><Icon name="calendar" size={18} />{edu.period}</span>
        </p>

        <h4 className="edu-card__heading" data-reveal style={delay(0.5)}>
          <Icon name="trend" size={18} />{edu.achievementsTitle}
        </h4>

        {/* 불릿 없이, 스크롤로 보이면 텍스트 뒤에 색 배경이 깔립니다 */}
        <ul className="edu-card__list is-armed" ref={listRef}>
          {edu.achievements.map((text, i) => (
            <li key={i}>
              <span className="edu-hl" style={{ transitionDelay: `${i * 0.06}s` }}>{text}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
