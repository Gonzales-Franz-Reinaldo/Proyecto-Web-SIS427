import axiosInstance from '../utils/axiosInstance';

export const getExamenesByAsignatura = async (idAsignatura) => {
    const response = await axiosInstance.get(`/examenes/asignatura/${idAsignatura}`);
    return response.data;
};

// Crear un nuevo examen
export const createExamen = async (examen) => {
    try {
        const response = await axiosInstance.post('/examenes', examen);
        return response.data;
    } catch (error) {
        console.error('Error al crear examen:', error);
        throw error;
    }
};

// Editar un examen existente
export const updateExamen = async (idExamen, examen) => {
    try {
        const response = await axiosInstance.put(`/examenes/${idExamen}`, examen);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar examen:', error);
        throw error;
    }
};

export const deleteExamen = async (id) => {
    const response = await axiosInstance.delete(`/examenes/${id}`);
    return response.data;
};



// Publicar examen
export const publicarExamen = async (idExamen) => {
    try {
        const response = await axiosInstance.patch(`/examenes/${idExamen}/publicar`);
        return response.data;
    } catch (error) {
        console.error('Error al publicar el examen:', error);
        throw error;
    }
};