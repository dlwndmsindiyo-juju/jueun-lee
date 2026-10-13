import { Link } from 'react-router-dom';
import Icon from './Icon';
import SectionHead from './SectionHead';
import { projects } from '../data/portfolio';
import { projectDetails } from '../data/balenciaga';

// portfolio.js의 detailHref("?project=slug" 또는 "/project/slug")에서 slug를 뽑습니다.
// → 데이터 파일은 수정하지 않아도 됩니다.
function getSlug(item) {
  const href = item.detailHref || '';
  const fromQuery = new URLSearchParams(href.split('?')[1] || '').get('project');
  if (fromQuery) return fromQuery;
  const match = href.match(/\/project\/([^/?#]+)/);
  return match ? match[1] : null;
}

function getImage(item) {
  const slug = getSlug(item);
  return projectDetails[slug]?.cardImage || item.image;
}

function ProjectRow({ item, reverse }) {
  // 이미지/본문이 서로 반대 방향에서 들어옵니다.
  const [mediaSide, bodySide] = reverse ? ['right', 'left'] : ['left', 'right'];
  const image = getImage(item);
  const slug = getSlug(item);
  // 주소가 없거나 '#'이면 '홈페이지 보러가기' 버튼을 숨깁니다.
  const hasLink = Boolean(item.link?.href) && item.link.href !== '#';
  return (
    <article id={item.id} className={`project-row${reverse ? ' is-reverse' : ''}`}>
      <div className="project-row__media" data-reveal={mediaSide}>
        {image && <img src={image} alt={item.imageAlt || ''} loading="lazy" />}
        {slug && (
          <Link className={`project-detail${image ? ' on-media' : ''}`} to={`/project/${slug}`}>
            <span>Detail</span>
            <svg viewBox="0 0 300 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M0 1H298L284 13" />
            </svg>
          </Link>
        )}
      </div>

      <div className="project-row__body" data-reveal={bodySide}>
        <p className="project-row__subtitle">{item.subtitle}</p>
        <h3 className="project-row__title">{item.title}</h3>
        <dl className="project-row__meta">
          <div><dt>참여 기간</dt><dd>{item.period}</dd></div>
          <div><dt>제작 인원</dt><dd>{item.members}</dd></div>
        </dl>
        {item.stack?.length > 0 && (
          <ul className="chip-list project-row__chips">
            {item.stack.map((s) => <li className="chip" key={s}>{s}</li>)}
          </ul>
        )}
        {hasLink && (
          <div>
            <a className="project-row__link" href={item.link.href} target="_blank" rel="noreferrer">
              <Icon name="link" size={16} />{item.link.label}
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Project() {
  let row = 0; // 전체 행 기준으로 이미지 좌/우를 번갈아 배치
  return (
    <section className="section project" id="project" aria-labelledby="project-title">
      <SectionHead id="project-title" title={projects.title} />

      {projects.groups.map((group) => (
        <div className="project-group" key={group.label}>
          <p className="project-group__label">{group.label}</p>
          {group.items.map((item) => {
            const reverse = row++ % 2 === 1;
            return <ProjectRow key={item.title} item={item} reverse={reverse} />;
          })}
        </div>
      ))}
    </section>
  );
}
