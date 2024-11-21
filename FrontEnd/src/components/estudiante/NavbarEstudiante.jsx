import PropTypes from 'prop-types';
import '../../styles/NavbarEstudiante.css';

const NavbarEstudiante = ({ activeSection, setActiveSection, logout }) => {
    const menuItems = [
        { label: 'Inicio', icon: '🏠' },
        { label: 'Perfil', icon: '👤' },
        { label: 'Mis Materias', icon: '📚' },
        { label: 'Contactos', icon: '📞' },
        { label: 'Mensajes', icon: '✉️' },
    ];

    return (
        <nav className="w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col items-center py-8 shadow-md">
            <div className="text-3xl font-semibold mb-8 text-gray-300">Estudiante</div>
            <ul className="flex-1 w-full space-y-6">
                {menuItems.map((item) => (
                    <li
                        key={item.label}
                        onClick={() => setActiveSection(item.label)}
                        className={`cursor-pointer p-4 text-lg rounded-lg flex items-center justify-start space-x-3 transition-all duration-300 hover:bg-gray-600 hover:shadow-lg ${
                            activeSection === item.label ? 'bg-gray-600 text-gray-100' : ''
                        }`}
                    >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </li>
                ))}
            </ul>
            <button
                className="mt-8 px-6 py-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 hover:scale-105 transition"
                onClick={logout}
            >
                Cerrar Sesión
            </button>
        </nav>
    );
};

NavbarEstudiante.propTypes = {
    activeSection: PropTypes.string.isRequired,
    setActiveSection: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};

export default NavbarEstudiante;
