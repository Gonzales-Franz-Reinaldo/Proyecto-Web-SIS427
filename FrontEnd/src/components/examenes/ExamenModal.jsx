import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPregunta, updatePregunta } from '../../services/preguntasService';

const PreguntaModal = ({ isOpen, onClose, onSave, examenId, pregunta }) => {
    const [formData, setFormData] = useState({
        texto: '',
        tipo: 'multiple',
        puntuacion: 1,
    });

    useEffect(() => {
        if (pregunta) {
            setFormData({
                texto: pregunta.texto || '',
                tipo: pregunta.tipo || 'multiple',
                puntuacion: pregunta.puntuacion || 1,
            });
        } else {
            setFormData({
                texto: '',
                tipo: 'multiple',
                puntuacion: 1,
            });
        }
    }, [pregunta]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPregunta = pregunta
                ? await updatePregunta(pregunta.id, formData)
                : await createPregunta({ ...formData, id_examen: examenId });
            onSave(newPregunta);
            onClose();
        } catch (error) {
            console.error('Error al guardar la pregunta:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {pregunta ? 'Editar Pregunta' : 'Crear Pregunta'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Texto de la pregunta</label>
                        <textarea
                            name="texto"
                            value={formData.texto}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Tipo de pregunta</label>
                        <select
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="multiple">Múltiple opción</option>
                            <option value="unica">Única opción</option>
                            <option value="falso_verdadero">Falso/Verdadero</option>
                            <option value="completar">Completar</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Puntuación</label>
                        <input
                            type="number"
                            name="puntuacion"
                            value={formData.puntuacion}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            min="1"
                            required
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

PreguntaModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    examenId: PropTypes.number.isRequired,
    pregunta: PropTypes.object,
};

export default PreguntaModal;
