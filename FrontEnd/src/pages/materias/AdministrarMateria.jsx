import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TareasMateria } from './TareasMateria';
import { MaterialesMateria } from './MaterialesMateria';
import { CursosMateria } from './CursosMateria';
import { ExamenesMateria } from './ExamenesMateria';
import { EstudiantesMateria } from './EstudiantesMateria';
import { CalificacionesMateria } from './CalificacionesMateria';

const AdministrarMateria = () => {
    const location = useLocation();
    const { nombre, id } = location.state; // Nombre de la materia desde el estado
    const [activeSection, setActiveSection] = useState('Tareas');

    const renderSection = () => {
        switch (activeSection) {
            case 'Tareas':
                return <TareasMateria idAsignatura={id}/>;
            case 'Materiales':
                return <MaterialesMateria idAsignatura={id}/>;
            case 'Cursos':
                return <CursosMateria />;
            case 'Exámenes':
                return <ExamenesMateria idAsignatura={id}/>;
            case 'Estudiantes':
                return <EstudiantesMateria />;
            case 'Calificaciones':
                return <CalificacionesMateria />;
            default:
                return <TareasMateria idAsignatura={id}/>;
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-r from-gray-100 to-gray-200">
            {/* Encabezado */}
            <header className="bg-indigo-700 text-white p-5 shadow-lg flex justify-between items-center transition-transform duration-500 transform hover:scale-100">
                <h2 className="text-2xl font-extrabold tracking-wide">{nombre}</h2>
                <nav className="space-x-6 text-lg font-medium">
                    <button
                        onClick={() => setActiveSection('Tareas')}
                        className={`px-4 py-2 rounded-lg transition ${
                            activeSection === 'Tareas'
                                ? 'bg-white text-indigo-700 shadow-lg'
                                : 'hover:bg-indigo-500 hover:text-white'
                        }`}
                    >
                        Tareas
                    </button>
                    <button
                        onClick={() => setActiveSection('Materiales')}
                        className={`px-4 py-2 rounded-lg transition ${
                            activeSection === 'Materiales'
                                ? 'bg-white text-indigo-700 shadow-lg'
                                : 'hover:bg-indigo-500 hover:text-white'
                        }`}
                    >
                        Materiales
                    </button>
                    <button
                        onClick={() => setActiveSection('Cursos')}
                        className={`px-4 py-2 rounded-lg transition ${
                            activeSection === 'Cursos'
                                ? 'bg-white text-indigo-700 shadow-lg'
                                : 'hover:bg-indigo-500 hover:text-white'
                        }`}
                    >
                        Cursos
                    </button>
                    <button
                        onClick={() => setActiveSection('Exámenes')}
                        className={`px-4 py-2 rounded-lg transition ${
                            activeSection === 'Exámenes'
                                ? 'bg-white text-indigo-700 shadow-lg'
                                : 'hover:bg-indigo-500 hover:text-white'
                        }`}
                    >
                        Exámenes
                    </button>
                    <button
                        onClick={() => setActiveSection('Estudiantes')}
                        className={`px-4 py-2 rounded-lg transition ${
                            activeSection === 'Estudiantes'
                                ? 'bg-white text-indigo-700 shadow-lg'
                                : 'hover:bg-indigo-500 hover:text-white'
                        }`}
                    >
                        Estudiantes
                    </button>
                    <button
                        onClick={() => setActiveSection('Calificaciones')}
                        className={`px-4 py-2 rounded-lg transition ${
                            activeSection === 'Calificaciones'
                                ? 'bg-white text-indigo-700 shadow-lg'
                                : 'hover:bg-indigo-500 hover:text-white'
                        }`}
                    >
                        Calificaciones
                    </button>
                </nav>
            </header>

            {/* Sección principal */}
            <main className="flex-1 p-6 overflow-auto">
                <div
                    className="bg-white p-8 rounded-lg shadow-md transform transition-all duration-500 hover:scale-100 hover:shadow-xl"
                    style={{
                        animation: 'fadeIn 0.5s ease-in-out',
                    }}
                >
                    {renderSection()}
                </div>
            </main>

            {/* Animación personalizada */}
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default AdministrarMateria;
