import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getExamenes, getPreguntas, enviarRespuestas, finalizarExamen } from '../../services/examenesService';

export const ExamenesMateriaEstudiante = ({ idAsignatura }) => {
    const [examenes, setExamenes] = useState([]);
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState({});
    const [selectedExamen, setSelectedExamen] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExamenes = async () => {
            try {
                const idEstudiante = localStorage.getItem('idEstudiante');
                const data = await getExamenes(idAsignatura, idEstudiante);
                setExamenes(data);
            } catch (error) {
                console.error('Error al cargar exámenes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExamenes();
    }, [idAsignatura]);

    const handleStartExamen = async (examen) => {
        try {
            setSelectedExamen(examen);
            const preguntasData = await getPreguntas(examen.id);
            setPreguntas(preguntasData);
            setTimeLeft(examen.duracion * 60); // Convertir duración a segundos
        } catch (error) {
            console.error('Error al cargar preguntas:', error);
        }
    };

    const handleChangeRespuesta = (idPregunta, respuesta) => {
        setRespuestas({ ...respuestas, [idPregunta]: respuesta });
    };

    const handleFinalizarExamen = async () => {
        try {
            const idEstudiante = localStorage.getItem('idEstudiante');
            await enviarRespuestas(selectedExamen.id, Object.entries(respuestas).map(([idPregunta, respuesta]) => ({
                idPregunta,
                respuesta,
            })));
            await finalizarExamen(selectedExamen.id, idEstudiante, 0); // Puedes calcular la puntuación aquí si es necesario
            setSelectedExamen(null); // Volver a la lista de exámenes
        } catch (error) {
            console.error('Error al finalizar examen:', error);
        }
    };

    useEffect(() => {
        if (timeLeft === 0 && selectedExamen) {
            handleFinalizarExamen();
        }
        const timer = setInterval(() => {
            if (timeLeft > 0) setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, selectedExamen]);

    if (loading) return <div>Cargando exámenes...</div>;

    if (selectedExamen) {
        return (
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">{selectedExamen.titulo}</h1>
                    <p>
                        Tiempo restante: {Math.floor(timeLeft / 60)}:
                        {String(timeLeft % 60).padStart(2, '0')}
                    </p>
                </div>
                <form className="mt-6 space-y-6">
                    {preguntas.map((pregunta) => (
                        <div key={pregunta.id} className="bg-white p-4 rounded shadow">
                            <h3 className="font-bold">{pregunta.texto}</h3>
                            {pregunta.tipo === 'multiple' && (
                                <div className="mt-2">
                                    {pregunta.opciones.map((opcion) => (
                                        <label key={opcion.id} className="block">
                                            <input
                                                type="radio"
                                                name={`pregunta-${pregunta.id}`}
                                                value={opcion.texto}
                                                onChange={() => handleChangeRespuesta(pregunta.id, opcion.texto)}
                                                className="mr-2"
                                            />
                                            {opcion.texto}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {pregunta.tipo === 'falso_verdadero' && (
                                <div className="mt-2">
                                    <label className="block">
                                        <input
                                            type="radio"
                                            name={`pregunta-${pregunta.id}`}
                                            value="Verdadero"
                                            onChange={() => handleChangeRespuesta(pregunta.id, 'Verdadero')}
                                            className="mr-2"
                                        />
                                        Verdadero
                                    </label>
                                    <label className="block">
                                        <input
                                            type="radio"
                                            name={`pregunta-${pregunta.id}`}
                                            value="Falso"
                                            onChange={() => handleChangeRespuesta(pregunta.id, 'Falso')}
                                            className="mr-2"
                                        />
                                        Falso
                                    </label>
                                </div>
                            )}
                            {pregunta.tipo === 'completar' && (
                                <input
                                    type="text"
                                    placeholder="Escribe tu respuesta"
                                    onChange={(e) => handleChangeRespuesta(pregunta.id, e.target.value)}
                                    className="mt-2 p-2 border rounded w-full"
                                />
                            )}
                        </div>
                    ))}
                </form>
                <button
                    onClick={handleFinalizarExamen}
                    className="mt-6 px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                >
                    Finalizar Examen
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examenes.map((examen) => (
                <div key={examen.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                    <h3 className="text-xl font-bold text-blue-700">{examen.titulo}</h3>
                    <p className="text-gray-600">{examen.descripcion}</p>
                    <p className="text-sm text-gray-500">Fecha publicación: {new Date(examen.fecha_publicacion).toLocaleDateString()}</p>
                    <p className={`text-sm font-bold mt-2 ${examen.resuelto ? 'text-green-600' : 'text-red-600'}`}>
                        {examen.resuelto ? 'Resuelto' : 'Pendiente'}
                    </p>
                    {!examen.resuelto && (
                        <button
                            onClick={() => handleStartExamen(examen)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                        >
                            Empezar
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

ExamenesMateriaEstudiante.propTypes = {
    idAsignatura: PropTypes.number.isRequired,
};
