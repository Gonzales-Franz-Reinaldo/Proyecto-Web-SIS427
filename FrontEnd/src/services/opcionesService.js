import axiosInstance from '../utils/axiosInstance';

// Obtener todas las opciones de una pregunta
export const getOpcionesByPregunta = async (idPregunta) => {
    try {
        const response = await axiosInstance.get(`/opciones/pregunta/${idPregunta}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener opciones:', error);
        throw error;
    }
};

// Crear una nueva opción
export const createOpcion = async (opcion) => {
    try {
        const response = await axiosInstance.post('/opciones', opcion);
        return response.data;
    } catch (error) {
        console.error('Error al crear opción:', error);
        throw error;
    }
};

// Eliminar una opción
export const deleteOpcion = async (idOpcion) => {
    try {
        const response = await axiosInstance.delete(`/opciones/${idOpcion}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar opción:', error);
        throw error;
    }
};
