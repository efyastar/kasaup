import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PostSession.css';

export default function PostSession() {
  const navigate  = useNavigate();
  const { state } = useLocation();
  const [tab, setTab] = useState('summary');

  const notes       = state?.notes       || {};
  const duration    = state?.duration    || '00:00';
  const sessionName = state?.sessionName || 'Session';

  return (
    <div className="post-page">

      {/* Header */}
      <div className="post-header">
        <div className="post-header-top">
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Home
          </button>
          <div className="post-duration">{duration}</div>
        </div>
        <div className="post-session-label">Session complete</div>
        <h1 className="post-session-title">{sessionName}</h1>
        <div className="post-stats">
          <div className="post-stat">
            <span className="stat-val">{notes.quotes?.length || 0}</span>
            <span className="stat-label">Key quotes</span>
          </div>
          <div className="stat-divider" />
          <div className="post-stat">
            <span className="stat-val">{notes.concepts?.length || 0}</span>
            <span className="stat-label">Concepts</span>
          </div>
          <div className="stat-divider" />
          <div className="post-stat">
            <span className="stat-val">{notes.unresolved?.length || 0}</span>
            <span className="stat-label">Open questions</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="post-tabs-wrap">
        <div className="post-tabs">
          {['summary', 'notes', 'quotes'].map((t) => (
            <button
              key={t}
              className={`post-tab ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="post-content">

        {/* Summary tab */}
        {tab === 'summary' && (
          <div className="fade-in">
            <div className="post-card">
              <div className="label-caps" style={{ marginBottom: 8 }}>
                Discussion overview
              </div>
              <p className="post-text">
                {notes.summary || 'No summary available.'}
              </p>
            </div>

            {notes.unresolved?.length > 0 && (
              <div className="post-card" style={{ marginTop: 10 }}>
                <div className="label-caps" style={{ marginBottom: 10 }}>
                  Unresolved questions
                </div>
                <ul className="notes-list">
                  {notes.unresolved.map((u, i) => (
                    <li key={i}>{u}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Notes tab */}
        {tab === 'notes' && (
          <div className="fade-in">
            {notes.concepts?.length > 0 && (
              <div className="post-card">
                <h4 className="notes-heading">Core concepts</h4>
                <ul className="notes-list">
                  {notes.concepts.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            )}

            {notes.arguments?.length > 0 && (
              <div className="post-card" style={{ marginTop: 10 }}>
                <h4 className="notes-heading">Key arguments</h4>
                <ul className="notes-list">
                  {notes.arguments.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
            )}

            {notes.followUp?.length > 0 && (
              <div className="post-card" style={{ marginTop: 10 }}>
                <h4 className="notes-heading">Worth following up</h4>
                <ul className="notes-list">
                  {notes.followUp.map((f, i) => (
                    <li key={i}>
                      <strong>{f.title}</strong> — {f.note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Quotes tab */}
        {tab === 'quotes' && (
          <div className="fade-in">
            {notes.quotes?.length > 0 ? (
              <div className="post-card">
                <div className="label-caps" style={{ marginBottom: 10 }}>
                  Key quotes
                </div>
                {notes.quotes.map((q, i) => (
                  <div key={i} className="quote-item">
                    <p className="quote-text">"{q.text}"</p>
                    <span className="quote-speaker">{q.speaker}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="post-card">
                <p className="post-text" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                  No quotes were captured in this session.
                </p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* CTA */}
      <div className="post-cta">
        <button className="btn-primary" onClick={() => navigate('/')}>
          Back to home
        </button>
      </div>

    </div>
  );
}