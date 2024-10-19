import { useState } from 'react';
// import '../styles/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {

    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        ci: '',
        email: '',
        telefono: '',
        password: '',
        rol: '',

        // Campos adicionales segun el rol
        // Docente 
        especialidad: '',
        nivel_academico: '',
        experiencia: '',
        categoria: '',
        // Estudiante 
        matricula: '',
        carrera: '',
        cu: '',
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(values);

        axios.post('http://localhost:3000/register', values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate('/');  // Redirige al login
                } else {
                    console.log("Error:", res.data);
                    alert("Error: " + res.data.Error);
                }
            })
            .catch(err => {
                console.error("Error de red o de servidor:", err);
                alert("Error de red o de servidor: " + err);
            });


    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-indigo-600 py-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-26 transform transition duration-300 hover:scale-105">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Formulario de Registro</h2>
                <form onSubmit={handleSubmit}>
                    {/* Campos comunes */}
                    <div className="mb-4">
                        <label className="block text-gray-600">Nombre:</label>
                        <input
                            type="text"
                            placeholder="Introduzca nombre"
                            required
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => setValues({ ...values, nombre: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">Apellido:</label>
                        <input
                            type="text"
                            placeholder="Introduzca apellido"
                            required
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => setValues({ ...values, apellido: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">CI:</label>
                        <input
                            type="text"
                            placeholder="Introduzca CI"
                            required
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => setValues({ ...values, ci: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">Teléfono:</label>
                        <input
                            type="text"
                            placeholder="Introduzca su teléfono"
                            required
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => setValues({ ...values, telefono: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">Email:</label>
                        <input
                            type="email"
                            placeholder="Introduzca email"
                            required
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => setValues({ ...values, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">Password:</label>
                        <input
                            type="password"
                            placeholder="Introduzca contraseña"
                            required
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => setValues({ ...values, password: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">Rol:</label>
                        <select
                            onChange={e => setValues({ ...values, rol: e.target.value })}
                            required
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Seleccionar rol</option>
                            <option value="Docente">Docente</option>
                            <option value="Estudiante">Estudiante</option>
                        </select>
                    </div>

                    {/* Campos específicos para Docente */}
                    {values.rol === 'Docente' && (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-600">Especialidad:</label>
                                <input
                                    type="text"
                                    placeholder="Introduzca especialidad"
                                    required
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={e => setValues({ ...values, especialidad: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">Nivel Académico:</label>
                                <input
                                    type="text"
                                    placeholder="Introduzca nivel académico"
                                    required
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={e => setValues({ ...values, nivel_academico: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">Experiencia:</label>
                                <input
                                    type="number"
                                    placeholder="Introduzca años de experiencia"
                                    required
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={e => setValues({ ...values, experiencia: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">Categoría:</label>
                                <input
                                    type="text"
                                    placeholder="Introduzca categoría"
                                    required
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={e => setValues({ ...values, categoria: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    {/* Campos específicos para Estudiante */}
                    {values.rol === 'Estudiante' && (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-600">Matrícula:</label>
                                <input
                                    type="text"
                                    placeholder="Introduzca matrícula"
                                    required
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={e => setValues({ ...values, matricula: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">Carrera:</label>
                                <select
                                    onChange={e => setValues({ ...values, carrera: e.target.value })}
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Seleccionar carrera</option>
                                    <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                                    <option value="Ingeniería en Ciencias de la Computación">Ingeniería en Ciencias de la Computación</option>
                                    <option value="Ingeniería en Información y Seguridad">Ingeniería en Información y Seguridad</option>
                                    <option value="Ingeniería en Telecomunicaciones">Ingeniería en Telecomunicaciones</option>
                                    <option value="Ingeniería en Diseño y Animación">Ingeniería en Diseño y Animación</option>
                                    <option value="Ingeniería en Informática">Ingeniería en Informática</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">CU:</label>
                                <input
                                    type="text"
                                    placeholder="Introduzca carnet universitario (CU)"
                                    required
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={e => setValues({ ...values, cu: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">
                        Registrarse
                    </button>
                    <p className="text-center text-gray-600 mt-4">Estás de acuerdo con nuestros términos y políticas.</p>

                    <Link to="/" className="block text-center text-blue-600 hover:text-blue-800 font-semibold mt-2">
                        Login
                    </Link>
                </form>
            </div>
        </div>
    );


};

