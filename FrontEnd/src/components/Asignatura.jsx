import { useParams } from 'react-router-dom';

export const Asignatura = () => {
    const { id } = useParams(); // Obtener el id de la asignatura desde la URL

    return (
        <div>
            <h2>Detalles de la Asignatura {id}</h2>
            <p>Esta es la página de la asignatura.</p>

            <nav>
                <a href="#tareas" className="block py-2.5 px-6 hover:bg-indigo-500 transition-all">
                    Tareas
                </a>
                <a href="#examenes" className="block py-2.5 px-6 hover:bg-indigo-500 transition-all">
                    Exámenes
                </a>
                <a href="#materiales" className="block py-2.5 px-6 hover:bg-indigo-500 transition-all">
                    Materiales
                </a>
                <a href="#estudiantes" className="block py-2.5 px-6 hover:bg-indigo-500 transition-all">
                    Estudiantes
                </a>
                <a href="#calificaciones" className="block py-2.5 px-6 hover:bg-indigo-500 transition-all">
                    Calificaciones
                </a>
            </nav>
        </div>
    )
}
