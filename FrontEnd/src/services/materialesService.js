// src/services/materialesService.js
import axiosInstance from '../utils/axiosInstance';

// Obtener todos los materiales de una asignatura
export const getMaterialesByAsignatura = async (idAsignatura) => {
    try {
        const response = await axiosInstance.get(`/materiales/${idAsignatura}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener materiales:', error);
        throw error;
    }
};

// Crear un nuevo material
export const createMaterial = async (material) => {
    const formData = new FormData();
    formData.append('titulo', material.titulo);
    formData.append('descripcion', material.descripcion);
    formData.append('archivo', material.archivo);
    formData.append('id_asignatura', material.id_asignatura);

    try {
        const response = await axiosInstance.post('/materiales', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear material:', error);
        throw error;
    }
};

// Actualizar un material existente
export const updateMaterial = async (id, material) => {
    const formData = new FormData();
    formData.append('titulo', material.titulo);
    formData.append('descripcion', material.descripcion);
    
    if (material.archivo) {
        formData.append('archivo', material.archivo);
    }

    try {
        const response = await axiosInstance.put(`/materiales/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar material:', error);
        throw error;
    }
};

// Eliminar un material
export const deleteMaterial = async (idMaterial) => {
    try {
        const response = await axiosInstance.delete(`/materiales/${idMaterial}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar material:', error);
        throw error;
    }
};
