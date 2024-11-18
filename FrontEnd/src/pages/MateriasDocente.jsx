import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMateriasDocente } from '../services/materiasService';

const MateriasDocente = () => {
    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const data = await getMateriasDocente();
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
        return <div className="text-center mt-10">Cargando materias...</div>;
    }

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {materias.length > 0 ? (
                materias.map((materia) => (
                    <div
                        key={materia.Asignatura.id}
                        onClick={() =>
                            navigate(`/materias/${materia.Asignatura.id}`, {
                                state: { nombre: materia.Asignatura.nombre, id: materia.Asignatura.id },
                            })
                        }
                        className="bg-white shadow-md rounded-lg p-4 border-l-4 border-indigo-500 cursor-pointer hover:shadow-lg hover:scale-105 transition"
                    >
                        <h3 className="text-xl font-bold">{materia.Asignatura.nombre}</h3>
                        <p className="text-gray-600 mt-2">{materia.Asignatura.descripcion}</p>
                        <div className="text-sm text-gray-500 mt-4">
                            <p>Sigla: {materia.Asignatura.sigla}</p>
                            <p>Curso: {materia.Asignatura.curso}</p>
                            <p>Créditos: {materia.Asignatura.creditos}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center col-span-3">No hay materias asignadas.</div>
            )}
        </div>
    );
};

export default MateriasDocente;
