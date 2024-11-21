import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPreguntas, enviarRespuestas, finalizarExamen } from '../../services/examenesService';

export const ResolverExamenEstudiante = () => {
    const { idExamen } = useParams();
    const navigate = useNavigate();
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const fetchPreguntas = async () => {
            try {
                const data = await getPreguntas(idExamen);
                setPreguntas(data);
                setTimeLeft(data.duracion * 60); // Duración en segundos
            } catch (error) {
                console.error('Error al cargar preguntas:', error);
            }
        };

        fetchPreguntas();
    }, [idExamen]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleFinalizar();
        }
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleChange = (idPregunta, respuesta) => {
        setRespuestas({ ...respuestas, [idPregunta]: respuesta });
    };

    const handleFinalizar = async () => {
        try {
            const idEstudiante = localStorage.getItem('idEstudiante');
            await enviarRespuestas(idExamen, Object.entries(respuestas).map(([idPregunta, respuesta]) => ({
                idPregunta,
                respuesta,
            })));
            await finalizarExamen(idExamen, idEstudiante, 0); // Enviar puntuación
            navigate(`/student/examenes/resultados/${idExamen}`);
        } catch (error) {
            console.error('Error al finalizar examen:', error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Respondiendo Examen</h1>
                <p>Tiempo restante: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</p>
            </div>
            <form className="mt-6 space-y-6">
                {preguntas.map((pregunta) => (
                    <div key={pregunta.id} className="bg-white p-4 rounded shadow">
                        <h3>{pregunta.texto}</h3>
                        {pregunta.tipo === 'multiple' && (
                            <div>
                                {pregunta.opciones.map((opcion) => (
                                    <label key={opcion.id}>
                                        <input
                                            type="radio"
                                            name={pregunta.id}
                                            value={opcion.texto}
                                            onChange={() => handleChange(pregunta.id, opcion.texto)}
                                        />
                                        {opcion.texto}
                                    </label>
                                ))}
                            </div>
                        )}
                        {/* Más tipos de preguntas */}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleFinalizar}
                    className="px-6 py-2 bg-blue-600 text-white rounded"
                >
                    Finalizar Examen
                </button>
            </form>
        </div>
    );
};
