import HeroCarousel from './HeroCarousel';
import HeroProfile from './HeroProfile';

// #home 루트(block-hero-homepage)는 HeroCarousel이 렌더링하고,
// 하단 프로필은 children으로 같은 루트 안에 들어갑니다.
export default function HeroSection() {
  return (
    <HeroCarousel>
      <HeroProfile />
    </HeroCarousel>
  );
}
