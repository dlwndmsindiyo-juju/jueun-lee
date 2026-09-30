/**
 * 포트폴리오 콘텐츠 데이터.
 * 텍스트/이미지는 이 파일만 수정하면 됩니다. (레이아웃은 sections/ 컴포넌트가 담당)
 *
 * 이미지: src/assets/ 에 넣고 import 하거나, public/ 경로('/images/xxx.png')를 문자열로 넣으세요.
 * image 를 '' (빈 문자열)로 두면 회색 자리표시 박스가 나옵니다.
 */

/* ---------- Skills ---------- */
// strong: true  → 테두리가 진하게 표시 (가장 자신 있는 기술)
// icon: ''      → 비우면 color 색의 작은 네모가 표시됩니다. 로고 이미지 경로를 넣으면 교체됩니다.
export const skills = {
  title: 'Skills Ability',
  description: [
    '숫자로 된 숙련도 대신, 실제로 프로젝트에서 사용해본 기술을 정리했습니다.',
    '테두리가 진하게 표시된 항목이 가장 자신 있는 영역입니다.',
  ],
  label: 'SKILLS LIST',
  groups: [
    {
      title: 'Language/Framework/Library',
      items: [
        { name: 'HTML', color: '#E34F26', icon: '', strong: true },
        { name: 'CSS', color: '#1572B6', icon: '', strong: true },
        { name: 'JavaScript', color: '#F7DF1E', icon: '', strong: true },
        { name: 'TypeScript', color: '#3178C6', icon: '' },
        { name: 'React.js', color: '#61DAFB', icon: '', strong: true },
        { name: 'Next.js', color: '#111111', icon: '' },
        { name: 'Node.js', color: '#339933', icon: '' },
        { name: 'Scss', color: '#CF649A', icon: '' },
        { name: 'Tailwind css', color: '#06B6D4', icon: '' },
        { name: 'Git', color: '#F05032', icon: '' },
        { name: 'Next.js', color: '#111111', icon: '' },
        { name: 'React.js', color: '#61DAFB', icon: '' },
      ],
    },
    {
      title: 'Tools/Analytics/Plugins',
      items: [
        { name: 'Figma', color: '#F24E1E', icon: '' },
        { name: 'Photoshop', color: '#31A8FF', icon: '' },
        { name: 'illustrator', color: '#FF9A00', icon: '' },
        { name: 'Git Hub', color: '#181717', icon: '' },
        { name: 'GSAP', color: '#88CE02', icon: '' },
        { name: 'Swiper', color: '#0F7BFF', icon: '' },
        { name: 'OpenAI', color: '#10A37F', icon: '' },
        { name: 'Notion', color: '#111111', icon: '' },
        { name: 'Slack', color: '#4A154B', icon: '' },
        { name: 'HTML', color: '#E34F26', icon: '' },
        { name: 'HTML', color: '#E34F26', icon: '' },
        { name: 'HTML', color: '#E34F26', icon: '' },
        { name: 'HTML', color: '#E34F26', icon: '' },
      ],
    },
  ],
};

/* ---------- Education ---------- */
export const education = {
  title: 'Education',
  description: ['부트캠프를 통해 짧지만 다양한 경험을 가지고 빠르게 성장하였습니다.'],
  org: '이젠아카데미 부트캠프',
  badge: '수료',
  course: 'UXUI디자인 웹 프론트엔드개발 부트캠프',
  location: '서울',
  period: '2026.06.30 - 2026.12.15',
  achievementsTitle: '주요 활동 및 성과',
  achievements: [
    'HTML, CSS, Javascript, React, TypeScript 등을 이용한 웹 프로그래밍 교육 과정 이수',
    '팀 프로젝트에서 프로젝트 기획서 작성을 주도하며, 타겟 사용자 정의·주요 기능 우선순위 설정 등 요구사항 정의를 담당',
    '간단한 사용성 테스트(인터뷰/설문)를 설계하고 결과를 분석해, 네비게이션 구조와 카테고리 명칭을 개선',
    '웹사이트 리뉴얼 프로젝트에서 사이트 분석과 주제 선정을 주도하고, 팀원별 담당 파트에 대해 적극적인 의견을 제시하며 피드백 반영',
    '팔랑귀팔랑귀',
    '레드레드',
    '도가니사리기',
    '레드레드',
  ],
  skillsTitle: '습득 역량',
  skills: [
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
    'Scss', 'Git', 'GitHub', 'Figma', 'Swiper', 'GSAP', 'Open AI',
  ],
};

/* ---------- Project ---------- */
// 행은 위에서부터 순서대로 [이미지 왼쪽 → 오른쪽 → 왼쪽 …] 으로 번갈아 배치됩니다.
const STACK = [
  'HTML', 'CSS', 'JavaScript', 'Swiper',
  'React', 'TypeScript', 'Node.js', 'GSAP',
  'OpenAI', 'Figma', 'Photoshop', 'Illustrator',
];

export const projects = {
  title: 'Project',
  groups: [
    {
      label: '01 / TEAM PROJECT',
      items: [
        {
          image: '', // 예: '/images/balenciaga.png'
          imageAlt: 'BALENCIAGA 프로젝트 화면',
          detailHref: '#',
          subtitle: 'BALENCIAGA 브랜드 공식 온라인 사이트 리뉴얼',
          title: 'BALENCIAGA',
          period: '2026.07 - 2026.09',
          members: '4인',
          stack: STACK,
          link: { label: '홈페이지 보러가기', href: '#' },
        },
        {
          image: '',
          imageAlt: 'Apple TV 프로젝트 화면',
          detailHref: '#',
          subtitle: 'OTT 리뉴얼 프로젝트',
          title: 'Apple TV',
          period: '2026.10 - 2026.12',
          members: '6인',
          stack: STACK,
          link: { label: '홈페이지 보러가기', href: '#' },
        },
      ],
    },
    {
      label: '02 / PERSONAL PROJECT',
      items: [
        {
          image: '',
          imageAlt: '포트폴리오 프로젝트 화면',
          detailHref: '#',
          subtitle: '나의 모든 것이 담긴 포트폴리오',
          title: 'PORTFOLIO',
          period: '2026.09 - 2026.10',
          members: '1인',
          stack: STACK,
          link: { label: '홈페이지 보러가기', href: '#' },
        },
      ],
    },
  ],
};

/* ---------- Connect ---------- */
export const connect = {
  title: 'Connect',
  items: [
    { label: 'dlwndmsindiyo@gmail.com', href: 'mailto:dlwndmsindiyo@gmail.com' },
    { label: 'https://github.com/dlwndmsindiyo-juju', href: 'https://github.com/dlwndmsindiyo-juju', external: true },
  ],
};

/* ---------- Footer ---------- */
export const footer = {
  menuTitle: 'MENU',
  menu: [
    { label: 'Home', href: '#home' },
    { label: 'Project', href: '#project' },
    { label: 'Skill', href: '#skills' },
    { label: 'About', href: '#education' },
  ],
  contactTitle: 'CONTACT',
  contact: [
    { label: 'Email', href: 'mailto:dlwndmsindiyo@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/dlwndmsindiyo-juju', external: true },
  ],
  bigText: ['Frontend', 'Developer'],
  copyright: '©2026 LeeJuEun. All Rights Reserved.',
};