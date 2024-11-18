import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            login(response.data); // Actualiza el estado global con los datos del usuario
            if (response.data.user.rol === 'docente') {
                navigate('/teacher');
            } else {
                navigate('/student');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Correo o contraseña incorrecta.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-blue-600 to-indigo-700">
            <motion.div
                className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="flex flex-col items-center mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center shadow-md">
                        <i className="fas fa-user text-white text-3xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-4">Iniciar Sesión</h2>
                </motion.div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div
                        className="relative"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </motion.div>
                    <motion.div
                        className="relative"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </motion.div>
                    <motion.button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Entrar
                    </motion.button>
                </form>
                <div className="flex justify-between items-center mt-4">
                    <a href="/register" className="text-sm text-indigo-600 hover:underline">
                        ¿No tienes cuenta? Regístrate aquí
                    </a>
                    <a href="#" className="text-sm text-gray-600 hover:underline">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
