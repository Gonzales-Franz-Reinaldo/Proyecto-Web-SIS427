import { useEffect, useState } from 'react';
import { getOpcionesByPregunta, createOpcion, deleteOpcion } from '../../services/opcionesService';
import PropTypes from 'prop-types';

const OpcionesManager = ({ preguntaId }) => {
    const [opciones, setOpciones] = useState([]);
    const [nuevaOpcion, setNuevaOpcion] = useState('');

    useEffect(() => {
        const fetchOpciones = async () => {
            try {
                const data = await getOpcionesByPregunta(preguntaId);
                setOpciones(data);
            } catch (error) {
                console.error('Error al obtener opciones:', error);
            }
        };
        fetchOpciones();
    }, [preguntaId]);

    const handleAddOpcion = async () => {
        try {
            const opcion = await createOpcion({ texto: nuevaOpcion, id_pregunta: preguntaId });
            setOpciones((prev) => [...prev, opcion]);
            setNuevaOpcion('');
        } catch (error) {
            console.error('Error al añadir opción:', error);
        }
    };

    const handleDeleteOpcion = async (id) => {
        try {
            await deleteOpcion(id);
            setOpciones((prev) => prev.filter((opcion) => opcion.id !== id));
        } catch (error) {
            console.error('Error al eliminar opción:', error);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-bold mb-4">Opciones</h3>
            <div className="space-y-2">
                {opciones.map((opcion) => (
                    <div key={opcion.id} className="flex justify-between items-center">
                        <p>{opcion.texto}</p>
                        <button
                            onClick={() => handleDeleteOpcion(opcion.id)}
                            className="text-red-600 hover:underline"
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex">
                <input
                    type="text"
                    value={nuevaOpcion}
                    onChange={(e) => setNuevaOpcion(e.target.value)}
                    placeholder="Nueva opción"
                    className="flex-1 p-2 border rounded mr-2"
                />
                <button
                    onClick={handleAddOpcion}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                    Añadir
                </button>
            </div>
        </div>
    );
};

OpcionesManager.propTypes = {
    preguntaId: PropTypes.number.isRequired
};

export default OpcionesManager;
