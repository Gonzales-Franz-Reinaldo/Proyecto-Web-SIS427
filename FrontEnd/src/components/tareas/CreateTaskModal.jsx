import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const CreateTaskModal = ({ isOpen, onClose, onSave, tarea }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        fecha_entrega: '',
        archivo_docente: null,
    });

    // Sincronizar los datos del formulario cuando cambia el prop `tarea`
    useEffect(() => {
        if (tarea) {
            setFormData({
                titulo: tarea.titulo || '',
                descripcion: tarea.descripcion || '',
                fecha_entrega: tarea.fecha_entrega || '',
                archivo_docente: null, // No rellenamos el archivo existente, solo lo mostramos
            });
        } else {
            setFormData({
                titulo: '',
                descripcion: '',
                fecha_entrega: '',
                archivo_docente: null,
            });
        }
    }, [tarea]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, archivo_docente: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{tarea ? 'Editar Tarea' : 'Crear Tarea'}</h2>
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

                    {/* Mostrar el archivo existente */}
                    {tarea?.archivo_docente && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Archivo existente</label>
                            <a
                                href={`http://localhost:3000/uploads/${tarea.archivo_docente}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {tarea.archivo_docente}
                            </a>
                        </div>
                    )}

                    {/* Subir un nuevo archivo */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Archivo (opcional)</label>
                        <input
                            type="file"
                            name="archivo_docente"
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

CreateTaskModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    tarea: PropTypes.object,
};
