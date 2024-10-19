import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';



// eslint-disable-next-line react/prop-types
export const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault(); // Evita el refresco de la página
        try {
            const response = await axios.post('http://localhost:3000/login', { email, password }, { withCredentials: true });
            setUser(response.data);
    
            if (response.data.rol === 'Estudiante') {
                navigate('/estudiante');
            } else if (response.data.rol === 'Docente') {
                navigate('/docente');
            }
        } catch (error) {
            console.error('Error en el login:', error);
            alert('Credenciales incorrectas');
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 transform transition duration-300 hover:scale-105">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-600">Email</label>
                        <input 
                            type="email" 
                            placeholder="Ingresa tu Email" 
                            required
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">Contraseña</label>
                        <input 
                            type="password" 
                            placeholder="Ingresa tu Contraseña" 
                            required
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-300"
                    >
                        Iniciar Sesión
                    </button>
                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                    <p className="text-center mt-4">¿No tienes cuenta?</p>
                    <Link to="/register" className="block text-center text-purple-600 hover:text-purple-800 font-semibold mt-2">
                        Registrarse
                    </Link>
                </form>
            </div>
        </div>
    );
};