import Icon from './Icon';
import { delay } from '..hooks/reveal';
import { projects } from '../data/portfolio';

function ProjectRow({ item, reverse }) {
  return (
    <article className={`project-row${reverse ? ' is-reverse' : ''}`}>
      <div className="project-row__media" data-reveal style={delay(0)}>
        {item.image && <img src={item.image} alt={item.imageAlt || ''} loading="lazy" />}
        <a className="project-detail" href={item.detailHref}>Detail</a>
      </div>

      <div className="project-row__body">
        <p className="project-row__subtitle" data-reveal style={delay(0.1)}>{item.subtitle}</p>
        <h3 className="project-row__title" data-reveal style={delay(0.2)}>{item.title}</h3>
        <dl className="project-row__meta" data-reveal style={delay(0.3)}>
          <div><dt>참여 기간</dt><dd>{item.period}</dd></div>
          <div><dt>제작 인원</dt><dd>{item.members}</dd></div>
        </dl>
        <ul className="chip-list project-row__chips" data-reveal style={delay(0.4)}>
          {item.stack.map((s) => <li className="chip" key={s}>{s}</li>)}
        </ul>
        <div data-reveal style={delay(0.5)}>
          <a className="project-row__link" href={item.link.href} target="_blank" rel="noreferrer">
            <Icon name="link" size={16} />{item.link.label}
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Project() {
  let row = 0; // 전체 행 기준으로 이미지 좌/우를 번갈아 배치
  return (
    <section className="section project" id="project" aria-labelledby="project-title">
      <header className="section-head">
        <h2 className="section-head__title" id="project-title" data-reveal style={delay(0)}>{projects.title}</h2>
      </header>

      {projects.groups.map((group) => (
        <div className="project-group" key={group.label}>
          <p className="project-group__label" data-reveal style={delay(0)}>{group.label}</p>
          {group.items.map((item) => {
            const reverse = row++ % 2 === 1;
            return <ProjectRow key={item.title} item={item} reverse={reverse} />;
          })}
        </div>
      ))}
    </section>
  );
}
