import DamageCalculatorPage from './pages/DamageCalculatorPage';
import Layout from './features/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConvertFromOldServicePage } from './pages/ConvertFromOldServicePage';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DamageCalculatorPage />} />
          <Route path="/convert-from-old-service" element={<ConvertFromOldServicePage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
