import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout';
import { useAuthStore } from './stores/auth.store';

import LoginPage from './pages/login-page';
import HomePage from './pages/home-page';
import AcervoPage from './pages/acervo-page';
import LivrosFormPage from './pages/livros-form-page';
import RevistasFormPage from './pages/revistas-form-page';
import UsuariosPage from './pages/usuarios-page';
import UsuariosFormPage from './pages/usuarios-form-page';
import EmprestimosPage from './pages/emprestimos-page';
import EmprestimosFormPage from './pages/emprestimos-form-page';
import RelatoriosPage from './pages/relatorios-page';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/acervo" element={<PrivateRoute><AcervoPage /></PrivateRoute>} />
      <Route path="/livros/novo" element={<PrivateRoute><LivrosFormPage /></PrivateRoute>} />
      <Route path="/livros/:id/editar" element={<PrivateRoute><LivrosFormPage /></PrivateRoute>} />
      <Route path="/revistas/novo" element={<PrivateRoute><RevistasFormPage /></PrivateRoute>} />
      <Route path="/revistas/:id/editar" element={<PrivateRoute><RevistasFormPage /></PrivateRoute>} />
      <Route path="/usuarios" element={<PrivateRoute><UsuariosPage /></PrivateRoute>} />
      <Route path="/usuarios/novo" element={<PrivateRoute><UsuariosFormPage /></PrivateRoute>} />
      <Route path="/usuarios/:id/editar" element={<PrivateRoute><UsuariosFormPage /></PrivateRoute>} />
      <Route path="/emprestimos" element={<PrivateRoute><EmprestimosPage /></PrivateRoute>} />
      <Route path="/emprestimos/novo" element={<PrivateRoute><EmprestimosFormPage /></PrivateRoute>} />
      <Route path="/relatorios" element={<PrivateRoute><RelatoriosPage /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
