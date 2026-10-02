import { delay } from '../hooks/reveal';
import { connect } from '../data/portfolio';

export default function Connect() {
  return (
    <section className="section connect" id="connect" aria-labelledby="connect-title">
      <div className="connect__inner">
        <h2 className="connect__title" id="connect-title" data-reveal style={delay(0)}>{connect.title}</h2>
        <ul className="connect__list">
          {connect.items.map((item, i) => (
            <li key={item.label} data-reveal style={delay(0.1 + i * 0.1)}>
              <a
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
