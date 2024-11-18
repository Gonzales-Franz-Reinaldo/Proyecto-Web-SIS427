import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const MaterialModal = ({ isOpen, onClose, onSave, material }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        archivo: null,
    });

    // Sincronizar los datos del formulario cuando cambia el prop `material`
    useEffect(() => {
        if (material) {
            setFormData({
                titulo: material.titulo || '',
                descripcion: material.descripcion || '',
                archivo: null, // No rellenamos el archivo existente, solo lo mostramos
            });
        } else {
            setFormData({
                titulo: '',
                descripcion: '',
                archivo: null,
            });
        }
    }, [material]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, archivo: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{material ? 'Editar Material' : 'Subir Material'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Título</label>
                        <input
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Descripción</label>
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    {/* Mostrar el archivo existente */}
                    {material?.archivo && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Archivo existente</label>
                            <a
                                href={`http://localhost:3000/uploads/${material.archivo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {material.archivo}
                            </a>
                        </div>
                    )}
                    {/* Subir un nuevo archivo */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Archivo (opcional)</label>
                        <input
                            type="file"
                            name="archivo"
                            onChange={handleFileChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

MaterialModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    material: PropTypes.object,
};
