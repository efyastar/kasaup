import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';

import Landing from './pages/Landing';
import SessionSetup from './pages/SessionSetup';
import LiveSession from './pages/LiveSession';
import PostSession from './pages/PostSession';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                   element={<Landing />} />
        <Route path="/setup/:classroomId" element={<SessionSetup />} />
        <Route path="/live/:classroomId"  element={<LiveSession />} />
        <Route path="/summary"            element={<PostSession />} />
        <Route path="*"                   element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;