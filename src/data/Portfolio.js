const STACK = ['HTML', 'React', 'OpenAI', 'CSS', 'TypeScript', 'Figma', 'JavaScript', 'Node.js', 'Photoshop', 'Swiper', 'GSAP', 'Illustrator'];

export const skills = {
  title: 'Skills Ability',
  description: '숫자로 된 숙련도 대신, 실제로 프로젝트에서 사용해본 기술을 정리했습니다.\n테두리가 진하게 표시된 항목이 가장 자신 있는 영역입니다.',
  groups: [
    {
      label: 'Language/Framework/Library',
      items: [
        { name: 'HTML', color: '#e44d26', strong: true },
        { name: 'CSS', color: '#2965f1', strong: true },
        { name: 'JavaScript', color: '#f7df1e', strong: true },
        { name: 'TypeScript', color: '#3178c6' },
        { name: 'React.js', color: '#61dafb', strong: true },
        { name: 'Next.js', color: '#111111' },
        { name: 'Node.js', color: '#339933' },
        { name: 'Scss', color: '#cc6699' },
        { name: 'Tailwind css', color: '#38bdf8' },
        { name: 'Git', color: '#f05032' },
      ],
    },
    {
      label: 'Tools/Analytics/Plugins',
      items: [
        { name: 'Figma', color: '#a259ff' },
        { name: 'Photoshop', color: '#31a8ff' },
        { name: 'Illustrator', color: '#ff9a00' },
        { name: 'GitHub', color: '#111111' },
        { name: 'GSAP', color: '#88ce02' },
        { name: 'Swiper', color: '#6332f6' },
        { name: 'OpenAI', color: '#10a37f' },
        { name: 'Notion', color: '#555555' },
        { name: 'Slack', color: '#e01e5a' },
      ],
    },
  ],
};

export const education = {
  title: 'Education',
  description: '부트캠프를 통해 짧지만 다양한 경험을 가지고 빠르게 성장하였습니다.',
  org: '이젠아카데미 부트캠프 수료',
  badge: '수료',
  course: 'UXUI디자인 웹 프론트엔드개발 부트캠프',
  location: '서울',
  period: '2026.06.30 ~ 2026.12.15',
  achievementsTitle: '주요 활동 및 성과',
  achievements: [
    'HTML, CSS, Javascript, React, TypeScript 등을 이용한 웹 프로그래밍 교육 과정 이수',
    '팀 프로젝트에서 프로젝트 기획서 작성을 주도하며, 타겟 사용자 정의, 주요 기능 우선순위 설정 등 요구사항 정의를 담당',
    '간단한 사용성 테스트(인터뷰/설문)를 설계하고 결과를 분석해, 네비게이션 구조와 카테고리 명칭을 개선',
    '웹사이트 리뉴얼 프로젝트에서 사이트 분석과 주제 선정을 주도하고, 팀원별 담당 파트에 대해 적극적인 의견을 제시하며 피드백 반영',
  ],
  skillsTitle: '습득 역량',
  skills: ['HTML', 'Scss', 'CSS', 'Git', 'JavaScript', 'GitHub', 'TypeScript', 'Figma', 'Swiper', 'React', 'GSAP', 'Next.js', 'Open AI', 'Node.js'],
};

export const projects = {
  title: 'Project',
  groups: [
    {
      label: '01 / TEAM PROJECT',
      items: [
        { subtitle: 'BALENCIAGA 브랜드 공식 온라인 사이트 리뉴얼', title: 'BALENCIAGA', period: '2026.07 - 2026.09', members: '4인', stack: STACK, image: null, imageAlt: '', detailHref: '#', link: { label: '홈페이지 보러가기', href: '#' } },
        { subtitle: 'OTT 리뉴얼 프로젝트', title: 'Apple TV', period: '2026.10 - 2026.12', members: '6인', stack: STACK, image: null, imageAlt: '', detailHref: '#', link: { label: '홈페이지 보러가기', href: '#' } },
      ],
    },
    {
      label: '02 / PERSONAL PROJECT',
      items: [
        { subtitle: '나의 모든 것이 담긴 포트폴리오', title: 'PORTFOLIO', period: '2026.09 - 2026.10', members: '1인', stack: STACK, image: null, imageAlt: '', detailHref: '#', link: { label: '홈페이지 보러가기', href: '#' } },
      ],
    },
  ],
};

export const connect = {
  title: 'Connect',
  items: [
    { label: 'dlwndmsindiyo@gmail.com', href: 'mailto:dlwndmsindiyo@gmail.com' },
    { label: 'https://github.com/dlwndmsindiyo-juju', href: 'https://github.com/dlwndmsindiyo-juju', external: true },
  ],
};

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
