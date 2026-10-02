import { useEffect, useState } from 'react';
import Icon from './Icon';

/**
 * <main>의 마지막 자식으로 두세요.
 * sticky 레일이 화면 하단을 따라다니다가 main이 끝나는 지점(Connect 하단)에서 멈추고,
 * 다시 위로 스크롤하면 자동으로 따라다닙니다.
 */
export default function ToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="to-top-rail">
      <a className={`to-top${show ? ' is-visible' : ''}`} href="#home" aria-label="맨 위로 이동">
        <Icon name="up" size={24} />
      </a>
    </div>
  );
}
