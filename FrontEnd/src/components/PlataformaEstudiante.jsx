
// eslint-disable-next-line react/prop-types
export const PlataformaEstudiante = ({ handleLogout }) => {
    return (
        <div>
            <h2>Plataforma Estudiante</h2>
            <p>Bienvenido a la plataforma del estudiante.</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};
