
import { useState } from "react";
import { useParams } from 'react-router-dom';

export const Examenes = () => {

    const { id } = useParams(); 

    // Estado para almacenar la lista de exámenes
    const [examenes, setExamenes] = useState([
        {
            id: 1,
            titulo: "Examen Parcial 1",
            descripcion: "Este es el primer examen parcial",
            fecha_subida: "2024-10-15",
            fecha_aplicacion: "2024-11-01",
        },
        {
            id: 2,
            titulo: "Examen Final",
            descripcion: "Este es el examen final",
            fecha_subida: "2024-11-01",
            fecha_aplicacion: "2024-12-01",
        },
    ]);

    // Función para añadir un nuevo examen (lógica simplificada)
    const agregarExamen = () => {
        const nuevoExamen = {
            id: examenes.length + 1,
            titulo: "Nuevo Examen",
            descripcion: "Descripción del nuevo examen",
            fecha_subida: new Date().toISOString().split("T")[0], // Fecha actual
            fecha_aplicacion: "2024-12-15",
        };
        setExamenes([...examenes, nuevoExamen]);
    };

    // Función para eliminar un examen
    const eliminarExamen = (id) => {
        setExamenes(examenes.filter((examen) => examen.id !== id));
    };

    return (
        <div className="animate-fadeIn p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Exámenes de la Asignatura {id}</h2>

            {/* Botón para agregar un nuevo examen */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={agregarExamen}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-all">
                    + Nuevo Examen
                </button>
            </div>

            {/* Tabla para mostrar la lista de exámenes */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                            <th className="py-3 px-6 text-left">Título</th>
                            <th className="py-3 px-6 text-left">Descripción</th>
                            <th className="py-3 px-6 text-left">Fecha de Subida</th>
                            <th className="py-3 px-6 text-left">Fecha de Aplicación</th>
                            <th className="py-3 px-6 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {examenes.map((examen) => (
                            <tr key={examen.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6">{examen.titulo}</td>
                                <td className="py-3 px-6">{examen.descripcion}</td>
                                <td className="py-3 px-6">{examen.fecha_subida}</td>
                                <td className="py-3 px-6">{examen.fecha_aplicacion}</td>
                                <td className="py-3 px-6 text-center">
                                    {/* Botón para editar */}
                                    <button className="text-green-600 hover:text-green-800 mr-4">
                                        Editar
                                    </button>
                                    {/* Botón para eliminar */}
                                    <button
                                        onClick={() => eliminarExamen(examen.id)}
                                        className="text-red-600 hover:text-red-800">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
