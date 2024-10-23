import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
// importar los estilos de indexedDB.css 
import './index.css';
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { PlataformaEstudiante } from "./components/PlataformaEstudiante";
import { PlataformaDocente } from "./components/PlataformaDocente";
import { Asignatura } from "./components/Asignatura";
import { Asignaturas } from "./components/Asignaturas";
import { Contactos } from "./components/Contactos";
import { Mensajes } from './components/Mensajes';
import { Tareas } from './components/Tareas';
import { Examenes } from './components/Examenes';
import { Materiales } from './components/Materiales';
import { Estudiantes } from './components/Estudiantes';
import { Calificaciones } from './components/Calificaciones';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/protected', { withCredentials: true })
      .then(response => setUser(response.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/estudiante" element={user?.rol === 'Estudiante' ? <PlataformaEstudiante user={user} handleLogout={handleLogout} /> : <Login setUser={setUser} />} />

        {/* Ruta de docente */}
        <Route path="/docente" element={user?.rol === 'Docente' ? <PlataformaDocente user={user} handleLogout={handleLogout} /> : <Login setUser={setUser} />}>
          <Route path="asignaturas" element={<Asignaturas userId={user?.id} />} />
          <Route path="asignatura/:id/:nombre" element={<Asignatura />}>
            {/* Rutas anidadas dentro de la asignatura */}
            <Route path="tareas" element={<Tareas />} />
            <Route path="examenes" element={<Examenes />} />
            <Route path="materiales" element={<Materiales />} />
            <Route path="estudiantes" element={<Estudiantes />} />
            <Route path="calificaciones" element={<Calificaciones />} />
          </Route>

          <Route path="contactos" element={<Contactos />} />
          <Route path="mensajes" element={<Mensajes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
