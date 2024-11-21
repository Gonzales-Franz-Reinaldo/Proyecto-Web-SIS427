import { useEffect, useState } from 'react';
import { getMaterialesByAsignatura } from '../../services/materiasService';
import PropTypes from 'prop-types';

export const MaterialesMateriaEstudiante = ({ idAsignatura }) => {
    const [materiales, setMateriales] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMateriales = async () => {
            try {
                const data = await getMaterialesByAsignatura(idAsignatura);
                setMateriales(data);
            } catch (error) {
                console.error('Error al cargar materiales:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMateriales();
    }, [idAsignatura]);

    if (loading) {
        return <div className="text-center text-gray-500">Cargando materiales...</div>;
    }

    if (materiales.length === 0) {
        return <div className="text-center text-gray-500">No hay materiales publicados para esta materia.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {materiales.map((material) => (
                <div
                    key={material.id}
                    className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
                >
                    <h3 className="text-xl font-bold text-purple-700">{material.titulo}</h3>
                    <p className="text-gray-600 mt-2">{material.descripcion}</p>
                    <p className="text-sm text-gray-500 mt-4">Fecha de publicación: {new Date(material.fecha_publicacion).toLocaleDateString()}</p>
                    {material.archivo && (
                        <a
                            href={`http://localhost:3000/uploads/${material.archivo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
                        >
                            Ver Archivo
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
};

MaterialesMateriaEstudiante.propTypes = {
    idAsignatura: PropTypes.number.isRequired,
};


