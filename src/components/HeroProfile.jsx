import { delay } from '../hooks/reveal';

const CHIPS = ['HTML', 'CSS', 'JavaScript', 'React', 'Open AI'];

// 키워드 알약: 스크롤로 보이면 d초 간격으로 하나씩 등장
const Pill = ({ d, children }) => (
  <div data-reveal style={delay(d)}>
    <div className="hero-pill-tag">{children}</div>
  </div>
);

export default function HeroProfile() {
  return (
    <section className="hero-bottom-section">
      <div className="hero-bottom-tags">
        <Pill d={0}>Frontend Developer</Pill>
        <div className="hero-pill-row">
          <Pill d={0.2}>UI Design</Pill>
          <Pill d={0.4}>UX Research</Pill>
        </div>
        <Pill d={0.6}>Publishing</Pill>
      </div>

      <div className="hero-profile-container" data-reveal style={delay(0)}>
        <div className="hero-profile-subtitle">PORTFOLIO / 2026</div>
        <div className="hero-profile-desc-top">
          관찰하고 분석하여 사용자의 니즈를 파악합니다.
        </div>

        <h2 className="hero-profile-name">이주은</h2>

        <p className="hero-profile-desc-main">
          흐름을 읽어내는 관찰력과, 마주한 문제를 끝까지 해결하는 집요함으로
          서비스의 성장을 뒷받침하는 프론트엔드 개발자입니다.
        </p>

        <div className="hero-profile-meta">
          <span>1998/11/23</span>
          <span>Seoul</span>
        </div>

        <div className="hero-tech-chips">
          {CHIPS.map((chip) => (
            <span className="tech-chip" key={chip}>{chip}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
