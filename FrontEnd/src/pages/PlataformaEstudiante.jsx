import { useState } from 'react';
import NavbarEstudiante from '../components/estudiante/NavbarEstudiante';
import HeaderEstudiante from '../components/estudiante/HeaderEstudiante';
import MateriasEstudiante  from '../components/estudiante/MateriasEstudiante';

export const PlataformaEstudiante = () => {
    const [activeSection, setActiveSection] = useState('Inicio');

    const renderContent = () => {
        switch (activeSection) {
            case 'Inicio':
                return <div className="p-6">Bienvenido a tu plataforma de aprendizaje. Explora tus materias y recursos.</div>;
            case 'Perfil':
                return <div className="p-6">Aquí puedes editar tu perfil.</div>;
            case 'Mis Materias':
                return <MateriasEstudiante />;
            case 'Contactos':
                return <div className="p-6">Aquí puedes gestionar tus contactos.</div>;
            case 'Mensajes':
                return <div className="p-6">Aquí puedes leer tus mensajes.</div>;
            default:
                return <div className="p-6">Bienvenido a tu plataforma de aprendizaje.</div>;
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-b from-blue-40 to-blue-100">
            <NavbarEstudiante activeSection={activeSection} setActiveSection={setActiveSection} />
            <div className="flex-1 flex flex-col">
                <HeaderEstudiante />
                <div className="p-6">{renderContent()}</div>
            </div>
        </div>
    );
};


