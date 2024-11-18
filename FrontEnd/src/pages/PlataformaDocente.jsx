import { useState } from 'react';
import NavbarDocente from '../components/NavbarDocente';
import HeaderDocente from '../components/HeaderDocente';
import MateriasDocente from './MateriasDocente';
import { InicioDocente } from '../components/docente/InicioDocente';
import { MensajesDocente } from '../components/docente/MensajesDocente';
import { PerfilDocente } from '../components/docente/PerfilDocente';
import { ConfiguracionDocente } from '../components/docente/ConfiguracionDocente';

export const PlataformaDocente = () => {
    const [activeSection, setActiveSection] = useState('Inicio');

    const renderContent = () => {
        switch (activeSection) {
            case 'Inicio':
                return <InicioDocente />;
            case 'Perfil':
                return <PerfilDocente />;
            case 'Materias':
                return <MateriasDocente />;
            case 'Mensajes':
                return <MensajesDocente />;
            case 'Configuración':
                return <ConfiguracionDocente />;
            default:
                return <InicioDocente />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Navbar para navegación */}
            <NavbarDocente activeSection={activeSection} setActiveSection={setActiveSection} />
            <div className="flex-1 flex flex-col">
                {/* Header con información del docente */}
                <HeaderDocente activeSection={activeSection} />
                <div className="p-6">{renderContent()}</div>
            </div>
        </div>
    );
};


