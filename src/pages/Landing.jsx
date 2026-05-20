import { useNavigate } from 'react-router-dom';
import LogoPill from '../components/LogoPill';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">

      {/* Nav */}
      <nav className="landing-nav">
        <LogoPill />
        <button className="btn-soft">Sign in</button>
      </nav>

      {/* Hero */}
      <main className="landing-hero">

        <div className="hero-tag rise">For students, in the room</div>

        <h1 className="hero-title rise" style={{ animationDelay: '0.08s' }}>
          Your voice,<br /><em>right when</em><br />you need it
        </h1>

        <p className="hero-sub rise" style={{ animationDelay: '0.14s' }}>
          KasaUp listens to your seminar, reads your assigned article,
          and whispers exactly what you can say — and when to say it.
        </p>

        {/* CTAs */}
        <div className="cta-group rise" style={{ animationDelay: '0.2s' }}>
          <button className="btn-primary">
            Get started — it is free
          </button>
          <button className="btn-ghost" onClick={() => navigate('/setup/quick')}>
            Try a quick session
            </button>
          <p className="no-account-note">Quick session — no account needed</p>
        </div>

      </main>

      {/* Features */}
      <section className="features rise" style={{ animationDelay: '0.28s' }}>

        <div className="feature-row">
          <div className="feature-icon icon-rose"></div>
          <div className="feature-text">
            <h4>Listens in real time</h4>
            <p>Transcribes the room as the discussion unfolds, no typing needed.</p>
          </div>
        </div>

        <div className="feature-row">
          <div className="feature-icon icon-green"></div>
          <div className="feature-text">
            <h4>Knows your reading</h4>
            <p>Upload the assigned article and suggestions are grounded in the text.</p>
          </div>
        </div>

        <div className="feature-row">
          <div className="feature-icon icon-purple"></div>
          <div className="feature-text">
            <h4>Remembers every class</h4>
            <p>Named sessions build a recap so you walk in prepared every time.</p>
          </div>
        </div>

      </section>

      <footer className="landing-footer">
        Made for the student who has something to say — KasaUp 2025
      </footer>

    </div>
  );
}