// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { PlataformaEstudiante } from "./components/PlataformaEstudiante";
import { PlataformaDocente } from "./components/PlataformaDocente";

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
        <Route path="/docente" element={user?.rol === 'Docente' ? <PlataformaDocente user={user} handleLogout={handleLogout} /> : <Login setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
