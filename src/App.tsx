import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { LandingPage } from './LandingPage';

const ChartsApp = lazy(() => import('./charts/NgomaCharts'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/app"
          element={
            <Suspense fallback={<div style={{ background: '#fff', minHeight: '100vh' }} />}>
              <ChartsApp />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
