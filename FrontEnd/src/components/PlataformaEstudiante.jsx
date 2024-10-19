
import PropTypes from 'prop-types';

export const PlataformaEstudiante = ({ user, handleLogout }) => {
    return (
        <div>
            <h2>Plataforma Estudiante</h2>
            <p>Bienvenido, {user.nombre}. Esta es tu plataforma como estudiante.</p>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

PlataformaEstudiante.propTypes = {
    user: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired
};
