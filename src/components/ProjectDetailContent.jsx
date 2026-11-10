import { Link } from 'react-router-dom';
import DetailNav from './DetailNav';
import WebsiteLink from './WebsiteLink';
import './ProjectDetailContent.css';

const NAV_ITEMS = [
  { id: 'detail-intro', label: '프로젝트 소개', mobileLabel: '소개' },
  { id: 'detail-role', label: '담당한 작업', mobileLabel: '담당' },
  { id: 'detail-process', label: '문제 해결 과정', mobileLabel: '문제 해결' },
  { id: 'detail-next', label: '보완할 점', mobileLabel: '보완' },
];

// 모든 프로젝트가 공유하는 상세 레이아웃. 프로젝트별 내용은 data에서 전달합니다.
export default function ProjectDetailContent({ project }) {
  return (
    <main className="case-study" id="home">
      <DetailNav items={NAV_ITEMS} />
      <section className="case-study__intro case-study__inner" id="detail-intro">
        <nav className="case-study__breadcrumb" aria-label="현재 위치">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li aria-current="page">{project.breadcrumb || project.title.split(' / ')[0]}</li>
          </ol>
        </nav>
        <p className="case-study__kicker">{project.kicker}</p>
        <h1>{project.title}</h1>
        <p className="case-study__summary">{project.summary}</p>
        <ul className="case-study__stack" aria-label="사용 기술">
          {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
        </ul>
        <WebsiteLink link={project.link} className="case-study__website-link" />
        <img className="case-study__image" src={project.image} alt={`${project.title} 대표 이미지`} />
      </section>
      <section className="case-study__role case-study__inner" id="detail-role">
        <h2>담당한 작업</h2>
        <p>{project.role}</p>
        {project.duties.length > 0 && <>
          <h3>주요 작업</h3>
          <ul>{project.duties.map((duty) => <li key={duty}>{duty}</li>)}</ul>
        </>}
      </section>
      <section id="detail-process" className="case-study__process">
        <div className="case-study__process-intro case-study__inner">
          <h2>문제 해결 과정</h2>
          <p>{project.processFlow || '문제 → 원인 분석 → 해결 방법 → 검증 → 배운 점'}</p>
          <p>{project.processDescription || '역할 설명보다 원인을 좁혀간 판단과 해결 과정, 배운 점을 중심으로 읽을 수 있도록 구성했습니다.'}</p>
        </div>
        {project.cases.map((item, index) => (
          <article className="case-study__case" key={item.title}>
            <div className="case-study__inner">
              <h3><span>{String(index + 1).padStart(2, '0')}</span> {item.title}</h3>
              <dl>{item.steps.map(([label, body]) => (
                <div className="case-study__step" key={label}><dt>{label}</dt><dd>{body}</dd></div>
              ))}</dl>
              <aside className="case-study__lesson">
                <h4>{project.lessonLabel || '이 경험에서 배운 점'}</h4>
                <p>{item.lesson}</p>
              </aside>
              {item.details?.length > 0 && <details className="case-study__details">
                <summary>관련 코드와 확인 항목</summary>
                <dl>{item.details.map(([label, body]) => (
                  <div className="case-study__step" key={label}><dt>{label}</dt><dd>{body}</dd></div>
                ))}</dl>
              </details>}
            </div>
          </article>
        ))}
      </section>
      <section className="case-study__next case-study__inner" id="detail-next">
        <h2>더 개선할 부분</h2>
        <p>{project.nextSummary || '증상을 재현하고, 원인을 분리해서 확인하고, 선택한 해결 방법을 검증하는 순서로 기록합니다. 같은 문제가 반복되지 않도록 공통 구조와 확인 기준을 남깁니다.'}</p>
        <Link to="/#project">프로젝트 섹션으로 돌아가기</Link>
      </section>
    </main>
  );
}
