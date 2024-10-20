
import PropTypes from 'prop-types';

export const PlataformaEstudiante = ({ user, handleLogout }) => {
    return (
        <div>
            <h2>Plataforma Estudiante</h2>
            <p>Bienvenido, {user.nombre}. Esta es tu plataforma como estudiante.</p>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Cerrar sesión</button>

            {/* <a href="#tareas" className="block py-2.5 px-6 hover:bg-indigo-500 transition-all">
                            Tareas
                        </a>
                        <a href="#examenes" className="block py-2.5 px-6 hover:bg-indigo-500 transition-all">
                            Exámenes
                        </a>
                        <a href="#materiales" className="block py-2.5 px-6 hover:bg-indigo-500 transition-all">
                            Materiales
                        </a>
                        <a href="#estudiantes" className="block py-2.5 px-6 hover:bg-indigo-500 transition-all">
                            Estudiantes
                        </a>
                        <a href="#calificaciones" className="block py-2.5 px-6 hover:bg-indigo-500 transition-all">
                            Calificaciones
                        </a> */}
        </div>
    );
};

PlataformaEstudiante.propTypes = {
    user: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired
};
