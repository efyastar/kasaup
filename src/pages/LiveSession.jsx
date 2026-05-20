import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LiveSession.css';
import { getSuggestions, getNotes } from '../lib/claude';

export default function LiveSession() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const sessionName = state?.sessionName || 'Session';
  const article     = state?.article || '';

  // ── State ──────────────────────────────────────────────
  const [listening, setListening]     = useState(false);
  const [seconds, setSeconds]         = useState(0);
  const [transcript, setTranscript]   = useState('');
  const [interim, setInterim]         = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSugg, setLoadingSugg] = useState(false);
  const [usedIds, setUsedIds]         = useState(new Set());
  const [ending, setEnding]           = useState(false);

  const recognitionRef = useRef(null);
  const transcriptRef  = useRef('');
  const timerRef       = useRef(null);
  const transcriptBox  = useRef(null);

  // ── Timer ──────────────────────────────────────────────
  useEffect(() => {
    if (listening) {
      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [listening]);

  // ── Format timer ───────────────────────────────────────
  const formatTime = (s) => {
    const m   = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${m}:${sec}`;
  };

  // ── Start mic ──────────────────────────────────────────
  const startListening = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition only works in Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous     = true;
    recognition.interimResults = true;
    recognition.lang           = 'en-US';

    recognition.onresult = (event) => {
      let finalText   = '';
      let interimText = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalText += text + ' ';
        } else {
          interimText += text;
        }
      }

      if (finalText) {
        transcriptRef.current += finalText;
        setTranscript(transcriptRef.current);
      }

      setInterim(interimText);

      if (transcriptBox.current) {
        transcriptBox.current.scrollTop = transcriptBox.current.scrollHeight;
      }
    };

    recognition.onend = () => {
      if (recognitionRef.current) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, []);

  // ── Stop mic ───────────────────────────────────────────
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setListening(false);
  }, []);

  // ── Toggle mic ─────────────────────────────────────────
  const toggleMic = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // ── Fetch suggestions from Claude ──────────────────────
  const fetchSuggestions = useCallback(async () => {
    if (!transcriptRef.current.trim() || loadingSugg) return;
    setLoadingSugg(true);
    try {
      const results = await getSuggestions(
        transcriptRef.current.slice(-800),
        article
      );
      setSuggestions(Array.isArray(results) ? results : []);
    } catch (err) {
      console.error('Suggestion error:', err);
    } finally {
      setLoadingSugg(false);
    }
  }, [article, loadingSugg]);

  // ── Auto-suggest every 45 seconds ─────────────────────
  useEffect(() => {
    if (listening) {
      const autoSuggest = setInterval(() => {
        fetchSuggestions();
      }, 45000);
      return () => clearInterval(autoSuggest);
    }
  }, [listening, fetchSuggestions]);

  // ── Mark suggestion as used ────────────────────────────
  const markUsed = (id) => {
    setUsedIds((prev) => new Set([...prev, id]));
  };

  // ── End session ────────────────────────────────────────
  const endSession = async () => {
    stopListening();
    setEnding(true);

    if (!transcriptRef.current.trim()) {
      navigate('/');
      return;
    }

    try {
      const notes = await getNotes(
        transcriptRef.current,
        article
      );
      navigate('/summary', {
        state: {
          notes,
          duration: formatTime(seconds),
          sessionName,
        },
      });
    } catch (err) {
      console.error('Notes error:', err);
      alert('Notes error: ' + err.message);
      navigate('/');
    }
  };

  return (
    <div className="live-page">

      {/* Topbar */}
      <div className="live-topbar">
        <div className="live-session-info">
          <span className="live-session-label">Now listening</span>
          <span className="live-session-name">{sessionName}</span>
        </div>
        <div className="live-top-right">
          <div className="live-timer">{formatTime(seconds)}</div>
          <button className="end-btn" onClick={endSession} disabled={ending}>
            {ending ? 'Saving...' : 'End'}
          </button>
        </div>
      </div>

      {/* Mic button */}
      <div className="mic-section">
        <div className={`mic-wrap ${listening ? 'listening' : ''}`}>
          <div className="pulse-ring" />
          <div className="pulse-ring" />
          <button className="mic-btn" onClick={toggleMic} disabled={ending}>
            {listening ? (
              <svg viewBox="0 0 24 24" width="26" height="26" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round">
                <line x1="10" y1="15" x2="10" y2="9" />
                <line x1="14" y1="15" x2="14" y2="9" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="26" height="26" stroke="white" fill="none" strokeWidth="1.8" strokeLinecap="round">
                <rect x="9" y="2" width="6" height="11" rx="3" />
                <path d="M5 10a7 7 0 0014 0" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="8" y1="22" x2="16" y2="22" />
              </svg>
            )}
          </button>
        </div>
        <div className="mic-status">
          {listening && <div className="live-dot" />}
          <span>
            {ending
              ? 'Generating your notes...'
              : listening
              ? 'Listening...'
              : seconds > 0
              ? 'Paused — tap to resume'
              : 'Tap to start listening'}
          </span>
        </div>
      </div>

      {/* Transcript */}
      <div className="transcript-section">
        <div className="label-caps" style={{ marginBottom: 8 }}>
          Live transcript
        </div>
        <div className="transcript-box" ref={transcriptBox}>
          {!transcript && !interim ? (
            <p className="transcript-empty">
              Transcript will appear here once you start listening.
            </p>
          ) : (
            <>
              <p className="transcript-text">{transcript}</p>
              {interim && (
                <p className="transcript-interim">{interim}</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div className="suggestions-section">
        <div className="suggestions-head">
          <div className="label-caps">Suggestions for you</div>
          <button
            className="btn-soft"
            onClick={fetchSuggestions}
            disabled={loadingSugg || !transcript.trim() || ending}
          >
            {loadingSugg ? 'Thinking...' : 'Suggest now'}
          </button>
        </div>

        <div className="suggestion-cards">
          {!suggestions || suggestions.length === 0 ? (
            <div className="no-suggestions">
              Start listening and KasaUp will suggest what you can say.
            </div>
          ) : (
            suggestions.map((s) => (
              <div
                key={s.id}
                className={`suggestion-card ${usedIds.has(s.id) ? 'used' : ''}`}
              >
                <span className={`suggestion-type type-${s.type}`}>
                  {s.label}
                </span>
                <span className="suggestion-text">{s.text}</span>
                <button
                  className="used-btn"
                  onClick={() => markUsed(s.id)}
                  disabled={usedIds.has(s.id)}
                >
                  {usedIds.has(s.id) ? 'Used' : 'Mark used'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}