import htmlIcon from '../assets/skills/html.svg';
import cssIcon from '../assets/skills/css.svg';
import jsIcon from '../assets/skills/javascript.svg';
import tsIcon from '../assets/skills/typescript.svg';
import reactIcon from '../assets/skills/react.svg';
import nextIcon from '../assets/skills/nextjs.svg';
import nodeIcon from '../assets/skills/node-js.svg';
import sassIcon from '../assets/skills/sass.svg';
import twIcon from '../assets/skills/tailwindcss.svg';
import gitIcon from '../assets/skills/git.svg';
import figmaIcon from '../assets/skills/figma.svg';
import psIcon from '../assets/skills/photoshop.svg';
import aiIcon from '../assets/skills/illustrator.svg';
import ghIcon from '../assets/skills/github.svg';
import gsapIcon from '../assets/skills/gsap.svg';
import swiperIcon from '../assets/skills/swiper.svg';
import openaiIcon from '../assets/skills/openAi.svg';
import notionIcon from '../assets/skills/notion.svg';
import slackIcon from '../assets/skills/slack.svg';
import firebaseIcon from '../assets/skills/firebase.svg';
import zustandIcon from '../assets/skills/zustand.svg';
import vercelIcon from '../assets/skills/vercel.svg';
import balenciagaCard from '/images/carousel/balenciaga.jpg';
import appleTvImage from '/images/carousel/apple-tv.jpg';
import tenpercentImage from '/images/carousel/tenpercent.jpg';
import { projectDetails } from './projectDetails';

export const skills = {
  title: 'Skills',
  description: '프로젝트에서 사용한 기술과 작업 도구입니다.',
  groups: [
    {
      label: '웹 개발',
      items: [
        { name: 'HTML', icon: htmlIcon, strong: true },
        { name: 'CSS', icon: cssIcon, strong: true },
        { name: 'JavaScript', icon: jsIcon, strong: true },
        { name: 'TypeScript', icon: tsIcon },
        { name: 'React.js', icon: reactIcon, strong: true },
        { name: 'Next.js', icon: nextIcon },
        { name: 'Node.js', icon: nodeIcon },
        { name: 'Scss', icon: sassIcon, strong: true },
        { name: 'Tailwind css', icon: twIcon, strong: true },
        { name: 'Git', icon: gitIcon },
        { name: 'Firebase', icon: firebaseIcon },
        { name: 'Zustand', icon: zustandIcon },
      ],
    },
    {
      label: '디자인 · 협업 도구',
      items: [
        { name: 'Figma', icon: figmaIcon },
        { name: 'Photoshop', icon: psIcon },
        { name: 'Illustrator', icon: aiIcon },
        { name: 'GitHub', icon: ghIcon },
        { name: 'Vercel', icon: vercelIcon },
        { name: 'GSAP', icon: gsapIcon },
        { name: 'Swiper', icon: swiperIcon },
        { name: 'OpenAI', icon: openaiIcon, strong: true },
        { name: 'Notion', icon: notionIcon, strong: true },
        { name: 'Slack', icon: slackIcon, strong: true },
      ],
    },
  ],
};

export const education = {
  title: 'Education',
  description: '웹 개발과 UI 디자인을 배우고 팀 프로젝트에 적용했습니다.',
  org: '이젠아카데미 부트캠프',
  badge: '수료',
  course: 'UXUI디자인 웹 프론트엔드개발 부트캠프',
  location: '서울',
  period: '2026.06.30 ~ 2026.12.15',
  achievementsTitle: '주요 활동 및 성과',
  achievements: [
    'HTML·CSS·JavaScript·React·TypeScript로 웹 화면 구현',
    'Figma와 OpenAI를 활용한 UI 디자인과 서비스 기획',
    '사용성 테스트 결과를 바탕으로 메뉴 구조와 카테고리 개선',
    '팀 프로젝트 기획서 작성, 방향 정리와 팀원 피드백 반영',
    'Git·GitHub로 코드 공유와 변경 이력 관리',
    'Vercel·GitHub Pages로 배포하고 경로·화면 표시 문제 수정',
    'README에 주요 기능과 실행 방법 정리',
  ],
};
// 카드 데이터. 상세 페이지는 같은 id의 projectDetails 데이터를 사용합니다.
export const projects = {
  title: 'Project',
  groups: [
    {
      label: '01 / TEAM PROJECT',
      items: [
        {
          id: 'balenciaga', title: 'BALENCIAGA',
          subtitle: 'TEAM PROJECT 01 / 브랜드 웹사이트',
          summary: projectDetails.balenciaga.summary,
          stack: projectDetails.balenciaga.stack,
          image: balenciagaCard,
          detailHref: '/project/balenciaga',
          link: projectDetails.balenciaga.link,
        },
        {
          id: 'apple-tv', title: 'Apple TV',
          subtitle: 'TEAM PROJECT 02 / OTT 리뉴얼',
          summary: projectDetails['apple-tv'].summary,
          stack: projectDetails['apple-tv'].stack,
          image: appleTvImage,
          detailHref: '/project/apple-tv',
          link: projectDetails['apple-tv'].link,
        },
        {
          id: 'shopping-mall', title: 'SHOPPING MALL',
          subtitle: 'TEAM PROJECT 03 / 쇼핑몰 · 주제 미정',
          summary: '다음 팀 프로젝트를 준비 중입니다. 주제와 작업 범위가 정해지면 추가하겠습니다.',
          stack: [], stackNote: '사용 기술과 작업 범위는 미정입니다.',
          placeholder: 'NEXT TEAM PROJECT', placeholderCaption: '쇼핑몰 · 주제 미정',
        },
      ],
    },
    {
      label: '02 / PERSONAL PROJECT',
      items: [
        {
          id: 'tenpercent', title: 'TENPERCENT',
          subtitle: 'PERSONAL PROJECT 01 / 커피 브랜드 클론 코딩',
          summary: projectDetails.tenpercent.summary,
          stack: projectDetails.tenpercent.stack,
          image: tenpercentImage,
          detailHref: '/project/tenpercent',
        },
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
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
  ],
  connectTitle: 'CONNECT',
  connect: [
    { label: 'Email', href: 'mailto:dlwndmsindiyo@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/dlwndmsindiyo-juju', external: true },
  ],
  bigText: ['Frontend', 'Developer'],
  copyright: '©2026 LeeJuEun. All Rights Reserved.',
};
