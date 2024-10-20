import PropTypes from 'prop-types';
import { Link, Outlet } from 'react-router-dom';

export const PlataformaDocente = ({ user, handleLogout }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="bg-indigo-600 text-white w-64 flex flex-col justify-between">
                <div className="mt-4">
                    <h2 className="text-2xl font-bold px-6">Docente</h2>
                    <div className="flex items-center p-6 justify-center flex-col">
                        {/* Contenido del perfil del usuario docente */}
                        <div className="flex items-center p-6 justify-center flex-col">
                            <img
                                src="https://media.licdn.com/dms/image/D4D03AQGu6EnQQHBoIw/profile-displayphoto-shrink_200_200/0/1703108166541?e=2147483647&v=beta&t=Nwz9lUsggiqVHZ5o8AC4Mn2UKeO_mvYsXHCfLqNjzPM"
                                alt="Foto de perfil"
                                className="h-50 w-50 rounded-full border-2 border-white"
                            />
                            {/* centrar los elementos */}
                            <div className="flex flex-col ml-4 justify-center">
                                <div className="flex space-x-2 mt-2 justify-center">
                                    <a href="#ver-perfil" className="text-white hover:text-indigo-300">
                                        <i className="bi bi-eye h-10 w-10"></i>
                                    </a>
                                    <a href="#editar-perfil" className="text-white hover:text-green-300">
                                        <i className="bi bi-pencil h-10 w-10"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav className="mt-6">
                        <Link to="/docente" className="block py-2.5 px-6 hover:bg-indigo-500 transition-all">
                            Inicio
                        </Link>
                        <Link to="/docente/asignaturas" className="block py-2.5 px-6 hover:bg-indigo-500 transition-all">
                            Asignaturas
                        </Link>
                        <Link to="/docente/contactos" className="block py-2.5 px-6 hover:bg-indigo-500 transition-all">
                            Contactos
                        </Link>
                        <Link to="/docente/mensajes" className="block py-2.5 px-6 hover:bg-indigo-500 transition-all">
                            Mensajes
                        </Link>
                        <Link to="#setting" className="block py-2.5 px-6 hover:bg-indigo-500 transition-all">
                            Configuraciones
                        </Link>
                    </nav>
                </div>
                <div className="px-6 py-4">
                    <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                        Cerrar sesión
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold">Bienvenido, {user.nombre}</h1>
                        <p className="text-sm text-gray-600">Email: {user.email}</p>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="border rounded-lg py-2 px-4 mr-4 focus:outline-none"
                        />
                        <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-full">
                            Notificaciones
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-6 bg-gray-50">
                    <Outlet /> {/* Aquí se cargan otros componentes según la ruta */}
                </main>
            </div>
        </div>
    );
};

PlataformaDocente.propTypes = {
    user: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired,
};
