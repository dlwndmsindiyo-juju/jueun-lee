import { Link } from 'react-router-dom';
import { footer } from '../data/portfolio';

// '#home' → '/', '#skills' → '/#skills' (어느 페이지에서든 홈의 해당 섹션으로 이동)
const toPath = (href) => (href === '#home' ? '/' : `/${href}`);

const Links = ({ items }) => (
  <ul>
    {items.map((l) => (
      <li key={l.label}>
        {l.href.startsWith('#') ? (
          <Link to={toPath(l.href)}>{l.label}</Link>
        ) : (
          <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}>{l.label}</a>
        )}
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
          <h2>{footer.connectTitle}</h2>
          <Links items={footer.connect} />
        </div>
      </div>

      <p className="site-footer__big" aria-label={footer.bigText.join(' ')}>
        {footer.bigText.map((line) => <span key={line} aria-hidden="true">{line}</span>)}
      </p>

      <p className="site-footer__copy">{footer.copyright}</p>
    </footer>
  );
}
