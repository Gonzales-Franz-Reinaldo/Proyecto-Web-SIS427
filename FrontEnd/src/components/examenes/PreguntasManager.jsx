import { useEffect, useState } from 'react';
import { getPreguntasByExamen, deletePregunta } from '../../services/preguntasService';
import PreguntaModal from './PreguntaModal';
import PropTypes from 'prop-types';

export const PreguntasManager = ({ examen, onClose }) => {
    const [preguntas, setPreguntas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPreguntaModalOpen, setIsPreguntaModalOpen] = useState(false);
    const [editingPregunta, setEditingPregunta] = useState(null);

    useEffect(() => {
        const fetchPreguntas = async () => {
            try {
                const data = await getPreguntasByExamen(examen.id);
                setPreguntas(data);
            } catch (error) {
                console.error('Error al obtener preguntas:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPreguntas();
    }, [examen.id]);

    const handleDeletePregunta = async (id) => {
        try {
            await deletePregunta(id);
            setPreguntas((prev) => prev.filter((pregunta) => pregunta.id !== id));
        } catch (error) {
            console.error('Error al eliminar pregunta:', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">{`Preguntas de ${examen.titulo}`}</h2>
            <button
                onClick={() => {
                    setEditingPregunta(null); // Asegurarse de que no hay una pregunta seleccionada
                    setIsPreguntaModalOpen(true);
                }}
                className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded"
            >
                Añadir Pregunta
            </button>
            {loading ? (
                <p>Cargando preguntas...</p>
            ) : preguntas.length > 0 ? (
                <div className="space-y-4">
                    {preguntas.map((pregunta) => (
                        <div key={pregunta.id} className="bg-white shadow-md p-4 rounded">
                            <h3 className="text-lg font-bold">{pregunta.texto}</h3>
                            <p className="text-sm text-gray-500">Tipo: {pregunta.tipo}</p>
                            <p className="text-sm text-gray-500">Puntuación: {pregunta.puntuacion}</p>
                            <div className="mt-2 flex justify-between">
                                <button
                                    onClick={() => {
                                        setEditingPregunta(pregunta);
                                        setIsPreguntaModalOpen(true);
                                    }}
                                    className="text-blue-600 hover:underline"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeletePregunta(pregunta.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay preguntas creadas para este examen.</p>
            )}

            {/* Modal para crear o editar pregunta */}
            {isPreguntaModalOpen && (
                <PreguntaModal
                    isOpen={isPreguntaModalOpen}
                    onClose={() => setIsPreguntaModalOpen(false)}
                    onSave={(newPregunta) => {
                        setPreguntas((prev) => {
                            if (editingPregunta) {
                                // Actualizar pregunta existente
                                return prev.map((pregunta) =>
                                    pregunta.id === newPregunta.id ? newPregunta : pregunta
                                );
                            } else {
                                // Añadir nueva pregunta
                                return [...prev, newPregunta];
                            }
                        });
                        setIsPreguntaModalOpen(false); // Cerrar modal después de guardar
                        setEditingPregunta(null); // Reiniciar edición
                    }}
                    examenId={examen.id}
                    pregunta={editingPregunta}
                />
            )}
            <button
                onClick={onClose}
                className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
                Volver
            </button>
        </div>
    );
};

PreguntasManager.propTypes = {
    examen: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};
