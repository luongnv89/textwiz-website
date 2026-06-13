import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { siteBasename } from './lib/siteBasename';
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import FeedbackPage from './pages/FeedbackPage';
import ChangelogPage from './pages/ChangelogPage';
import GettingStartedPage from './pages/GettingStartedPage';
import ApiKeysRedirect from './pages/ApiKeysRedirect';

function App() {
  return (
    <BrowserRouter basename={siteBasename}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/getting-started" element={<GettingStartedPage />} />
          <Route path="/api-keys" element={<ApiKeysRedirect />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
