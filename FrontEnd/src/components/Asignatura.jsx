import { NavLink, Outlet, useParams } from 'react-router-dom';

export const Asignatura = () => {
    const { id, nombre } = useParams(); 

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-indigo-700 text-white py-4 shadow-lg">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Asignatura de {nombre}</h1>
                    <span className="text-sm">Gestiona todo lo relacionado con esta asignatura</span>
                </div>
            </header>

            {/* Navigation for Asignatura sections */}
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-6 py-3">
                    <ul className="flex space-x-6">
                        <li>
                            <NavLink 
                                to={`/docente/asignatura/${id}/tareas`} 
                                className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
                            >
                                Tareas
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to={`/docente/asignatura/${id}/examenes`} 
                                className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
                            >
                                Exámenes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to={`/docente/asignatura/${id}/materiales`} 
                                className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
                            >
                                Materiales
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to={`/docente/asignatura/${id}/estudiantes`} 
                                className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
                            >
                                Estudiantes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to={`/docente/asignatura/${id}/calificaciones`} 
                                className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
                            >
                                Calificaciones
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main content */}
            <main className="flex-1 p-6 bg-gray-50 overflow-auto">
                <Outlet /> {/* Aquí se cargan dinámicamente las secciones */}
            </main>
        </div>
    );
};
