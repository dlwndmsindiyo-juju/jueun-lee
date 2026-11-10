import { useRef } from 'react';
import useScrollHighlight from '../hooks/useScrollHighlight';
import { delay } from '../hooks/reveal';
import profileImg from '../assets/profile-img.png';
import capImg from '../assets/cap.svg';
import headphoneImg from '../assets/headphone.svg';
import swimImg from '../assets/swim.svg';

// 소품은 바깥 원(궤도) 위에 각도(deg)로 배치합니다. w는 궤도 폭 대비 %.
const ORBIT = [
  { key: 'cap', src: capImg, deg: -58, w: 27 },
  { key: 'swim', src: swimImg, deg: 183, w: 22 },
  { key: 'phone', src: headphoneImg, deg: 23, w: 17 },
].map((o) => ({
  ...o,
  left: 50 + 50 * Math.cos((o.deg * Math.PI) / 180),
  top: 50 + 50 * Math.sin((o.deg * Math.PI) / 180),
}));

const TAGS = ['관찰력', '성실함', '집요함', '꼼꼼함', '유연한사고', '추진력', '집중력'];

export default function HeroProfile() {
  const profileRef = useRef(null);

  useScrollHighlight(profileRef, '.profile-highlight');

  return (
    <section className="hero-bottom-section" ref={profileRef}>
      <div className="hero-profile-container" data-reveal style={delay(0)}>
        {/* 왼쪽: 프로필 + 궤도 + 소품 */}
        <div className="hero-profile-visual" aria-hidden="true">
          <span className="hero-profile-ring hero-profile-ring--outer" />
          <span className="hero-profile-ring hero-profile-ring--inner" />
          <img className="hero-profile-photo" src={profileImg} alt="" draggable={false} />
          <div className="hero-profile-orbit">
            {ORBIT.map((o) => (
              <span
                key={o.key}
                className="orbit-item"
                style={{ left: `${o.left}%`, top: `${o.top}%`, width: `${o.w}%` }}
              >
                <img src={o.src} alt="" draggable={false} />
              </span>
            ))}
          </div>
        </div>

        {/* 오른쪽: 소개 텍스트 */}
        <div className="hero-profile-info">
          <div className="hero-profile-subtitle">FRONTEND DEVELOPER / 2026</div>
          <div className="hero-profile-desc-top">화면을 <mark className="profile-highlight">관찰</mark>하고, 원인을 <mark className="profile-highlight">분석</mark>해 문제를 <mark className="profile-highlight">해결</mark>합니다.</div>

          <h2 className="hero-profile-name">이주은</h2>

          <p className="hero-profile-desc-main">
            새로운 기술을 배우고 프로젝트에 적용하며 성장하고 있습니다.
            <br />
            화면을 만든 뒤에도 사용 흐름과 동작을 확인하며 수정합니다.
          </p>

          <div className="hero-profile-meta">
            <span>1998/11/23</span>
            <span>Seoul</span>
            <span>INTJ</span>
          </div>

          <ul className="hero-profile-tags">
            {TAGS.map((t) => <li key={t}>#{t}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
