import SectionHead from './SectionHead';
import { delay } from '../hooks/reveal';
import { skills } from '../data/portfolio';

export default function Skills() {
  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <SectionHead id="skills-title" title={skills.title} description={skills.description} />

      <div className="skills-card" data-reveal style={delay(0.2)}>
        <p className="skills-card__label">SKILLS LIST</p>
        {skills.groups.map((group) => (
          <div className="skills-group" key={group.label}>
            <h3 className="skills-group__title">{group.label}</h3>
            <ul className="skill-list">
              {group.items.map((it, i) => (
                <li
                  key={it.name}
                  className={`skill${it.strong ? ' is-strong' : ''}`}
                  style={delay(0.25 + i * 0.05)}
                >
                  <img src={it.icon} alt="" width="22" height="22" />
                  {it.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
