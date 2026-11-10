import { useEffect, useRef, useState } from 'react';
import SectionHead from './SectionHead';
import Icon from './Icon';
import { connect, education, projects, resume, skills } from '../data/portfolio';
import { projectDetails } from '../data/projectDetails';
import './Resume.css';

function ResumeDraft() {
  const completedProjects = projects.groups.flatMap((group) => group.items).filter((item) => item.detailHref);
  return (
    <article className="resume-document">
      <header>
        <span className="resume-document__draft">이력서 초안</span>
        <p className="resume-document__job">{resume.jobTitle}</p>
        <h3>{resume.name}</h3>
        <p>{resume.summary}</p>
        <ul className="resume-document__contact">
          {connect.items.map((item) => <li key={item.href}>
            <a href={item.href} {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}>{item.label}</a>
          </li>)}
        </ul>
      </header>
      <section aria-labelledby="resume-skills">
        <h4 id="resume-skills">사용 기술</h4>
        {skills.groups.map((group) => <p key={group.label}><strong>{group.label}</strong><br />{group.items.map((item) => item.name).join(' · ')}</p>)}
      </section>
      <section aria-labelledby="resume-education">
        <h4 id="resume-education">교육 · 팀 프로젝트</h4>
        <p><strong>{education.org}</strong><br />{education.course}<br />{education.period}</p>
        <ul>{education.achievements.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section aria-labelledby="resume-projects">
        <h4 id="resume-projects">주요 프로젝트</h4>
        {completedProjects.map((project) => <div className="resume-document__project" key={project.id}>
          <h5>{project.title}</h5>
          <p>{project.summary}</p>
          <p className="resume-document__role">{projectDetails[project.id]?.role}</p>
        </div>)}
      </section>
    </article>
  );
}

export default function Resume() {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  const open = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };
  const keepFocusInDialog = (event) => {
    if (event.key !== 'Tab') return;
    const elements = [...dialogRef.current.querySelectorAll('button:not([disabled]), a[href], iframe, [tabindex]:not([tabindex="-1"])')]
      .filter((element) => element.getClientRects().length > 0);
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };
  const closeOnBackdrop = (event) => {
    if (event.target !== dialogRef.current) return;
    const rect = dialogRef.current.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
      dialogRef.current.close();
    }
  };

  return (
    <section className="section resume" id="resume" aria-labelledby="resume-title">
      <SectionHead id="resume-title" title={resume.title} description={resume.description} />
      <div className="resume__action">
        <button className="resume__open" type="button" onClick={open} aria-haspopup="dialog" aria-controls="resume-dialog">
          <Icon name="book" size={20} />이력서 보기
        </button>
      </div>
      <dialog id="resume-dialog" className="resume-dialog" ref={dialogRef} aria-labelledby="resume-dialog-title" onClose={() => setIsOpen(false)} onClick={closeOnBackdrop} onKeyDown={keepFocusInDialog}>
        <div className="resume-dialog__header">
          <h2 id="resume-dialog-title">{resume.name} 이력서</h2>
          <div className="resume-dialog__actions">
            {resume.fileUrl && <a href={resume.fileUrl} target="_blank" rel="noreferrer">새 탭에서 보기 ↗</a>}
            <button type="button" className="resume-dialog__close" onClick={() => dialogRef.current?.close()} aria-label="이력서 닫기" autoFocus>닫기</button>
          </div>
        </div>
        <div className="resume-dialog__body">
          {isOpen && (resume.fileUrl
            ? <iframe className="resume-dialog__pdf" title={`${resume.name} 이력서 PDF`} src={resume.fileUrl} />
            : <ResumeDraft />)}
        </div>
      </dialog>
    </section>
  );
}
