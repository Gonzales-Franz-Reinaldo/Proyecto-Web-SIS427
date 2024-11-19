import axiosInstance from '../utils/axiosInstance';

// Obtener todas las preguntas de un examen
export const getPreguntasByExamen = async (idExamen) => {
    try {
        const response = await axiosInstance.get(`/preguntas/examen/${idExamen}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener preguntas:', error);
        throw error;
    }
};

// Crear una nueva pregunta
export const createPregunta = async (pregunta) => {
    try {
        const response = await axiosInstance.post('/preguntas', pregunta);
        return response.data;
    } catch (error) {
        console.error('Error al crear pregunta:', error);
        throw error;
    }
};

// Actualizar una pregunta existente
export const updatePregunta = async (idPregunta, pregunta) => {
    try {
        const response = await axiosInstance.put(`/preguntas/${idPregunta}`, pregunta);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar pregunta:', error);
        throw error;
    }
};

// Eliminar una pregunta
export const deletePregunta = async (idPregunta) => {
    try {
        const response = await axiosInstance.delete(`/preguntas/${idPregunta}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar pregunta:', error);
        throw error;
    }
};
