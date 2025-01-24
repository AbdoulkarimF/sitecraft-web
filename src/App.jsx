import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy loading des composants
const DragDropEditor = lazy(() => import('./components/editor/DragDropEditor'));

// Composant de fallback pour le chargement
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/editor" element={<DragDropEditor />} />
                <Route path="/" element={
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-center mb-8">
                      Bienvenue sur SiteCraft
                    </h1>
                    <div className="text-center">
                      <a
                        href="/editor"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                      >
                        Créer un nouveau site
                      </a>
                    </div>
                  </div>
                } />
              </Routes>
            </div>
          </Suspense>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
