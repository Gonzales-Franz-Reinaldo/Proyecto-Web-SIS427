import { useState } from 'react';
import '../styles/Register.css';
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
                    navigate('/');
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
        <div className="register-container">
            <h2>Formulario de Registro</h2>
            <form onSubmit={handleSubmit}>
                {/* Campos comunes */}
                <div className="input-box">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Introduzca nombre"
                        required
                        onChange={e => setValues({ ...values, nombre: e.target.value })}
                    />
                </div>
                <div className="input-box">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        placeholder="Introduzca apellido"
                        required
                        onChange={e => setValues({ ...values, apellido: e.target.value })}
                    />
                </div>
                <div className="input-box">
                    <label>CI:</label>
                    <input
                        type="text"
                        placeholder="Introduzca CI"
                        required
                        onChange={e => setValues({ ...values, ci: e.target.value })}
                    />
                </div>
                <div className="input-box">
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        placeholder="Introduzca su teléfono"
                        required
                        onChange={e => setValues({ ...values, telefono: e.target.value })}
                    />
                </div>
                <div className="input-box">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Introduzca email"
                        required
                        onChange={e => setValues({ ...values, email: e.target.value })}
                    />
                </div>
                <div className="input-box">
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Introduzca contraseña"
                        required
                        onChange={e => setValues({ ...values, password: e.target.value })}
                    />
                </div>
                <div className="input-box">
                    <label>Rol:</label>
                    <select
                        onChange={e => setValues({ ...values, rol: e.target.value })}
                        required
                    >
                        <option value="">Seleccionar rol</option>
                        <option value="Docente">Docente</option>
                        <option value="Estudiante">Estudiante</option>
                    </select>
                </div>

                {/* Campos específicos para Docente */}
                {values.rol === 'Docente' && (
                    <>
                        <div className="input-box">
                            <label>Especialidad:</label>
                            <input
                                type="text"
                                placeholder="Introduzca especialidad"
                                required
                                onChange={e => setValues({ ...values, especialidad: e.target.value })}
                            />
                        </div>
                        <div className="input-box">
                            <label>Nivel Académico:</label>
                            <input
                                type="text"
                                placeholder="Introduzca nivel académico"
                                required
                                onChange={e => setValues({ ...values, nivel_academico: e.target.value })}
                            />
                        </div>
                        <div className="input-box">
                            <label>Experiencia:</label>
                            <input
                                type="number"
                                placeholder="Introduzca años de experiencia"
                                required
                                onChange={e => setValues({ ...values, experiencia: e.target.value })}
                            />
                        </div>
                        <div className="input-box">
                            <label>Categoría:</label>
                            <input
                                type="text"
                                placeholder="Introduzca categoría"
                                required
                                onChange={e => setValues({ ...values, categoria: e.target.value })}
                            />
                        </div>
                    </>
                )}

                {/* Campos específicos para Estudiante */}
                {values.rol === 'Estudiante' && (
                    <>
                        <div className="input-box">
                            <label>Matrícula:</label>
                            <input
                                type="text"
                                placeholder="Introduzca matrícula"
                                required
                                onChange={e => setValues({ ...values, matricula: e.target.value })}
                            />
                        </div>
                        <div className="input-box">
                            <label>Carrera:</label>
                            <select name="" id=""
                                onChange={e => setValues({ ...values, carrera: e.target.value })}
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
                        <div className="input-box">
                            <label>CU:</label>
                            <input
                                type="text"
                                placeholder="Introduzca carnet universitario (CU)"
                                required
                                onChange={e => setValues({ ...values, cu: e.target.value })}
                            />
                        </div>
                    </>
                )}

                <button type="submit" className="signup-btn">Registrarse</button>
                <p>Estás de acuerdo con nuestros términos y políticas.</p>

                <Link to="/login" className="login-btn">Login</Link>
            </form>
        </div>
    );
};
