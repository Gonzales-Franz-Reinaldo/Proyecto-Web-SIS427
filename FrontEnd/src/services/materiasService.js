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





export const getEstudiantes = async (idAsignatura) => {
    const response = await axiosInstance.get(`/materias/${idAsignatura}/estudiantes`);
    return response.data;
};

export const deleteEstudiante = async (idAsignatura, idEstudiante) => {
    await axiosInstance.delete(`/materias/${idAsignatura}/estudiantes/${idEstudiante}`);
};

export const contactarEstudiante = async (idAsignatura, idEstudiante, message) => {
    await axiosInstance.post(`/materias/${idAsignatura}/estudiantes/${idEstudiante}/contactar`, {
        message,
    });
};




// Servicio para obtener las materias del estudiante
export const getMateriasByEstudiante = async () => {
    try {
        const response = await axiosInstance.get('/materias/estudiante');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las materias del estudiante:', error);
        throw error;
    }
};


// Obtener materiales por asignatura
export const getMaterialesByAsignatura = async (idAsignatura) => {
    const response = await axiosInstance.get(`/materiales/materia/${idAsignatura}`);
    return response.data;
};