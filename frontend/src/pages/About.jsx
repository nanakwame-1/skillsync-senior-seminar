import { Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

  .about-root {
    background: #f4f5f7;
    font-family: 'DM Sans', sans-serif;
    color: #1a1f2e;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .about-header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: #fff;
    border-bottom: 1px solid #e8eaed;
    padding: 12px 16px;
  }

  .about-header-inner {
    max-width: 480px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .about-logo {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .about-logo-icon {
    width: 32px;
    height: 32px;
    background: #1a2e35;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .about-logo-icon svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: #fff;
    stroke-width: 1.8;
  }

  .about-logo-text {
    font-size: 17px;
    font-weight: 700;
    color: #1a2e35;
    letter-spacing: -0.3px;
  }

  .about-header-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .about-icon-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    transition: background 0.15s;
  }

  .about-icon-btn:hover {
    background: #f4f5f7;
  }

  .about-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #1a2e35;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .about-main {
    flex: 1;
    max-width: 480px;
    margin: 0 auto;
    width: 100%;
    padding: 0 16px 100px;
  }

  /* Hero banner */
  .about-hero {
    background: #1a2e35;
    border-radius: 20px;
    padding: 28px 24px;
    margin: 20px 0 24px;
    position: relative;
    overflow: hidden;
  }

  .about-hero::before {
    content: '';
    position: absolute;
    top: -40px;
    right: -40px;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }

  .about-hero::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: -20px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: rgba(255,255,255,0.03);
  }

  .about-hero-eyebrow {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: rgba(255,255,255,0.5);
    margin-bottom: 8px;
  }

  .about-hero-title {
    font-size: 26px;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    margin-bottom: 10px;
    letter-spacing: -0.5px;
  }

  .about-hero-sub {
    font-size: 13px;
    color: rgba(255,255,255,0.65);
    line-height: 1.6;
  }

  /* Section label */
  .about-section-label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #9ca3af;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .about-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e8eaed;
  }

  /* Workflow card */
  .about-workflow-card {
    background: #fff;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 24px;
    border: 1px solid #e8eaed;
  }

  .about-workflow-steps {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .about-workflow-step {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 14px 0;
    position: relative;
  }

  .about-workflow-step:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 19px;
    top: 48px;
    bottom: 0;
    width: 2px;
    background: #e8eaed;
  }

  .about-step-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .about-step-icon.teal {
    background: #1a2e35;
  }

  .about-step-icon.light {
    background: #f0f4f5;
  }

  .about-step-icon svg {
    width: 18px;
    height: 18px;
    stroke-width: 1.8;
  }

  .about-step-info {
    flex: 1;
    padding-top: 2px;
  }

  .about-step-title {
    font-size: 14px;
    font-weight: 600;
    color: #1a1f2e;
    margin-bottom: 2px;
  }

  .about-step-desc {
    font-size: 12px;
    color: #6b7280;
    line-height: 1.5;
  }

  .about-step-badge {
    font-size: 10px;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 6px;
    background: #f0f4f5;
    color: #4b7280;
    align-self: flex-start;
    margin-top: 4px;
    letter-spacing: 0.3px;
    flex-shrink: 0;
  }

  /* Tech cards grid */
  .about-tech-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 24px;
  }

  .about-tech-card {
    background: #fff;
    border: 1px solid #e8eaed;
    border-radius: 16px;
    padding: 16px;
    transition: box-shadow 0.2s;
  }

  .about-tech-card:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  }

  .about-tech-card-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }

  .about-tech-card-icon.green { background: #e8f5ec; }
  .about-tech-card-icon.blue  { background: #e8f0fd; }
  .about-tech-card-icon.indigo{ background: #ede9fb; }
  .about-tech-card-icon.teal  { background: #e4f0f2; }

  .about-tech-card-name {
    font-size: 13px;
    font-weight: 700;
    color: #1a1f2e;
    margin-bottom: 4px;
  }

  .about-tech-card-desc {
    font-size: 11px;
    color: #9ca3af;
    line-height: 1.5;
    margin-bottom: 10px;
  }

  .about-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .about-tag {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    padding: 3px 6px;
    background: #f4f5f7;
    color: #6b7280;
    border-radius: 5px;
  }

  /* Why card */
  .about-why-card {
    background: #1a2e35;
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
  }

  .about-why-card::before {
    content: '';
    position: absolute;
    top: -30px;
    right: -30px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }

  .about-why-title {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 10px;
    letter-spacing: -0.3px;
  }

  .about-why-desc {
    font-size: 12px;
    color: rgba(255,255,255,0.6);
    line-height: 1.7;
    margin-bottom: 18px;
  }

  .about-why-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .about-why-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 12px;
    color: rgba(255,255,255,0.8);
    line-height: 1.5;
  }

  .about-why-check {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgba(74,222,128,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .about-why-check svg {
    width: 10px;
    height: 10px;
    stroke: #4ade80;
    stroke-width: 2.5;
    fill: none;
  }

  /* Bottom nav */
  .about-bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    border-top: 1px solid #e8eaed;
    padding: 8px 16px 16px;
    z-index: 50;
  }

  .about-bottom-nav-inner {
    max-width: 480px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .about-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    text-decoration: none;
    padding: 4px 10px;
    border-radius: 10px;
    transition: background 0.15s;
  }

  .about-nav-item:hover {
    background: #f4f5f7;
  }

  .about-nav-item svg {
    width: 20px;
    height: 20px;
    stroke-width: 1.8;
  }

  .about-nav-item span {
    font-size: 10px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
  }

  .about-nav-item.active svg { stroke: #1a2e35; }
  .about-nav-item.active span { color: #1a2e35; font-weight: 700; }
  .about-nav-item.inactive svg { stroke: #9ca3af; }
  .about-nav-item.inactive span { color: #9ca3af; }

  /* DB row */
  .about-db-row {
    display: flex;
    align-items: center;
    gap: 14px;
    background: #fff;
    border: 1px solid #e8eaed;
    border-radius: 14px;
    padding: 14px 16px;
    margin-bottom: 24px;
  }

  .about-db-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: #f0f4f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .about-db-icon svg {
    width: 18px;
    height: 18px;
    stroke: #4b7280;
    stroke-width: 1.8;
    fill: none;
  }

  .about-db-info { flex: 1; }

  .about-db-name {
    font-size: 14px;
    font-weight: 600;
    color: #1a1f2e;
  }

  .about-db-sub {
    font-size: 11px;
    color: #9ca3af;
  }

  .about-db-pill {
    font-size: 10px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 8px;
    background: #e4f0f2;
    color: #2a6675;
  }
`;

function About() {
  return (
    <>
      <style>{styles}</style>
      <div className="about-root">

        {/* Header */}
        <header className="about-header">
          <div className="about-header-inner">
            <div className="about-logo">
              <div className="about-logo-icon">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12"/></svg>
              </div>
              <span className="about-logo-text">SkillSync</span>
            </div>
            <div className="about-header-actions">
              <button className="about-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </button>
              <button className="about-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              </button>
              <div className="about-avatar">EA</div>
            </div>
          </div>
        </header>

        <main className="about-main">

          {/* Hero */}
          <div className="about-hero">
            <div className="about-hero-eyebrow">About the Project</div>
            <div className="about-hero-title">System Architecture</div>
            <div className="about-hero-sub">
              SkillSync uses a multi-service architecture to compare resumes with job descriptions, calculate match scores, and persist results for review.
            </div>
          </div>

          {/* Workflow */}
          <div className="about-section-label">System Workflow</div>
          <div className="about-workflow-card">
            <div className="about-workflow-steps">

              <div className="about-workflow-step">
                <div className="about-step-icon teal">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                </div>
                <div className="about-step-info">
                  <div className="about-step-title">Frontend Client</div>
                  <div className="about-step-desc">User submits resume and job description via React UI</div>
                </div>
                <div className="about-step-badge">React / Tailwind</div>
              </div>

              <div className="about-workflow-step">
                <div className="about-step-icon teal">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                </div>
                <div className="about-step-info">
                  <div className="about-step-title">Backend API</div>
                  <div className="about-step-desc">Spring Boot validates input, orchestrates services, persists results</div>
                </div>
                <div className="about-step-badge">Spring Boot</div>
              </div>

              <div className="about-workflow-step">
                <div className="about-step-icon teal">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
                </div>
                <div className="about-step-info">
                  <div className="about-step-title">AI Service</div>
                  <div className="about-step-desc">FastAPI computes TF-IDF cosine similarity & extracts skill gaps</div>
                </div>
                <div className="about-step-badge">FastAPI / ML</div>
              </div>

              <div className="about-workflow-step" style={{paddingBottom: 0}}>
                <div className="about-step-icon light">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4b7280"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                </div>
                <div className="about-step-info">
                  <div className="about-step-title">Persistence Layer</div>
                  <div className="about-step-desc">PostgreSQL stores match records for history & reporting</div>
                </div>
                <div className="about-step-badge">PostgreSQL</div>
              </div>

            </div>
          </div>

          {/* Tech stack */}
          <div className="about-section-label">Tech Stack</div>
          <div className="about-tech-grid">
            <div className="about-tech-card">
              <div className="about-tech-card-icon green">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d7a3f" strokeWidth="1.8"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
              </div>
              <div className="about-tech-card-name">Spring Boot</div>
              <div className="about-tech-card-desc">Main backend orchestration & REST layer</div>
              <div className="about-tags">
                <span className="about-tag">Java</span>
                <span className="about-tag">REST</span>
              </div>
            </div>

            <div className="about-tech-card">
              <div className="about-tech-card-icon blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a56c4" strokeWidth="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <div className="about-tech-card-name">FastAPI</div>
              <div className="about-tech-card-desc">AI analysis & cosine similarity scoring</div>
              <div className="about-tags">
                <span className="about-tag">Python</span>
                <span className="about-tag">ML</span>
              </div>
            </div>

            <div className="about-tech-card">
              <div className="about-tech-card-icon indigo">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5b3fc4" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              </div>
              <div className="about-tech-card-name">React</div>
              <div className="about-tech-card-desc">Frontend UI with Tailwind CSS styling</div>
              <div className="about-tags">
                <span className="about-tag">JSX</span>
                <span className="about-tag">Tailwind</span>
              </div>
            </div>

            <div className="about-tech-card">
              <div className="about-tech-card-icon teal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2a6675" strokeWidth="1.8"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
              </div>
              <div className="about-tech-card-name">PostgreSQL</div>
              <div className="about-tech-card-desc">Relational persistence for match records</div>
              <div className="about-tags">
                <span className="about-tag">SQL</span>
                <span className="about-tag">JPA</span>
              </div>
            </div>
          </div>

          {/* Why section */}
          <div className="about-section-label">Design Decisions</div>
          <div className="about-why-card">
            <div className="about-why-title">Why This Architecture?</div>
            <div className="about-why-desc">
              Built as a senior seminar project with clean separation of concerns — each layer owns a single responsibility, making the system easy to test, extend, and explain.
            </div>
            <ul className="about-why-list">
              <li className="about-why-item">
                <span className="about-why-check">
                  <svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg>
                </span>
                Clean separation between backend orchestration and AI logic
              </li>
              <li className="about-why-item">
                <span className="about-why-check">
                  <svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg>
                </span>
                Explainable scoring via TF-IDF and cosine similarity
              </li>
              <li className="about-why-item">
                <span className="about-why-check">
                  <svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg>
                </span>
                Persistent result storage for history and reporting
              </li>
            </ul>
          </div>

        </main>

        {/* Bottom Nav */}
        <nav className="about-bottom-nav">
          <div className="about-bottom-nav-inner">
            <Link className="about-nav-item inactive" to="/">
              <svg viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span>Home</span>
            </Link>
            <Link className="about-nav-item inactive" to="/analyze">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <span>Analyze</span>
            </Link>
            <Link className="about-nav-item active" to="/about">
              <svg viewBox="0 0 24 24" fill="none"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              <span>Stack</span>
            </Link>
            <Link className="about-nav-item inactive" to="/history">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>History</span>
            </Link>
            <Link className="about-nav-item inactive" to="/dashboard">
              <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              <span>Dashboard</span>
            </Link>
          </div>
        </nav>

      </div>
    </>
  );
}

export default About;