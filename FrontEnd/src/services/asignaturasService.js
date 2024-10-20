// src/services/asignaturasService.js
export const obtenerAsignaturas = async (idUsuario) => {
    console.log('Haciendo solicitud para obtener asignaturas del usuario con id:', idUsuario);  // Log adicional
    try {
        const response = await fetch(`http://localhost:3000/asignaturas?id_usuario=${idUsuario}`, {
            method: 'GET',
            credentials: 'include',  // Para enviar cookies de sesión
        });

        const data = await response.json();
        // console.log('Respuesta del servidor:', data);  

        if (!data.error) {
            return data;
        } else {
            console.error('Error al obtener las asignaturas:', data.error);
            return [];
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return [];
    }
};
