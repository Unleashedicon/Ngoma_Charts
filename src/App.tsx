import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { LandingPage } from './LandingPage';

const ChartsApp   = lazy(() => import('./charts/NgomaCharts'));
const AsakePage   = lazy(() =>
  import('./pages/AsakeForgiveness').then((m) => ({ default: m.AsakeForgiveness }))
);

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
        <Route
          path="/asake"
          element={
            <Suspense fallback={<div style={{ background: '#030303', minHeight: '100vh' }} />}>
              <AsakePage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
