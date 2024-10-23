export const Tareas = () => {
    return (
        <div className="animate-fadeIn">
            <h2 className="text-xl font-bold mb-4">Tareas de la Asignatura</h2>
            <div className="flex justify-end mb-4">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition-all">
                    + Nueva Tarea
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="w-full bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6">Título</th>
                            <th className="py-3 px-6">Descripción</th>
                            <th className="py-3 px-6">Fecha de Entrega</th>
                            <th className="py-3 px-6">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6">Tarea 1</td>
                            <td className="py-3 px-6">Descripción de la tarea 1</td>
                            <td className="py-3 px-6">2024-11-01</td>
                            <td className="py-3 px-6">
                                <button className="text-indigo-600 hover:text-indigo-900">Editar</button>
                                <button className="text-red-600 hover:text-red-900 ml-4">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
