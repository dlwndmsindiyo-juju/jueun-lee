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
  description: '숫자로 된 숙련도 대신, 실제로 프로젝트에서 사용해본 기술을 정리했습니다.',
  groups: [
    {
      label: 'Language / Framework / Library',
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
      label: 'Tools / Analytics / Plugins',
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
  description: '부트캠프를 통해 짧지만 다양한 경험을 가지고 빠르게 성장하였습니다.',
  org: '이젠아카데미 부트캠프',
  badge: '수료',
  course: 'UXUI디자인 웹 프론트엔드개발 부트캠프',
  location: '서울',
  period: '2026.06.30 ~ 2026.12.15',
  achievementsTitle: '주요 활동 및 성과',
  achievements: [
    'HTML, CSS, Javascript, React, TypeScript 등을 이용한 웹 프로그래밍 교육 과정 이수',
    'Figma와 OpenAI를 활용한 UI/UX 디자인 및 서비스 기획 교육 과정 이수',
    '사용성 테스트를 직접 설계하고 결과를 분석해 웹사이트의 네비게이션 구조와 카테고리 개선',
    '팀 프로젝트의 기획서 작성과 방향성 설정을 주도하며 프로젝트 기획 역량 강화',
    '팀원들과 적극적으로 의견을 나누고 피드백을 반영하며 협업 및 커뮤니케이션 역량 향상',
    'Git과 GitHub를 활용해 소스 코드를 관리하고 프로젝트 변경 사항을 기록',
    'GitHub를 통해 프로젝트 코드를 공유하고 팀원들과 협업하는 개발 환경 경험',
    'Vercel 및 GitHub Pages를 활용해 제작한 웹사이트를 배포하고 실제 서비스 환경에서 동작 확인',
    '배포 과정에서 발생하는 경로 및 화면 표시 문제를 점검하고 수정하며 웹사이트 안정성 개선',
    'README와 Markdown 문서를 작성해 프로젝트의 주요 기능, 개발 과정 및 실행 방법 정리',
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
          summary: '세 번째 팀 프로젝트를 위한 독립된 프로젝트 슬롯. 프로젝트 주제와 구현 범위가 확정되면 내용을 추가합니다.',
          stack: [], stackNote: '기술 및 상세 범위 미정',
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
          summary: '공식 콘텐츠를 바탕으로 4개 페이지와 3개 화면 크기의 UI, 공통 컴포넌트와 에셋을 React로 구현한 클론 코딩 프로젝트.',
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
