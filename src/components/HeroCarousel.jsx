import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// 이미지와 링크를 자신의 프로젝트에 맞게 변경하세요.
const BASE = 'https://weichie.com/wp-content/uploads/2026/05/';
const SERVICES = [
  { name: 'Web development', slug: 'web-development', image: 'website-service-cover.jpg' },
  { name: 'eCommerce', slug: 'ecommerce', image: 'ecommerce-service-cover.jpg' },
  { name: 'Application development', slug: 'applications', image: 'application-service-cover-1024x1024.jpg' },
  { name: 'Artificial intelligence', slug: 'artificial-intelligence', image: 'ai-service-cover-1024x1024.jpg' },
  { name: 'Blockchain', slug: 'blockchain', image: 'blockchain-service-cover-1024x1024.jpg' },
];
const COUNT = SERVICES.length * 3; // 5개 서비스를 3번 반복해 원형으로 배치
const CARDS = Array.from({ length: COUNT }, (_, i) => SERVICES[i % SERVICES.length]);

/**
 * block-hero-homepage 루트 전체를 렌더링합니다.
 * children(하단 프로필 영역)은 같은 루트 안에 들어가야
 * CSS의 `.is-ready` 인트로 애니메이션 선택자가 그대로 동작합니다.
 */
export default function HeroCarousel({ children }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const ringRef = useRef(null);
  const cardRefs = useRef([]);
  const apiRef = useRef(null); // 이펙트 내부 함수를 JSX 버튼에 노출

  // 드물게 바뀌는 UI 값만 React state로 관리
  const [pausedUi, setPausedUi] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const ring = ringRef.current;
    const cards = cardRefs.current;
    const labels = [...root.querySelectorAll('[data-index]')];
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');

    const TAU = Math.PI * 2;
    const count = COUNT;
    const step = TAU / count;
    const n = SERVICES.length;

    // 회전 속도(rad/초), 드래그 감도(rad/px)를 여기서 조절하세요.
    const AUTO_SPEED = -0.1;
    const DRAG_SENSITIVITY = 0.0035;

    const state = { angle: 0 };
    let speed = AUTO_SPEED, paused = reduced.matches, visible = true;
    let pointer = null, downX = 0, downY = 0, lastX = 0, lastMove = 0;
    let startAngle = 0, dragTarget = 0, velocity = 0, moved = false;
    let holdUntil = 0, active = -1, frontIndex = -1, motionTween = null;
    let suppressClickUntil = 0;

    const wrap = (value) => (((value + Math.PI) % TAU + TAU) % TAU) - Math.PI;
    // 포인터의 목표 각도까지 짧게 보간합니다. 이벤트마다 새 tween을 만들지 않습니다.
    const dragTo = gsap.quickTo(state, 'angle', { duration: 0.18, ease: 'power3.out' });

    function resize() {
      const mobile = innerWidth <= 768;
      const fov = mobile ? 49 : innerWidth <= 1024 ? 40 : 24;
      const unit = stage.clientHeight / (2 * 8.6 * Math.tan((fov * Math.PI) / 360));
      const radius = (mobile ? 4 : 4.3) * unit;
      root.style.setProperty('--perspective', `${8.6 * unit}px`);
      root.style.setProperty('--card-size', `${1.6 * unit}px`);
      root.style.setProperty('--drop', `${radius * Math.sin((13 * Math.PI) / 180)}px`);
      cards.forEach((card, i) => {
        card.style.transform = `rotateY(${i * step}rad) translateZ(${radius}px)`;
      });
    }

    function paint() {
      const angle = state.angle;
      ring.style.transform = `rotateY(${angle}rad)`;
      const front = ((Math.round(-angle / step) % count) + count) % count;
      cards.forEach((card, i) => {
        const depth = Math.cos(i * step + angle);
        card.style.opacity = String(depth >= 0.5 ? 1 : Math.max(0, (depth + 1) / 1.5));
        card.style.pointerEvents = depth > 0.5 ? 'auto' : 'none';
      });
      // 접근성 속성은 정면 카드가 바뀔 때만 갱신합니다.
      if (front !== frontIndex) {
        frontIndex = front;
        cards.forEach((card, i) => {
          card.tabIndex = i === front ? 0 : -1;
          card.setAttribute('aria-hidden', String(i !== front));
        });
        active = front % n;
        labels.forEach((button, i) => button.setAttribute('aria-pressed', String(i === active)));
      }
    }

    function stopTween() {
      dragTo.tween.pause();
      motionTween?.kill();
      motionTween = null;
    }

    function glideTo(angle, duration) {
      stopTween();
      if (reduced.matches) { state.angle = angle; paint(); return; }
      motionTween = gsap.to(state, {
        angle, duration, ease: 'power3.out',
        onComplete: () => {
          motionTween = null;
          speed = 0;
          holdUntil = performance.now() + 650;
        },
      });
    }

    function select(index) {
      if (pointer !== null) return;
      let shortest = Infinity;
      for (let i = index; i < count; i += n) {
        const delta = wrap(-i * step - state.angle);
        if (Math.abs(delta) < Math.abs(shortest)) shortest = delta;
      }
      speed = 0;
      glideTo(state.angle + shortest, 0.95);
      setStatus(`${SERVICES[index].name} 선택`);
    }

    const prev = () => select((active + n - 1) % n);
    const next = () => select((active + 1) % n);

    function togglePause() {
      paused = !paused;
      if (paused) stopTween();
      speed = 0;
      holdUntil = 0;
      setPausedUi(paused);
    }

    // 버튼(JSX)에서 호출할 수 있도록 노출
    apiRef.current = { select, prev, next, togglePause };

    /* ---------- 이벤트 핸들러 (cleanup을 위해 모두 이름 부여) ---------- */
    const onLabelClicks = labels.map((button, i) => {
      const fn = () => select(i);
      button.addEventListener('click', fn);
      return [button, fn];
    });

    const onReducedChange = () => {
      paused = reduced.matches;
      stopTween();
      speed = 0;
      setPausedUi(paused);
    };

    // 클릭으로 포커스가 남아도 자동 회전은 정상적으로 재개됩니다.
    const onKeyDown = (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      select((active + (event.key === 'ArrowRight' ? 1 : n - 1)) % n);
    };

    const onPointerDown = (event) => {
      if (!event.isPrimary || event.button !== 0 || pointer !== null) return;
      stopTween();
      pointer = event.pointerId;
      downX = lastX = event.clientX;
      downY = event.clientY;
      startAngle = dragTarget = state.angle;
      lastMove = performance.now();
      moved = false;
      suppressClickUntil = 0;
      velocity = speed = 0;
    };

    const onPointerMove = (event) => {
      if (event.pointerId !== pointer) return;
      const now = performance.now();
      const dx = event.clientX - lastX;
      if (!moved && Math.abs(event.clientY - downY) > 8 &&
        Math.abs(event.clientY - downY) > Math.abs(event.clientX - downX)) {
        // 세로 스와이프는 페이지 스크롤로 남겨둡니다.
        release({ pointerId: pointer, type: 'pointercancel' });
        return;
      }
      if (!moved && Math.abs(event.clientX - downX) > 6) {
        moved = true;
        stage.setPointerCapture(pointer);
        stage.classList.add('is-dragging');
      }
      if (moved) {
        dragTarget = startAngle + (event.clientX - downX) * DRAG_SENSITIVITY;
        const sample = (dx * DRAG_SENSITIVITY) / Math.max(0.008, (now - lastMove) / 1000);
        velocity += (Math.max(-3, Math.min(3, sample)) - velocity) * 0.3;
        if (reduced.matches) state.angle = dragTarget;
        else dragTo(dragTarget, state.angle);
      }
      lastX = event.clientX;
      lastMove = now;
    };

    function release(event) {
      if (event.pointerId !== pointer) return;
      const id = pointer;
      pointer = null;
      if (stage.hasPointerCapture(id)) stage.releasePointerCapture(id);
      stage.classList.remove('is-dragging');
      const cancelled = event.type === 'pointercancel' || event.type === 'lostpointercapture';
      if (performance.now() - lastMove > 100 || cancelled) velocity = 0;
      if (moved) {
        suppressClickUntil = performance.now() + 450;
        // 보간 중인 현재 각도에서 출발하므로 손을 놓아도 튀지 않습니다.
        glideTo(cancelled ? state.angle : dragTarget + (reduced.matches ? 0 : velocity * 0.22), 0.85);
      } else stopTween();
      moved = false;
      speed = 0;
      holdUntil = performance.now() + 650;
    }

    const onBlur = () => {
      if (pointer !== null) release({ pointerId: pointer, type: 'pointercancel' });
    };
    const onDragStart = (event) => event.preventDefault();
    const onClickCapture = (event) => {
      if (event.detail !== 0 && performance.now() < suppressClickUntil) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    function frame(time, deltaTime) {
      if (!visible || document.hidden) return;
      const dt = Math.min(deltaTime / 1000, 0.05);
      if (pointer === null && !motionTween && !dragTo.tween.isActive()) {
        if (!paused && performance.now() >= holdUntil) {
          // 정지 상태에서 자동 회전 속도까지 천천히 가속합니다.
          speed += (AUTO_SPEED - speed) * (1 - Math.exp(-3 * dt));
          state.angle += speed * dt;
        }
      }
      paint();
    }

    /* ---------- 등록 ---------- */
    reduced.addEventListener('change', onReducedChange);
    stage.addEventListener('keydown', onKeyDown);
    stage.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    stage.addEventListener('lostpointercapture', release);
    window.addEventListener('blur', onBlur);
    stage.addEventListener('dragstart', onDragStart);
    stage.addEventListener('click', onClickCapture, true);

    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(stage);

    resize();
    paint();
    setPausedUi(paused);
    root.classList.add('is-ready');
    gsap.ticker.add(frame);

    /* ---------- cleanup (StrictMode / 언마운트 대응) ---------- */
    return () => {
      gsap.ticker.remove(frame);
      ro.disconnect();
      io.disconnect();
      stopTween();
      dragTo.tween.kill();
      reduced.removeEventListener('change', onReducedChange);
      stage.removeEventListener('keydown', onKeyDown);
      stage.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
      stage.removeEventListener('lostpointercapture', release);
      window.removeEventListener('blur', onBlur);
      stage.removeEventListener('dragstart', onDragStart);
      stage.removeEventListener('click', onClickCapture, true);
      onLabelClicks.forEach(([button, fn]) => button.removeEventListener('click', fn));
      root.classList.remove('is-ready');
      apiRef.current = null;
    };
  }, []);

  return (
    <div className="block-wrapper block-hero-homepage" id="home" ref={rootRef}>
      <section className="hero-homepage" aria-labelledby="hero-title">
        <h1 className="hero-homepage__title" id="hero-title">
          <span>Frontend Developer</span>
          <span>Lee Ju Eun</span>
          <span>Portfolio</span>
        </h1>

        <div
          className="hero-homepage__stage"
          ref={stageRef}
          tabIndex={0}
          role="region"
          aria-roledescription="캐러셀"
          aria-label="서비스 이미지, 좌우 방향키로 이동"
          aria-describedby="hero-help"
        >
          <div className="hero-homepage__canvas">
            <div className="hero-homepage__tilt">
              {/* transform/opacity 등 style은 JS가 직접 제어하므로 style prop을 주지 않습니다. */}
              <div className="hero-homepage__ring" ref={ringRef}>
                {CARDS.map((service, i) => (
                  <a
                    key={i}
                    ref={(el) => (cardRefs.current[i] = el)}
                    className="hero-homepage__card"
                    href={`https://weichie.com/service/${service.slug}/`}
                    aria-label={service.name}
                    draggable={false}
                    tabIndex={-1}
                  >
                    <span className="fallback" aria-hidden="true">{service.name}</span>
                    <img
                      src={BASE + service.image}
                      alt=""
                      draggable={false}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hero-homepage__controls">
          <button type="button" aria-label="이전 서비스" onClick={() => apiRef.current?.prev()}>←</button>
          <button type="button" aria-pressed={pausedUi} onClick={() => apiRef.current?.togglePause()}>
            {pausedUi ? '자동 회전 재생' : '자동 회전 정지'}
          </button>
          <button type="button" aria-label="다음 서비스" onClick={() => apiRef.current?.next()}>→</button>
        </div>

        <p className="sr-only" id="hero-help">
          좌우로 드래그하거나 서비스 버튼을 선택하세요. 가운데 이미지를 누르면
          해당 서비스 페이지로 이동합니다.
        </p>
        <p className="sr-only" role="status">{status}</p>
      </section>

      {children}
    </div>
  );
}
