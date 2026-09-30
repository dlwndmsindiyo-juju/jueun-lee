import SectionHead from './SectionHead';
import Icon from './Icon';
import { delay } from '..hooks/reveal';
import { education as edu } from '../data/portfolio';

export default function Education() {
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
        <ul className="edu-card__list" data-reveal style={delay(0.55)}>
          {edu.achievements.map((text, i) => <li key={i}>{text}</li>)}
        </ul>

        <h4 className="edu-card__heading" data-reveal style={delay(0.6)}>
          <Icon name="book" size={18} />{edu.skillsTitle}
        </h4>
        <ul className="chip-list edu-card__chips" data-reveal style={delay(0.65)}>
          {edu.skills.map((s) => <li className="chip" key={s}>{s}</li>)}
        </ul>
      </article>
    </section>
  );
}
