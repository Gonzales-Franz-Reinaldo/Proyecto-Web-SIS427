import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getResultadosExamen } from '../../services/examenesService';

export const ResultadosExamenEstudiante = () => {
    const { idExamen } = useParams();
    const [resultados, setResultados] = useState(null);

    useEffect(() => {
        const fetchResultados = async () => {
            try {
                const idEstudiante = localStorage.getItem('idEstudiante');
                const data = await getResultadosExamen(idExamen, idEstudiante);
                setResultados(data);
            } catch (error) {
                console.error('Error al obtener resultados:', error);
            }
        };

        fetchResultados();
    }, [idExamen]);

    if (!resultados) return <div>Cargando resultados...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold">Resultados del Examen</h1>
            <p>Puntuación obtenida: {resultados.puntuacion_obtenida}</p>
            {/* Detalles adicionales */}
        </div>
    );
};
