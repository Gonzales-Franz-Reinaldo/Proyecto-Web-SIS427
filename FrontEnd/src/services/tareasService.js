// src/services/tareasService.js
import axiosInstance from '../utils/axiosInstance';

// Obtener todas las tareas de una materia
export const getTareasByAsignatura = async (idAsignatura) => {
    try {
        const response = await axiosInstance.get(`/tareas/${idAsignatura}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        throw error;
    }
};

// Crear una nueva tarea
export const createTarea = async (tarea) => {
    const formData = new FormData();
    formData.append('titulo', tarea.titulo);
    formData.append('descripcion', tarea.descripcion);
    formData.append('fecha_entrega', tarea.fecha_entrega);
    formData.append('id_asignatura', tarea.id_asignatura);

    if (tarea.archivo_docente) { // Nombre del archivo debe coincidir
        formData.append('archivo_docente', tarea.archivo_docente);
    }

    try {
        const response = await axiosInstance.post('/tareas', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }, // Header correcto para envío de archivos
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear tarea:', error);
        throw error;
    }
};



// Actualizar una tarea existente
export const updateTarea = async (id, tarea) => {
    const formData = new FormData();
    formData.append('titulo', tarea.titulo);
    formData.append('descripcion', tarea.descripcion);
    formData.append('fecha_entrega', tarea.fecha_entrega);

    if (tarea.archivo_docente) {
        formData.append('archivo_docente', tarea.archivo_docente); // Nuevo archivo
    }

    try {
        const response = await axiosInstance.put(`/tareas/tarea/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        throw error;
    }
};


// Eliminar una tarea
export const deleteTarea = async (idTarea) => {
    try {
        const response = await axiosInstance.delete(`/tareas/tarea/${idTarea}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        throw error;
    }
};



export const getTareasByMateria = async (idAsignatura) => {
    try {
        const response = await axiosInstance.get(`/tareas/${idAsignatura}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        throw error;
    }
};