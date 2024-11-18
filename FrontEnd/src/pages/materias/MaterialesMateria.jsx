import { useEffect, useState } from 'react';
import { getMaterialesByAsignatura, createMaterial, updateMaterial, deleteMaterial } from '../../services/materialesService';
import { MaterialModal } from '../../components/materiales/MaterialModal';
import PropTypes from 'prop-types';

export const MaterialesMateria = ({ idAsignatura }) => {
    const [materiales, setMateriales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState(null);

    useEffect(() => {
        const fetchMateriales = async () => {
            try {
                const data = await getMaterialesByAsignatura(idAsignatura);
                setMateriales(data);
            } catch (error) {
                console.error('Error al obtener materiales:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMateriales();
    }, [idAsignatura]);

    const handleCreateOrUpdateMaterial = async (material) => {
        try {
            if (editingMaterial) {
                await updateMaterial(editingMaterial.id, material);
            } else {
                await createMaterial({ ...material, id_asignatura: idAsignatura });
            }
            setIsModalOpen(false);
            setEditingMaterial(null);
            const updatedMateriales = await getMaterialesByAsignatura(idAsignatura);
            setMateriales(updatedMateriales);
        } catch (error) {
            console.error('Error al guardar el material:', error);
        }
    };

    const handleDeleteMaterial = async (id) => {
        try {
            await deleteMaterial(id);
            const updatedMateriales = await getMaterialesByAsignatura(idAsignatura);
            setMateriales(updatedMateriales);
        } catch (error) {
            console.error('Error al eliminar material:', error);
        }
    };

    if (loading) return <p>Cargando materiales...</p>;

    return (
        <div className="container" style={{ padding: '20px' }}>
            <button
                onClick={() => {
                    setEditingMaterial(null);
                    setIsModalOpen(true);
                }}
                className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded"
            >
                Subir Material
            </button>
            {materiales.map((material) => (
                <div key={material.id} className="bg-white shadow-md p-4 mb-4 rounded">
                    <h3 className="text-lg font-bold">{material.titulo}</h3>
                    <p>{material.descripcion}</p>
                    <a
                        href={`http://localhost:3000/uploads/${material.archivo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Descargar archivo
                    </a>
                    <div className="mt-2 flex space-x-4">
                        <button
                            onClick={() => {
                                setEditingMaterial(material);
                                setIsModalOpen(true);
                            }}
                            className="text-blue-600 hover:underline"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDeleteMaterial(material.id)}
                            className="text-red-600 hover:underline"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}

            <MaterialModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateOrUpdateMaterial}
                material={editingMaterial}
            />
        </div>
    );
};

MaterialesMateria.propTypes = {
    idAsignatura: PropTypes.number.isRequired,
};
