import axiosInstance from '../utils/axiosInstance';

export const getExamenesByAsignatura = async (idAsignatura) => {
    const response = await axiosInstance.get(`/examenes/asignatura/${idAsignatura}`);
    return response.data;
};

export const createExamen = async (examen) => {
    const response = await axiosInstance.post('/examenes', examen);
    return response.data;
};

export const updateExamen = async (id, examen) => {
    const response = await axiosInstance.put(`/examenes/${id}`, examen);
    return response.data;
};

export const deleteExamen = async (id) => {
    const response = await axiosInstance.delete(`/examenes/${id}`);
    return response.data;
};
