
import PropTypes from 'prop-types';

export const PlataformaDocente = ({ user, handleLogout }) => {
    return (
        <div>
            <h2>Plataforma Docente</h2>
            <p>Bienvenido, {user.nombre}. Esta es tu plataforma como docente.</p>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};


PlataformaDocente.propTypes = {
    user: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired
};