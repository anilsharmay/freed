import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Feed from './pages/Feed';
import PostNew from './pages/PostNew';
import PostSuccess from './pages/PostSuccess';
import Thread from './pages/Thread';
import Guidelines from './pages/Guidelines';
import Privacy from './pages/Privacy';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav">
          <Link to="/" className="logo">Freed</Link>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/guidelines" style={{ fontSize: '0.875rem', color: '#94a3b8', textDecoration: 'none' }}>Guidelines</Link>
            <Link to="/post" className="btn btn-small" style={{ textDecoration: 'none', backgroundColor: '#3b82f6', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 'bold' }}>Post</Link>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/post" element={<PostNew />} />
            <Route path="/post/success" element={<PostSuccess />} />
            <Route path="/thread/:id" element={<Thread />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>Freed — Heal from the things you don't talk about.</p>
          <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Link to="/guidelines" style={{ color: '#94a3b8' }}>Guidelines</Link>
            <Link to="/privacy" style={{ color: '#94a3b8' }}>Privacy</Link>
          </div>
          <div className="crisis-banner" style={{ marginTop: '1.5rem', padding: '1rem' }}>
            If you're in crisis, reach out: <a href="https://988lifeline.org" target="_blank" rel="noopener noreferrer">988</a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
