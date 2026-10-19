import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ToTop from '../components/ToTop';
import DetailNav from '../components/DetailNav';
import Icon from '../components/Icon';
import useReveal from '../hooks/usereveal';
import { delay } from '../hooks/reveal';
import { projectDetails } from '../data/balenciaga';

// 상세 페이지 섹션 목차 (id는 아래 각 <section>의 id와 같아야 합니다)
const NAV_ITEMS = [
  { id: 'detail-intro', label: '소개' },
  { id: 'detail-facts', label: '역할' },
  { id: 'detail-features', label: '주요 기능' },
  { id: 'detail-trouble', label: '트러블슈팅' },
];

const Flow = ({ steps, kind }) => (
  <ol className={`flow flow--${kind}`}>
    {steps.map((s, i) => <li key={s}><b>{i + 1}</b>{s}</li>)}
  </ol>
);

function Compare({ m, i }) {
  return (
    <article className="cmp" data-reveal style={delay(i * 0.1)}>
      <h4>{m.label}</h4>
      {[['기존', m.before, 'is-before'], ['개선', m.after, 'is-after']].map(([tag, [text, w], cls]) => (
        <div className="cmp__row" key={tag}>
          <span className="cmp__tag">{tag}</span>
          <div className="cmp__track"><i className={cls} style={{ '--w': `${w}%` }} /></div>
          <em>{text}</em>
        </div>
      ))}
      <p className="cmp__result">{m.result}</p>
    </article>
  );
}

export default function ProjectDetail({ slug }) {
  const d = projectDetails[slug];

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('intro-done'); // 헤더 등장 (인트로 없음)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); // CSS의 smooth 스크롤을 무시하고 즉시 맨 위로
    return () => html.classList.remove('intro-done');
  }, []);
  useReveal(true, 100);

  if (!d) {
    return (
      <>
        <Header />
        <main className="detail"><p className="detail__empty">프로젝트를 찾을 수 없습니다. <Link to="/">홈으로</Link></p></main>
        <Footer />
      </>
    );
  }
  const t = d.trouble;

  return (
    <>
      <Header />
      <main className="detail" id="home">
        <div className="detail-hero__img">
          {d.video ? (
            <video src={d.video} poster={d.poster} autoPlay muted loop playsInline preload="metadata" aria-label={`${d.title} 소개 영상`} />
          ) : (
            d.hero && <img src={d.hero} alt="" />
          )}
        </div>

        <DetailNav items={NAV_ITEMS} />

        <section className="dsec detail-intro" id="detail-intro">
          <nav className="crumb" aria-label="현재 위치" data-reveal><Link to="/">Home</Link> / <Link to="/#project">Project</Link></nav>
          <h1 data-reveal style={delay(0.1)}>{d.title}</h1>
          <p className="detail-intro__sum" data-reveal style={delay(0.2)}>{d.summary}</p>
          <ul className="chip-list" data-reveal style={delay(0.3)}>{d.stack.map((s) => <li className="chip" key={s}>{s}</li>)}</ul>
          <a className="project-row__link" href={d.link.href} target="_blank" rel="noreferrer" data-reveal style={delay(0.4)}>
            <Icon name="link" size={16} />{d.link.label}
          </a>
        </section>

        <section className="dsec facts" id="detail-facts">
          <div data-reveal>
            <h2 className='dh dh--lg is-revealed'>역할</h2>
            <p>{d.role}</p></div>
          <div data-reveal style={delay(0.1)}><h2 className="dh">담당 파트</h2><ul>{d.parts.map((p) => <li key={p}>{p}</li>)}</ul></div>
        </section>

        <section className="dsec" id="detail-features">
          <h2 className="dh dh--lg" data-reveal>{d.featuresTitle}</h2>
          <div className="feat-grid">
            {d.features.map((f, i) => (
              <article className="feat" key={f.title} data-reveal style={delay((i % 2) * 0.1)}>
                <p className="feat__en">{f.en}</p>
                <h3><span>{i + 1}</span>{f.title}</h3>
                <dl>{f.items.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
              </article>
            ))}
          </div>
        </section>

        <section className="dsec" id="detail-trouble">
          <h2 className="dh dh--lg" data-reveal>{t.title}</h2>
          <p className="detail__sub" data-reveal style={delay(0.1)}>{t.subtitle}</p>

          <ul className="kpis">
            {t.kpis.map((k, i) => (
              <li key={k.label} data-reveal style={delay(i * 0.1)}><strong>{k.value}<small>%</small></strong><span>↓ {k.label}</span></li>
            ))}
          </ul>

          <div className="problem" data-reveal><h3>{t.problemTitle}</h3><p>{t.problem}</p></div>

          <div className="cmp-grid">{t.metrics.map((m, i) => <Compare key={m.label} m={m} i={i} />)}</div>
          <p className="cmp-note" data-reveal>막대는 기존 값을 100으로 둔 상대 길이입니다.</p>

          <h3 className="dh dh--md" data-reveal>{t.flowTitle}</h3>
          <div className="flows" data-reveal>
            <div><p className="flows__tag">AS-IS</p><Flow steps={t.asis} kind="asis" /></div>
            <div><p className="flows__tag is-to">TO-BE</p><Flow steps={t.tobe} kind="tobe" /></div>
          </div>

          <div className="steps">
            {t.steps.map(([k, v], i) => (
              <article key={k} data-reveal style={delay(i * 0.1)}><b>{i + 1}</b><h4>{k}</h4><p>{v}</p></article>
            ))}
          </div>

          <div className="outcome" data-reveal><h3>{t.resultTitle}</h3><p>{t.result}</p></div>
        </section>

        <ToTop />
      </main>
      <Footer />
    </>
  );
}
