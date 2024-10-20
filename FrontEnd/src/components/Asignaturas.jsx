import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { obtenerAsignaturas } from '../services/asignaturasService';

export const Asignaturas = ({ userId }) => {
    const [asignaturas, setAsignaturas] = useState([]);

    useEffect(() => {
        const cargarAsignaturas = async () => {
            if (userId) {
                const data = await obtenerAsignaturas(userId);
                setAsignaturas(data);
            }
        };

        cargarAsignaturas();
    }, [userId]);

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Asignaturas</h2>
            <div className="grid grid-cols-3 gap-6">
                {asignaturas.length > 0 ? (
                    asignaturas.map(asignatura => (
                        <div key={asignatura.id_asignatura} className="flex flex-col bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{asignatura.nombre}</h3>
                            <p className="text-gray-600">Sigla: <span className="font-medium">{asignatura.sigla}</span></p>
                            <p className="mt-2">Créditos: <span className="font-medium">{asignatura.creditos}</span></p>
                            <div className="flex justify-center mt-4">
                                <Link to={`/docente/asignatura/${asignatura.id_asignatura}`} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full shadow transition duration-200 transform hover:scale-105">
                                    Ver asignatura
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No hay asignaturas asignadas</p>
                )}
            </div>
        </>
    );
};

Asignaturas.propTypes = {
    userId: PropTypes.number.isRequired,
};
