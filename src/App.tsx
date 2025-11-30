import DamageCalculatorPage from './pages/DamageCalculatorPage';
import Layout from './features/Layout';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { ConvertFromOldServicePage } from './pages/ConvertFromOldServicePage';
import { SnackbarProvider } from './hooks/useSnackbar';

function App() {
  return (
    <SnackbarProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DamageCalculatorPage />} />
            <Route path="/convert-from-old-service" element={<ConvertFromOldServicePage />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Layout>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
