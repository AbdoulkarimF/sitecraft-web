import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TestComponents from './pages/TestComponents';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/test" element={<TestComponents />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Route>
  ),
  {
    future: {
      v7_relativeSplatPath: true
    }
  }
);

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;
