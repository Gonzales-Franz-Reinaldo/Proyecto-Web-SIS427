import { useEffect, useState } from 'react';
import { getMateriasEstudiante } from '../../services/materiasService';

const MateriasEstudiante = () => {
    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const data = await getMateriasEstudiante();
                setMaterias(data);
            } catch (error) {
                console.error('Error al obtener las materias:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterias();
    }, []);

    if (loading) {
        return <p className="text-center mt-10 text-lg text-gray-700">Cargando materias...</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materias.map((materia) => (
                <div
                    key={materia.id}
                    className="bg-white shadow-lg rounded-xl p-6 transform transition-all hover:scale-105 hover:shadow-2xl"
                >
                    <h3 className="text-2xl font-semibold text-purple-700">{materia.nombre}</h3>
                    <p className="text-gray-600 mt-2">{materia.descripcion}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg shadow-lg hover:shadow-xl"
                        onClick={() => alert(`Entrando a la materia ${materia.nombre}`)}
                    >
                        Ver Detalles
                    </button>
                </div>
            ))}
        </div>
    );
};

export default MateriasEstudiante;


