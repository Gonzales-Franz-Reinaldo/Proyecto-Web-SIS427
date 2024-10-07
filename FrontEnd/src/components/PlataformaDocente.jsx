
// eslint-disable-next-line react/prop-types
export const PlataformaDocente = ({handleLogout}) => {
    return (
        <div>
            <h2>Plataforma Docente</h2>
            <p>Bienvenido a la plataforma del docente Franz Gonzales.</p>
            <button onClick={handleLogout} >Cerrar Sesión</button>
        </div>
    );
};

