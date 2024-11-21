import { useEffect, useState } from 'react';
import { getMateriasByEstudiante } from '../../services/materiasService';
import { useNavigate } from 'react-router-dom';

const MateriasEstudiante = () => {
    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const data = await getMateriasByEstudiante();
                setMaterias(data);
            } catch (error) {
                console.error('Error al cargar materias del estudiante:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMaterias();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500">Cargando materias...</div>;
    }

    if (materias.length === 0) {
        return <div className="text-center text-gray-500">No estás inscrito en ninguna materia.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {materias.map((materia) => (
                <div
                    key={materia.id}
                    className="relative rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 cursor-pointer"
                    onClick={() => navigate(`/student/materias/${materia.id}`, { state: { materia } })}
                    style={{
                        backgroundImage: `url('https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/brandedcontent/1725865272.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                    <div className="relative p-6">
                        <h3 className="text-2xl font-bold text-white">{materia.nombre}</h3>
                        <p className="text-gray-300 mt-2">{materia.descripcion}</p>
                        <p className="text-sm text-gray-400 mt-4">Curso: {materia.curso}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MateriasEstudiante;
