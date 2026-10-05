import { useEffect } from 'react';
import '../detail.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ToTop from '../components/ToTop';
import Icon from '../components/Icon';
import useReveal from '../hooks/useReveal';
import { delay } from '../hooks/reveal';
import { projectDetails } from '../data/balenciaga';

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
  const base = window.location.pathname;

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('intro-done'); // 헤더 등장 (인트로 없음)
    window.scrollTo(0, 0);
    return () => html.classList.remove('intro-done');
  }, []);
  useReveal(true, 100);

  if (!d) {
    return (
      <>
        <Header base={base} />
        <main className="detail"><p className="detail__empty">프로젝트를 찾을 수 없습니다. <a href={base}>홈으로</a></p></main>
        <Footer base={base} />
      </>
    );
  }
  const t = d.trouble;

  return (
    <>
      <Header base={base} />
      <main className="detail" id="home">
        <div className="detail-hero__img">
          {d.video ? (
            <video src={d.video} autoPlay muted loop playsInline preload="metadata" aria-label={`${d.title} 소개 영상`} />
          ) : (
            d.hero && <img src={d.hero} alt="" />
          )}
        </div>

        <section className="dsec detail-intro">
          <nav className="crumb" aria-label="현재 위치" data-reveal><a href={base}>Home</a> / <a href={`${base}#project`}>Project</a></nav>
          <h1 data-reveal style={delay(0.1)}>{d.title}</h1>
          <p className="detail-intro__sum" data-reveal style={delay(0.2)}>{d.summary}</p>
          <ul className="chip-list" data-reveal style={delay(0.3)}>{d.stack.map((s) => <li className="chip" key={s}>{s}</li>)}</ul>
          <a className="project-row__link" href={d.link.href} target="_blank" rel="noreferrer" data-reveal style={delay(0.4)}>
            <Icon name="link" size={16} />{d.link.label}
          </a>
        </section>

        <section className="dsec facts">
          <div data-reveal><h2 className="dh">담당 역할</h2><p>{d.role}</p></div>
          <div data-reveal style={delay(0.1)}><h2 className="dh">담당 파트</h2><ul>{d.parts.map((p) => <li key={p}>{p}</li>)}</ul></div>
        </section>

        <section className="dsec">
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

        <section className="dsec">
          <h2 className="dh dh--lg" data-reveal>{t.title}</h2>
          <p className="detail__sub" data-reveal style={delay(0.1)}>{t.subtitle}</p>

          <ul className="kpis">
            {t.kpis.map((k, i) => (
              <li key={k.label} data-reveal style={delay(i * 0.1)}><strong>{k.value}<small>%</small></strong><span>↓ {k.label}</span></li>
            ))}
          </ul>

          <div className="problem" data-reveal><h3>{t.problemTitle}</h3><p>{t.problem}</p></div>

          <div className="cmp-grid">{t.metrics.map((m, i) => <Compare key={m.label} m={m} i={i} />)}</div>
          <p className="cmp-note">막대는 기존 값을 100으로 둔 상대 길이입니다.</p>

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
      <Footer base={base} />
    </>
  );
}
