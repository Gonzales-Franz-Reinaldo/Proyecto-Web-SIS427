import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getEstudiantes, deleteEstudiante, contactarEstudiante } from '../../services/materiasService';

export const EstudiantesMateria = ({ idAsignatura }) => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedEstudiante, setSelectedEstudiante] = useState(null);

    useEffect(() => {
        const fetchEstudiantes = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await getEstudiantes(idAsignatura);
                setEstudiantes(data);
            } catch (err) {
                console.error('Error al cargar estudiantes:', err);
                setError('No se pudieron cargar los estudiantes.');
            } finally {
                setLoading(false);
            }
        };

        fetchEstudiantes();
    }, [idAsignatura]);

    const handleEliminarEstudiante = async (idEstudiante) => {
        if (!window.confirm('¿Está seguro de que desea eliminar este estudiante?')) return;

        try {
            await deleteEstudiante(idAsignatura, idEstudiante);
            setEstudiantes((prev) =>
                prev.filter((estudiante) => estudiante.id_estudiante !== idEstudiante)
            );
            alert('Estudiante eliminado correctamente.');
        } catch (err) {
            console.error('Error al eliminar estudiante:', err);
            alert('No se pudo eliminar el estudiante.');
        }
    };

    const handleContactarEstudiante = async (idEstudiante) => {
        const mensaje = prompt('Escriba el mensaje para el estudiante:');
        if (!mensaje) return;

        try {
            await contactarEstudiante(idAsignatura, idEstudiante, mensaje);
            alert('Mensaje enviado correctamente.');
        } catch (err) {
            console.error('Error al contactar estudiante:', err);
            alert('No se pudo enviar el mensaje.');
        }
    };

    const renderTable = () => (
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-indigo-700 text-white">
                    <th className="py-3 px-4">Nombre</th>
                    <th className="py-3 px-4">Apellido</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Carrera</th>
                    <th className="py-3 px-4">CU</th>
                    <th className="py-3 px-4">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {estudiantes.map((estudiante, index) => (
                    <tr
                        key={estudiante.id_estudiante}
                        className={`${
                            index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                        } transition-all hover:bg-indigo-100`}
                    >
                        <td className="py-3 px-4">{estudiante.usuario.nombre}</td>
                        <td className="py-3 px-4">{estudiante.usuario.apellido}</td>
                        <td className="py-3 px-4">{estudiante.usuario.email}</td>
                        <td className="py-3 px-4">{estudiante.carrera}</td>
                        <td className="py-3 px-4">{estudiante.cu}</td>
                        <td className="py-3 px-4 space-x-2">
                            <button
                                onClick={() => setSelectedEstudiante(estudiante)}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Ver
                            </button>
                            <button
                                onClick={() => handleContactarEstudiante(estudiante.id_estudiante)}
                                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Contactar
                            </button>
                            <button
                                onClick={() => handleEliminarEstudiante(estudiante.id_estudiante)}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Lista de Estudiantes</h2>
            {loading ? (
                <p className="text-center text-gray-600">Cargando estudiantes...</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : estudiantes.length > 0 ? (
                <div className="overflow-auto rounded-lg shadow">
                    {renderTable()}
                </div>
            ) : (
                <p className="text-center text-gray-600">No hay estudiantes inscritos.</p>
            )}

            {selectedEstudiante && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h3 className="text-xl font-bold mb-4">
                            Información del estudiante
                        </h3>
                        <p><strong>Nombre:</strong> {selectedEstudiante.usuario.nombre}</p>
                        <p><strong>Apellido:</strong> {selectedEstudiante.usuario.apellido}</p>
                        <p><strong>Email:</strong> {selectedEstudiante.usuario.email}</p>
                        <p><strong>CI:</strong> {selectedEstudiante.usuario.ci}</p>
                        <p><strong>Teléfono:</strong> {selectedEstudiante.usuario.telefono}</p>
                        <p><strong>Carrera:</strong> {selectedEstudiante.carrera}</p>
                        <p><strong>CU:</strong> {selectedEstudiante.cu}</p>
                        <p><strong>Fecha de ingreso:</strong> {selectedEstudiante.fecha_ingreso}</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setSelectedEstudiante(null)}
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

EstudiantesMateria.propTypes = {
    idAsignatura: PropTypes.number.isRequired,
};
