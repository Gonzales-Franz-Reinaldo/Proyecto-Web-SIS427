import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { PlataformaEstudiante } from './pages/PlataformaEstudiante';
import { PlataformaDocente } from './pages/PlataformaDocente';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import AdministrarMateria from './pages/materias/AdministrarMateria';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Ruta por defecto redirige al login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <PlataformaEstudiante />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher"
            element={
              <ProtectedRoute>
                <PlataformaDocente />
              </ProtectedRoute>
            }
          />
          {/* Nueva ruta para administrar materias */}
          <Route
            path="/materias/:id"
            element={
              <ProtectedRoute>
                <AdministrarMateria />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
