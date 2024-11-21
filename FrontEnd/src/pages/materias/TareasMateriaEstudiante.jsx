import { useEffect, useState } from 'react';
import { getTareasByMateria } from '../../services/tareasService';
import PropTypes from 'prop-types';

export const TareasMateriaEstudiante = ({ idAsignatura }) => {
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTareas = async () => {
            try {
                const data = await getTareasByMateria(idAsignatura);
                setTareas(data);
            } catch (error) {
                console.error('Error al cargar las tareas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTareas();
    }, [idAsignatura]);

    if (loading) {
        return <div className="text-center text-gray-500">Cargando tareas...</div>;
    }

    if (tareas.length === 0) {
        return <div className="text-center text-gray-500">No hay tareas disponibles.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tareas.map((tarea) => (
                <div
                    key={tarea.id}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
                >
                    <h3 className="text-xl font-bold text-purple-700">{tarea.titulo}</h3>
                    <p className="text-gray-600 mt-2">{tarea.descripcion}</p>
                    <div className="mt-4 text-sm text-gray-500">
                        <p><strong>Fecha de Publicación:</strong> {new Date(tarea.fecha_publicacion).toLocaleDateString()}</p>
                        <p><strong>Fecha de Entrega:</strong> {new Date(tarea.fecha_entrega).toLocaleDateString()}</p>
                    </div>
                    {tarea.archivo_docente && (
                        <a
                        href={`http://localhost:3000/uploads/${tarea.archivo_docente}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-4 text-purple-500 underline hover:text-purple-700"
                        >
                            Ver Archivo
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
};

TareasMateriaEstudiante.propTypes = {
    idAsignatura: PropTypes.number.isRequired,
};
