import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '../../../data/projects';
import { CardBody, CardContainer, CardItem } from '../../../components/ui/3d-card';

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Arifah Machi`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) notFound();

  const p = projects[idx];
  const nextProj = projects[(idx + 1) % projects.length];
  const cats = Array.isArray(p.categories) ? p.categories : [];
  const tech = Array.isArray(p.tech) ? p.tech : [];
  const features = Array.isArray(p.features) ? p.features : [];

  return (
    <div className="pdp-standalone">
      <header className="pdp-s-topbar">
        <Link href="/#pathways" className="pdp-s-back">
          ← Back to Portfolio
        </Link>
        <span className="pdp-s-counter">
          {String(idx + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
      </header>

      <main className="pdp-s-container">
        <div className="pdp-s-badges">
          {cats.map((c) => (
            <span key={c} className={`pdp-s-badge badge-${c.toLowerCase()}`}>
              {c}
            </span>
          ))}
          {p.status && <span className="pdp-s-badge badge-status">{p.status}</span>}
          {p.year && <span className="pdp-s-year">{p.year}</span>}
        </div>

        <h1 className="pdp-s-title">{p.title}</h1>
        <p className="pdp-s-lead">{p.description}</p>

        <div className="pdp-s-actions">
          {p.demoLink && (
            <a href={p.demoLink} target="_blank" rel="noopener noreferrer" className="pdp-s-btn primary">
              Live Demo ↗
            </a>
          )}
          {p.prototypeLink && (
            <a href={p.prototypeLink} target="_blank" rel="noopener noreferrer" className="pdp-s-btn">
              Figma Prototype ↗
            </a>
          )}
          {p.githubLink && (
            <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="pdp-s-btn">
              Source Code ↗
            </a>
          )}
        </div>

        <div className="pdp-s-hero">
          <img src={p.image} alt={p.title} />
        </div>

        <div className="pdp-s-meta-grid">
          <div className="pdp-s-meta-box">
            <span className="pdp-s-label">Role</span>
            <div className="pdp-s-val">{p.role}</div>
          </div>
          <div className="pdp-s-meta-box">
            <span className="pdp-s-label">Client / Context</span>
            <div className="pdp-s-val">{p.projectFor}</div>
          </div>
          <div className="pdp-s-meta-box">
            <span className="pdp-s-label">Tech Stack</span>
            <div className="pdp-s-tags">
              {tech.map((t) => (
                <span key={t} className="pdp-s-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {p.background && (
          <section className="pdp-s-sec">
            <h2 className="pdp-s-sec-title">Overview &amp; Background</h2>
            <div className="pdp-s-card">
              <p className="pdp-s-text">{p.background}</p>
            </div>
          </section>
        )}

        {features.length > 0 && (
          <section className="pdp-s-sec">
            <h2 className="pdp-s-sec-title">Key Features</h2>
            <div className="pdp-s-features">
              {features.map((f, i) => (
                <CardContainer key={f.title}>
                  <CardBody className="pdp-s-fcard">
                    <CardItem translateZ={50} className="pdp-s-fhead">
                      <span className="pdp-s-fnum">{String(i + 1).padStart(2, '0')}</span>
                      <h3>{f.title}</h3>
                    </CardItem>
                    <CardItem as="p" translateZ={60} className="pdp-s-fdesc">
                      {f.description}
                    </CardItem>
                    {f.image && (
                      <CardItem translateZ={90} className="pdp-s-fimg">
                        <img src={f.image} alt={f.title} loading="lazy" />
                      </CardItem>
                    )}
                  </CardBody>
                </CardContainer>
              ))}
            </div>
          </section>
        )}

        <div className="pdp-s-foot">
          <Link href="/#pathways" className="pdp-s-back">
            ← Back to All Projects
          </Link>
          {nextProj && nextProj.id !== p.id && (
            <Link href={`/projects/${nextProj.id}`} className="pdp-s-back">
              Next: {nextProj.title} →
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
