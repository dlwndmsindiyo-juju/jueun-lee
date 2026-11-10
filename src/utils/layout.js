// 브라우저가 반환한 좌표를 스타일에 넣을 때 현재 rem 기준으로 변환합니다.
export const getRootFontSize = () => parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
export const toRem = (value) => `${value / getRootFontSize()}rem`;
export const getHeaderHeight = () => document.querySelector('.site-header__inner')?.getBoundingClientRect().height || getRootFontSize() * 5.625;
