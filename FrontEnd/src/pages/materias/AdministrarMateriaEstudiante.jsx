import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TareasMateriaEstudiante } from './TareasMateriaEstudiante';
import { MaterialesMateriaEstudiante } from './MaterialesMateriaEstudiante';
import { ExamenesMateriaEstudiante } from './ExamenesMateriaEstudiante';
import { CursosMateriaEstudiante } from './CursosMateriaEstudiante';

export const AdministrarMateriaEstudiante = () => {
    const location = useLocation();
    const { materia } = location.state;
    const [activeSection, setActiveSection] = useState('Tareas');

    const renderSection = () => {
        switch (activeSection) {
            case 'Tareas':
                return <TareasMateriaEstudiante idAsignatura={materia.id} />;
            case 'Materiales':
                return <MaterialesMateriaEstudiante idAsignatura={materia.id} />;
            case 'Exámenes':
                return <ExamenesMateriaEstudiante idAsignatura={materia.id} />;
            case 'Cursos':
                return <CursosMateriaEstudiante idAsignatura={materia.id} />;
            default:
                return <TareasMateriaEstudiante idAsignatura={materia.id} />;
        }
    };

    return (
        <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen">
            {/* Header */}
            <header className="mb-6 bg-purple-700 text-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold">{materia.nombre}</h2>
                    <p className="text-lg text-purple-200">{materia.descripcion}</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <p className="text-sm text-purple-300">Curso: {materia.curso}</p>
                </div>
            </header>

            {/* Navigation */}
            <nav className="mb-6 flex justify-center space-x-6">
                {['Tareas', 'Materiales', 'Exámenes', 'Cursos'].map((section) => (
                    <button
                        key={section}
                        onClick={() => setActiveSection(section)}
                        className={`px-6 py-3 font-bold rounded-full shadow-md transition transform hover:scale-110 ${
                            activeSection === section
                                ? 'bg-purple-700 text-white'
                                : 'bg-purple-100 text-purple-700'
                        }`}
                    >
                        {section}
                    </button>
                ))}
            </nav>

            {/* Section Content */}
            <div className="bg-white p-8 rounded-lg shadow-xl transform transition-all duration-300 hover:shadow-2xl">
                {renderSection()}
            </div>
        </div>
    );
};
