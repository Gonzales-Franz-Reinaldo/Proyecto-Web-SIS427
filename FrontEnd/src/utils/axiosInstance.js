import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api', // Cambia a la URL del backend si es necesario
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Obtiene el token desde el almacenamiento local
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Agrega el token al encabezado Authorization
    }
    return config;
});

export default axiosInstance;
