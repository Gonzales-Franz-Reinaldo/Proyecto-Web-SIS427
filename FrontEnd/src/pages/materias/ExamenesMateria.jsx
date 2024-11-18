import { useEffect, useState } from 'react';
import { getExamenesByAsignatura, createExamen, updateExamen, deleteExamen } from '../../services/examenesService';
import { CreateExamModal } from '../../components/examenes/CreateExamModal';
import { ExamenCard } from '../../components/examenes/ExamenCard';
import PropTypes from 'prop-types';

export const ExamenesMateria = ({ idAsignatura }) => {
    const [examenes, setExamenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExam, setEditingExam] = useState(null);

    useEffect(() => {
        const fetchExamenes = async () => {
            try {
                const data = await getExamenesByAsignatura(idAsignatura);
                setExamenes(data);
            } catch (error) {
                console.error('Error al obtener los exámenes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExamenes();
    }, [idAsignatura]);

    const handleCreateOrUpdateExam = async (exam) => {
        try {
            if (editingExam) {
                await updateExamen(editingExam.id, exam);
            } else {
                await createExamen({ ...exam, id_asignatura: idAsignatura });
            }
            setIsModalOpen(false);
            setEditingExam(null);
            const updatedExamenes = await getExamenesByAsignatura(idAsignatura);
            setExamenes(updatedExamenes);
        } catch (error) {
            console.error('Error al guardar el examen:', error);
        }
    };

    const handleDeleteExam = async (id) => {
        try {
            await deleteExamen(id);
            const updatedExamenes = await getExamenesByAsignatura(idAsignatura);
            setExamenes(updatedExamenes);
        } catch (error) {
            console.error('Error al eliminar el examen:', error);
        }
    };

    if (loading) return <p>Cargando exámenes...</p>;

    return (
        <div className="container mx-auto">
            <button
                onClick={() => {
                    setEditingExam(null);
                    setIsModalOpen(true);
                }}
                className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700"
            >
                Crear Examen
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {examenes.map((examen) => (
                    <ExamenCard
                        key={examen.id}
                        examen={examen}
                        onEdit={() => {
                            setEditingExam(examen);
                            setIsModalOpen(true);
                        }}
                        onDelete={() => handleDeleteExam(examen.id)}
                    />
                ))}
            </div>
            <CreateExamModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateOrUpdateExam}
                exam={editingExam}
            />
        </div>
    );
};


ExamenesMateria.propTypes = {
    idAsignatura: PropTypes.number.isRequired,
    examenes: PropTypes.arrayOf(PropTypes.object).isRequired,
};