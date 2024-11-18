import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        ci: '',
        telefono: '',
        password: '',
        rol: 'estudiante',
        especialidad: '',
        nivel_academico: '',
        experiencia: 0,
        categoria: '',
        matricula: '',
        carrera: '',
        cu: '',
        fecha_ingreso: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/auth/register', formData);
            alert('Registro exitoso. Ahora inicia sesión.');
            navigate('/login');
        } catch (error) {
            console.error('Error al registrarse:', error);
            alert('Error al registrarse. Inténtalo de nuevo.');
        }
    };

    return (
        <motion.div
            className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 120 }}
            >
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Registro</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="nombre"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        name="apellido"
                        placeholder="Apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Correo Electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        name="ci"
                        placeholder="Cédula de Identidad"
                        value={formData.ci}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        name="telefono"
                        placeholder="Teléfono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <select
                        name="rol"
                        value={formData.rol}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="estudiante">Estudiante</option>
                        <option value="docente">Docente</option>
                    </select>

                    {/* Campos específicos para docentes */}
                    {formData.rol === 'docente' && (
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <input
                                name="especialidad"
                                placeholder="Especialidad"
                                value={formData.especialidad}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                name="nivel_academico"
                                placeholder="Nivel Académico"
                                value={formData.nivel_academico}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                name="experiencia"
                                type="number"
                                placeholder="Años de Experiencia"
                                value={formData.experiencia}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                name="categoria"
                                placeholder="Categoría"
                                value={formData.categoria}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </motion.div>
                    )}

                    {/* Campos específicos para estudiantes */}
                    {formData.rol === 'estudiante' && (
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <input
                                name="matricula"
                                placeholder="Matrícula"
                                value={formData.matricula}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                name="carrera"
                                placeholder="Carrera"
                                value={formData.carrera}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                name="cu"
                                placeholder="Carnet Universitario"
                                value={formData.cu}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                name="fecha_ingreso"
                                type="date"
                                placeholder="Fecha de Ingreso"
                                value={formData.fecha_ingreso}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Registrarse
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default Register;
