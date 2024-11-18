import { useState } from 'react';
import PropTypes from 'prop-types';

export const CreateExamModal = ({ isOpen, onClose, onSave, exam }) => {
    const [formData, setFormData] = useState({
        titulo: exam?.titulo || '',
        descripcion: exam?.descripcion || '',
        fecha_publicacion: exam?.fecha_publicacion || '',
        fecha_entrega: exam?.fecha_entrega || '',
        estado: exam?.estado || 'borrador',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{exam ? 'Editar Examen' : 'Crear Examen'}</h2>
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
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Fecha de Publicación</label>
                        <input
                            type="date"
                            name="fecha_publicacion"
                            value={formData.fecha_publicacion}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Fecha de Entrega</label>
                        <input
                            type="date"
                            name="fecha_entrega"
                            value={formData.fecha_entrega}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Estado</label>
                        <select
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="borrador">Borrador</option>
                            <option value="publicado">Publicado</option>
                        </select>
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

CreateExamModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    exam: PropTypes.object,
};
