import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Eventos from './pages/Eventos';
import Cultos from './pages/Cultos';
import Devocional from './pages/Devocional';
import Contato from './pages/Contato';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminEventos from './pages/admin/AdminEventos';
import AdminCultos from './pages/admin/AdminCultos';
import AdminDevocional from './pages/admin/AdminDevocional';

// Layout Components
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="cultos" element={<Cultos />} />
          <Route path="devocional" element={<Devocional />} />
          <Route path="contato" element={<Contato />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="eventos" element={<AdminEventos />} />
          <Route path="cultos" element={<AdminCultos />} />
          <Route path="devocional" element={<AdminDevocional />} />
        </Route>

        {/* Catch all - 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;