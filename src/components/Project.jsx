import { Link } from 'react-router-dom';
import Icon from './Icon';
import SectionHead from './SectionHead';
import { delay } from '../hooks/reveal';
import { projects } from '../data/portfolio';
import './ProjectCard.css';

// portfolio.js의 detailHref("?project=slug" 또는 "/project/slug")에서 slug를 뽑습니다.
function getSlug(item) {
  const href = item.detailHref || '';
  const fromQuery = new URLSearchParams(href.split('?')[1] || '').get('project');
  if (fromQuery) return fromQuery;
  const match = href.match(/\/project\/([^/?#]+)/);
  return match ? match[1] : null;
}

const MAX_CHIPS = 6;

// 카드뉴스처럼 카드마다 한 가지 색 바탕 + 글자색 (bg: 배경, fg: 글자)
const PALETTE = [
  { bg: '#141414', fg: '#f4f0ea' },
  { bg: '#d9e4f7', fg: '#14213d' },
  { bg: '#f6d5c3', fg: '#3a1d12' },
  { bg: '#e4ebd0', fg: '#1f2a12' },
];

function ProjectCard({ item, index, order }) {
  const slug = getSlug(item);
  const hasLink = Boolean(item.link?.href) && item.link.href !== '#';
  const stack = item.stack || [];
  const shown = stack.slice(0, MAX_CHIPS);
  const rest = stack.length - shown.length;
  const color = PALETTE[index % PALETTE.length];

  return (
    <div className="pcard-wrap" data-reveal style={delay((order % 2) * 0.12)}>
      <article id={item.id} className="pcard" style={{ '--bg': color.bg, '--fg': color.fg }}>
        <h4 className="pcard__title">{item.title}</h4>

        {/* 호버하면 이미지만 살짝 커집니다 */}
        <div className="pcard__art" aria-hidden="true">
          {item.image ? (
            <img src={item.image} alt="" loading="lazy" draggable={false} />
          ) : (
            <span className="pcard__ghost">{item.title}</span>
          )}
        </div>

        <div className="pcard__body">
          <p className="pcard__k">{item.period} · {item.members}</p>
          <p className="pcard__sum">{item.subtitle}</p>

          {shown.length > 0 && (
            <ul className="pcard__chips">
              {shown.map((s) => <li key={s}>{s}</li>)}
              {rest > 0 && <li className="is-more">+{rest}</li>}
            </ul>
          )}

          <div className="pcard__foot">
            {hasLink && (
              <a className="pcard__ext" href={item.link.href} target="_blank" rel="noreferrer">
                <Icon name="link" size={15} />{item.link.label}
              </a>
            )}
            {slug ? (
              <Link className="pcard__cta" to={`/project/${slug}`}>
                Detail
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
              </Link>
            ) : (
              <span className="pcard__soon">상세 페이지 준비 중</span>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

// '01 / TEAM PROJECT' → '1. TEAM PROJECT'
function groupTitle(label) {
  const m = label.match(/^0*(\d+)\s*\/\s*(.+)$/);
  return m ? `${m[1]}. ${m[2]}` : label;
}

export default function Project() {
  let n = 0; // 전체 카드 순서 (색상 배정용)
  return (
    <section className="section project project--cards" id="project" aria-labelledby="project-title">
      <SectionHead id="project-title" title={projects.title} />

      {projects.groups.map((group) => (
        <div className="project-group" key={group.label}>
          <h3 className="project-group__title" data-reveal style={delay(0)}>
            {groupTitle(group.label)}
          </h3>
          <div className="project-grid">
            {group.items.map((item, i) => (
              <ProjectCard key={item.id || item.title} item={item} index={n++} order={i} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
