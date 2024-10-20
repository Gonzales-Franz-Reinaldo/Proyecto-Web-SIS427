import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { PlataformaEstudiante } from "./components/PlataformaEstudiante";
import { PlataformaDocente } from "./components/PlataformaDocente";
import { Asignatura } from "./components/Asignatura";
import { Asignaturas } from "./components/Asignaturas";  // Asegúrate de importar el componente
import { Contactos } from "./components/Contactos";
import { Mensajes } from './components/Mensajes';

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
        <Route path="/docente" element={user?.rol === 'Docente' ? <PlataformaDocente user={user} handleLogout={handleLogout} /> : <Login setUser={setUser} />}>
          <Route path="asignaturas" element={<Asignaturas userId={user?.id} />} /> {/* Cargará las asignaturas */}
          <Route path="asignatura/:id" element={<Asignatura />} /> 
          <Route path="contactos" element={<Contactos />} />
          <Route path="mensajes" element={<Mensajes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
