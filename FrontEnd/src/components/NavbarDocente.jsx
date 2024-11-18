import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const NavbarDocente = ({ activeSection, setActiveSection }) => {
    const sections = [
        { name: 'Inicio', icon: 'fas fa-home' },
        { name: 'Perfil', icon: 'fas fa-user' },
        { name: 'Materias', icon: 'fas fa-book' },
        { name: 'Mensajes', icon: 'fas fa-envelope' },
        { name: 'Configuración', icon: 'fas fa-cog' },
    ];

    return (
        <motion.div
            className="w-64 bg-indigo-700 text-white flex flex-col items-center py-6 shadow-md"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-2xl font-bold mb-10">Docente</h1>
            <nav className="flex flex-col w-full">
                {sections.map((section) => (
                    <button
                        key={section.name}
                        onClick={() => setActiveSection(section.name)}
                        className={`w-full px-4 py-3 flex items-center space-x-4 hover:bg-indigo-600 transition ${
                            activeSection === section.name ? 'bg-indigo-600' : ''
                        }`}
                    >
                        <i className={`${section.icon} text-lg`}></i>
                        <span className="text-lg">{section.name}</span>
                    </button>
                ))}
            </nav>
        </motion.div>
    );
};

NavbarDocente.propTypes = {
    activeSection: PropTypes.string.isRequired,
    setActiveSection: PropTypes.func.isRequired,
};

export default NavbarDocente;
