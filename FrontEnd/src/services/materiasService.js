import axiosInstance from '../utils/axiosInstance';

// Obtener todas las materias del docente
export const getMateriasDocente = async () => {
    try {
        const response = await axiosInstance.get('/materias/docente');
        return response.data.materias;
    } catch (error) {
        console.error('Error al obtener las materias:', error);
        throw error;
    }
};


export const getMateriasEstudiante = async () => {
    try {
        const response = await axiosInstance.get('/materias/estudiante');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las materias del estudiante:', error);
        throw error;
    }
};