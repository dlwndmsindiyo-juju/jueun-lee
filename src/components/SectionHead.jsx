import { delay } from '../hooks/reveal';

export default function SectionHead({ id, title, description }) {
  return (
    <header className="section-head">
      <h2 className="section-head__title" id={id} data-reveal style={delay(0)}>{title}</h2>
      {description && (
        <p className="section-head__desc" data-reveal style={delay(0.1)}>{description}</p>
      )}
    </header>
  );
}
