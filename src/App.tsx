import DamageCalculatorPage from './pages/DamageCalculatorPage';
import Layout from './features/Layout';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { ConvertFromOldServicePage } from './pages/ConvertFromOldServicePage';
import { ConfigProvider, ThemeConfig } from 'antd';
import { DEFAULT_FORM_BORDER_COLOR } from './data/constants';

const theme: ThemeConfig = {
  components: {
    Input: {
      colorBorder: DEFAULT_FORM_BORDER_COLOR,
      addonBg: '#f3f3f3'
    },
    Select: {
      colorBorder: DEFAULT_FORM_BORDER_COLOR
    },
    InputNumber: {
      colorBorder: DEFAULT_FORM_BORDER_COLOR,
      addonBg: '#f3f3f3'
    },
    Button: {
      colorBorder: DEFAULT_FORM_BORDER_COLOR
    },
    Table: {
      borderColor: 'black'
    }
  }
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DamageCalculatorPage />} />
            <Route path="/convert-from-old-service" element={<ConvertFromOldServicePage />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
