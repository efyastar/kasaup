import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LogoPill from '../components/LogoPill';
import './SessionSetup.css';

export default function SessionSetup() {
  const navigate = useNavigate();
  const { classroomId } = useParams();
  const isQuick = classroomId === 'quick';

  const [tab, setTab] = useState('paste');
  const [sessionName, setSessionName] = useState('');
  const [articleText, setArticleText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [fileName, setFileName] = useState(null);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setArticleText(val);
    setWordCount(val.trim() ? val.trim().split(/\s+/).length : 0);
  };

  const handleFile = (file) => {
    if (!file || file.type !== 'application/pdf') return;
    setFileName(file.name);
  };

  const handleStart = () => {
    if (!isQuick && !sessionName.trim()) {
      document.getElementById('sessionNameInput').focus();
      return;
    }
    navigate(`/live/${classroomId}`, {
      state: {
        sessionName: isQuick ? 'Quick session' : sessionName,
        article: articleText,
      },
    });
  };

  return (
    <div className="setup-page">

      <div className="setup-nav">
        <LogoPill />
        <button className="btn-soft" onClick={() => navigate(isQuick ? '/' : '/sessions')}>
          ← Back
        </button>
      </div>

      <div className="setup-heading rise">
        <h1>
          {isQuick ? 'Quick session' : <>Set up your <em>session</em></>}
        </h1>
        <p>
          {isQuick
            ? 'No account needed. Nothing gets saved. Just start listening.'
            : 'Add your reading before class starts.'}
        </p>
      </div>

      <div className="setup-card rise" style={{ animationDelay: '0.1s' }}>

        {!isQuick && (
          <div className="field">
            <label>What is today's topic or focus?</label>
            <input
              id="sessionNameInput"
              className="input-field"
              type="text"
              placeholder="e.g. Labelling theory and deviance"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
            />
          </div>
        )}

        <div className="sep">
          <div className="sep-line" />
          <span className="sep-label">Your reading (optional)</span>
          <div className="sep-line" />
        </div>

        <div className="tab-toggle">
          <button
            className={`tab-btn ${tab === 'paste' ? 'on' : ''}`}
            onClick={() => setTab('paste')}
          >
            Paste text
          </button>
          <button
            className={`tab-btn ${tab === 'upload' ? 'on' : ''}`}
            onClick={() => setTab('upload')}
          >
            Upload PDF
          </button>
        </div>

        {tab === 'paste' && (
          <div>
            <textarea
              className="paste-area"
              placeholder="Paste your assigned reading here..."
              value={articleText}
              onChange={handleTextChange}
            />
            <div className="word-count">{wordCount} {wordCount === 1 ? 'word' : 'words'}</div>
          </div>
        )}

        {tab === 'upload' && (
          <div>
            {!fileName ? (
              <div
                className="drop-zone"
                onClick={() => document.getElementById('fileInput').click()}
              >
                <p><strong>Click to upload</strong> or drag your PDF here</p>
                <p className="drop-sub">PDF only, max 20MB</p>
                <input
                  type="file"
                  id="fileInput"
                  accept=".pdf"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFile(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="file-chosen">
                <span>{fileName}</span>
                <span className="file-remove" onClick={() => setFileName(null)}>x</span>
              </div>
            )}
          </div>
        )}

      </div>

      <button
        className="btn-primary rise"
        style={{ animationDelay: '0.18s' }}
        onClick={handleStart}
      >
        Start listening session
      </button>

      <p className="privacy-note rise" style={{ animationDelay: '0.22s' }}>
        Your reading stays on your device — we never store it.
      </p>

    </div>
  );
}