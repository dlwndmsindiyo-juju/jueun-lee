import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ToTop from '../components/ToTop';
import ProjectDetailContent from '../components/ProjectDetailContent';
import { projectDetails } from '../data/projectDetails';

export default function ProjectDetail({ slug }) {
  const project = projectDetails[slug];
  useEffect(() => {
    document.documentElement.classList.add('intro-done');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    return () => document.documentElement.classList.remove('intro-done');
  }, [slug]);

  return (
    <>
      <Header />
      {project ? <ProjectDetailContent key={slug} project={project} /> : (
        <main className="detail"><p className="detail__empty">프로젝트를 찾을 수 없습니다. <Link to="/#project">프로젝트로 돌아가기</Link></p></main>
      )}
      <ToTop />
      <Footer />
    </>
  );
}
