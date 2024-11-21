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





// Obtener los exámenes disponibles para el estudiante en una asignatura
export const getExamenes = async (idAsignatura, idEstudiante) => {
    try {
        const response = await axiosInstance.get(`/examenes/materia/${idAsignatura}/estudiante/${idEstudiante}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener exámenes:', error);
        throw error;
    }
};

// Obtener preguntas y opciones de un examen específico
export const getPreguntas = async (idExamen) => {
    try {
        const response = await axiosInstance.get(`/examenes/${idExamen}/pregunta`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener preguntas:', error);
        throw error;
    }
};

// Enviar respuestas del estudiante para un examen
export const enviarRespuestas = async (idExamen, respuestas) => {
    try {
        const response = await axiosInstance.post(`/examenes/respuestas`, {
            idExamen,
            respuestas,
        });
        return response.data;
    } catch (error) {
        console.error('Error al enviar respuestas:', error);
        throw error;
    }
};

// Finalizar el examen y registrar puntuación
export const finalizarExamen = async (idExamen, idEstudiante, puntuacionObtenida) => {
    try {
        const response = await axiosInstance.post(`/examenes/finalizar`, {
            idExamen,
            idEstudiante,
            puntuacionObtenida,
        });
        return response.data;
    } catch (error) {
        console.error('Error al finalizar examen:', error);
        throw error;
    }
};

// Obtener resultados de un examen resuelto por el estudiante
export const getResultadosExamen = async (idExamen, idEstudiante) => {
    try {
        const response = await axiosInstance.get(`/examenes/${idExamen}/estudiante/${idEstudiante}/resultados`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener resultados del examen:', error);
        throw error;
    }
};