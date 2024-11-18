import { useEffect, useState } from 'react';
import { getTareasByAsignatura, createTarea, updateTarea, deleteTarea } from '../../services/tareasService';
import { CreateTaskModal } from '../../components/tareas/CreateTaskModal';
import PropTypes from 'prop-types';

export const TareasMateria = ({ idAsignatura }) => {
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    // const idAsignatura = 1; 

    useEffect(() => {
        const fetchTareas = async () => {
            try {
                const data = await getTareasByAsignatura(idAsignatura);
                setTareas(data);
            } catch (error) {
                console.error('Error al obtener tareas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTareas();
    }, [idAsignatura]);

    const handleCreateOrUpdateTask = async (task) => {
        try {
            if (editingTask) {
                await updateTarea(editingTask.id, task);
            } else {
                await createTarea({ ...task, id_asignatura: idAsignatura });
            }
            setIsModalOpen(false);
            setEditingTask(null);
            const updatedTareas = await getTareasByAsignatura(idAsignatura);
            setTareas(updatedTareas);
        } catch (error) {
            console.error('Error al guardar la tarea:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTarea(id);
            const updatedTareas = await getTareasByAsignatura(idAsignatura);
            setTareas(updatedTareas);
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
        }
    };

    if (loading) return <p>Cargando tareas...</p>;

    return (
        <div className="container" style={{ padding: '20px' }}>
            <button
                onClick={() => {
                    setEditingTask(null);
                    setIsModalOpen(true);
                }}
                className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded"
            >
                Crear Tarea
            </button>
            {tareas.map((tarea) => (
                <div key={tarea.id} className="bg-white shadow-md p-4 mb-4 rounded">
                    <h3 className="text-lg font-bold">{tarea.titulo}</h3>
                    <p>{tarea.descripcion}</p>
                    <p className="text-sm text-gray-500">Fecha de entrega: {tarea.fecha_entrega}</p>
                    {tarea.archivo_docente && (
                        <a
                            href={`http://localhost:3000/uploads/${tarea.archivo_docente}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Ver archivo
                        </a>
                    )}
                    <div className="mt-2 flex space-x-4">
                        <button
                            onClick={() => {
                                setEditingTask(tarea);
                                setIsModalOpen(true);
                            }}
                            className="text-blue-600 hover:underline"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDeleteTask(tarea.id)}
                            className="text-red-600 hover:underline"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}

            <CreateTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateOrUpdateTask}
                tarea={editingTask}
            />
        </div>
    );
};

TareasMateria.propTypes = {
    idAsignatura: PropTypes.number.isRequired,
};