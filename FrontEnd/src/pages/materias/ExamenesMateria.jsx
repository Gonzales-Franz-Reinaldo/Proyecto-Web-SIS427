import { useEffect, useState } from 'react';
import { getExamenesByAsignatura, deleteExamen, publicarExamen } from '../../services/examenesService';
import ExamenModal from '../../components/examenes/ExamenModal';
import { PreguntasManager } from '../../components/examenes/PreguntasManager';
import PropTypes from 'prop-types';

export const ExamenesMateria = ({ idAsignatura }) => {
    const [examenes, setExamenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isExamenModalOpen, setIsExamenModalOpen] = useState(false);
    const [selectedExamen, setSelectedExamen] = useState(null);

    useEffect(() => {
        const fetchExamenes = async () => {
            try {
                const data = await getExamenesByAsignatura(idAsignatura);
                setExamenes(data);
            } catch (error) {
                console.error('Error al obtener exámenes:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchExamenes();
    }, [idAsignatura]);

    const handleDeleteExamen = async (id) => {
        try {
            await deleteExamen(id);
            setExamenes((prev) => prev.filter((examen) => examen.id !== id));
        } catch (error) {
            console.error('Error al eliminar examen:', error);
        }
    };

    const handlePublishExamen = async (id) => {
        try {
            const updatedExamen = await publicarExamen(id); // Cambiar estado del examen a "publicado"
            setExamenes((prev) =>
                prev.map((examen) => (examen.id === updatedExamen.id ? updatedExamen : examen))
            );
        } catch (error) {
            console.error('Error al publicar examen:', error);
        }
    };

    const handleEditExamen = (examen) => {
        setSelectedExamen(examen);
        setIsExamenModalOpen(true);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Gestión de Exámenes</h2>
                <button
                    onClick={() => {
                        setSelectedExamen(null); // Asegurarse de que no hay un examen seleccionado
                        setIsExamenModalOpen(true);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                    Crear Examen
                </button>
            </div>

            {loading ? (
                <p>Cargando exámenes...</p>
            ) : examenes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {examenes.map((examen) => (
                        <div key={examen.id} className="bg-white shadow-md p-4 rounded">
                            <h3 className="text-lg font-bold">{examen.titulo}</h3>
                            <p>{examen.descripcion}</p>
                            <p className="text-sm text-gray-500">Fecha de Entrega: {examen.fecha_entrega}</p>
                            <p className="text-sm text-gray-500">Duración: {examen.duracion} minutos</p>
                            {/* Estado */}
                            <p className="text-sm text-gray-500">Estado: {examen.estado}</p>
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => handleEditExamen(examen)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => setSelectedExamen(examen)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Ver Preguntas
                                </button>
                                <button
                                    onClick={() => handleDeleteExamen(examen.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Eliminar
                                </button>
                                {examen.estado === 'borrador' && (
                                    <button
                                        onClick={() => handlePublishExamen(examen.id)}
                                        className="text-green-600 hover:underline"
                                    >
                                        Publicar
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay exámenes creados para esta materia.</p>
            )}

            {/* Modal para crear o editar examen */}
            {isExamenModalOpen && (
                <ExamenModal
                    isOpen={isExamenModalOpen}
                    onClose={() => {
                        setIsExamenModalOpen(false);
                        setSelectedExamen(null);
                    }}
                    onSave={(updatedOrNewExamen) => {
                        setExamenes((prev) => {
                            const isEditing = !!selectedExamen; // Verificar si es edición o creación
                            if (isEditing) {
                                // Reemplazar examen existente
                                return prev.map((examen) =>
                                    examen.id === updatedOrNewExamen.id ? updatedOrNewExamen : examen
                                );
                            } else {
                                // Agregar nuevo examen
                                return [...prev, updatedOrNewExamen];
                            }
                        });
                        setIsExamenModalOpen(false);
                    }}

                    idAsignatura={idAsignatura}
                    examen={selectedExamen}
                />

            )}

            {/* Gestionar preguntas del examen seleccionado */}
            {selectedExamen && (
                <PreguntasManager
                    examen={selectedExamen}
                    onClose={() => setSelectedExamen(null)}
                />
            )}
        </div>
    );
};

ExamenesMateria.propTypes = {
    idAsignatura: PropTypes.number.isRequired,
};