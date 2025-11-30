import DamageCalculatorPage from './pages/DamageCalculatorPage';
import Layout from './features/Layout';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { ConvertFromOldServicePage } from './pages/ConvertFromOldServicePage';
import NewsPage from './pages/NewsPage';
import RelatedSitesPage from './pages/RelatedSitesPage';
import { SnackbarProvider } from './hooks/useSnackbar';

function App() {
  return (
    <SnackbarProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DamageCalculatorPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/related-sites" element={<RelatedSitesPage />} />
            <Route path="/convert-from-old-service" element={<ConvertFromOldServicePage />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Layout>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
