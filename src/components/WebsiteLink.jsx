import Icon from './Icon';
import './WebsiteLink.css';

export default function WebsiteLink({ link, className = '' }) {
  if (!link?.href || link.href === '#') return null;
  return (
    <a className={`website-link ${className}`} href={link.href} target="_blank" rel="noreferrer">
      <Icon name="link" size={16} />{link.label || '홈페이지 보기'}
    </a>
  );
}
