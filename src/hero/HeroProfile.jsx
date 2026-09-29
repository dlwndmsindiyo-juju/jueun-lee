const CHIPS = ['HTML', 'CSS', 'JavaScript', 'React', 'Open AI'];

export default function HeroProfile() {
  return (
    <section className="hero-bottom-section">
      {/* 둥근 플로팅 알약 태그들 */}
      <div className="hero-bottom-tags">
        <div className="hero-pill-tag">Frontend Developer</div>
        <div className="hero-pill-row">
          <div className="hero-pill-tag">UI Design</div>
          <div className="hero-pill-tag">UX Research</div>
        </div>
        <div className="hero-pill-tag">Publishing</div>
      </div>

      {/* 프로필 소개 카드 영역 */}
      <div className="hero-profile-container">
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
