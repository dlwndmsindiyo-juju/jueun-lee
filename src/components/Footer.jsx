import { footer } from '../data/portfolio';

const Links = ({ items }) => (
  <ul>
    {items.map((l) => (
      <li key={l.label}>
        <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}>{l.label}</a>
      </li>
    ))}
  </ul>
);

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <nav className="site-footer__col" aria-label="푸터 메뉴">
          <h2>{footer.menuTitle}</h2>
          <Links items={footer.menu} />
        </nav>
        <div className="site-footer__col site-footer__col--right">
          <h2>{footer.contactTitle}</h2>
          <Links items={footer.contact} />
        </div>
      </div>

      <p className="site-footer__big" aria-label={footer.bigText.join(' ')}>
        {footer.bigText.map((line) => <span key={line} aria-hidden="true">{line}</span>)}
      </p>

      <p className="site-footer__copy">{footer.copyright}</p>
    </footer>
  );
}
