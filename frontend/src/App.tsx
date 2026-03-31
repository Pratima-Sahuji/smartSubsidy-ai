import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import FarmerFormPage from './pages/FarmerFormPage';
import EligibilityResultsPage from './pages/EligibilityResultsPage';
import AutoFillDemoPage from './pages/AutoFillDemoPage';
import RejectionDecoderPage from './pages/RejectionDecoderPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="form" element={<FarmerFormPage />} />
          <Route path="results" element={<EligibilityResultsPage />} />
          <Route path="autofill" element={<AutoFillDemoPage />} />
          <Route path="decoder" element={<RejectionDecoderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
