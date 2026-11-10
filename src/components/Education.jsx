import { useRef } from 'react';
import useScrollHighlight from '../hooks/useScrollHighlight';
import SectionHead from './SectionHead';
import Icon from './Icon';
import { delay } from '../hooks/reveal';
import { education as edu } from '../data/portfolio';

export default function Education() {
  const listRef = useRef(null);

  useScrollHighlight(listRef, '.edu-hl');

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
