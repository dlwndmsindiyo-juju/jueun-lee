import { useEffect, useRef, useState } from 'react';
import SectionHead from './SectionHead';
import Icon from './Icon';
import { resume } from '../data/portfolio';
import { resumeDocument } from '../data/resumeDocument';
import './Resume.css';

function ResumeDocument() {
  const content = resumeDocument;
  return (
    <article className="resume-document">
      <header>
        <span className="resume-document__label">이력서</span>
        <p className="resume-document__job">지원 직무 · {content.jobTitle}</p>
        <h3>{content.name}</h3>
        <dl className="resume-document__info">
          {content.contacts.map((item) => <div key={item.label}>
            <dt>{item.label}</dt>
            <dd><a href={item.href} {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}>{item.value}</a></dd>
          </div>)}
          {content.personal.map((item) => <div key={item.label}>
            <dt>{item.label}</dt><dd>{item.value}</dd>
          </div>)}
        </dl>
      </header>
      <section aria-labelledby="resume-skills">
        <h4 id="resume-skills">보유 스킬</h4>
        <ul className="resume-document__skills">
          {content.skills.map((item) => <li key={item.name}>
            <span>{item.name}</span><span className="resume-document__level">{item.level}</span>
          </li>)}
        </ul>
      </section>
      <section aria-labelledby="resume-introduction">
        <h4 id="resume-introduction">자기소개</h4>
        {content.introductions.map((item) => <div className="resume-document__entry" key={item.title}>
          <h5>{item.title}</h5>
          {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>)}
      </section>
      <section aria-labelledby="resume-experience">
        <h4 id="resume-experience">프로젝트 경험</h4>
        {content.experiences.map((item) => <div className="resume-document__entry" key={item.title}>
          <div className="resume-document__entry-heading">
            <h5>{item.title}</h5><span className="resume-document__period">{item.period}</span>
          </div>
          <p className="resume-document__organization">{item.organization}</p>
          <ul>{item.items.map((text, index) => <li key={`${item.title}-${index}`}>{text}</li>)}</ul>
        </div>)}
      </section>
      <section aria-labelledby="resume-education">
        <h4 id="resume-education">교육사항</h4>
        {content.education.map((item) => <div className="resume-document__entry" key={item.school}>
          <div className="resume-document__entry-heading">
            <h5>{item.school}</h5><span className="resume-document__period">{item.period}</span>
          </div>
          <p>{item.major} · {item.degree}</p>
        </div>)}
      </section>
      <section aria-labelledby="resume-certifications">
        <h4 id="resume-certifications">자격증 및 어학</h4>
        {content.certifications.map((item) => <div className="resume-document__entry" key={item.name}>
          <div className="resume-document__entry-heading">
            <h5>{item.name} · {item.grade}</h5><span className="resume-document__period">{item.date}</span>
          </div>
          <p>{item.issuer}</p>
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
            : <ResumeDocument />)}
        </div>
      </dialog>
    </section>
  );
}
