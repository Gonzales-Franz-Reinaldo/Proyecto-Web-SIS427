const RespuestaEstudiante = require('../models/RespuestaEstudiante');
const ResultadoExamen = require('../models/ResultadoExamen');
const Preguntas = require('../models/Preguntas');

// Finalizar examen y calcular puntuación
exports.finalizarExamen = async (req, res) => {
    const { idExamen, idEstudiante } = req.body;

    try {
        // Obtener todas las respuestas del estudiante
        const respuestas = await RespuestaEstudiante.findAll({
            where: { id_examen: idExamen, id_estudiante: idEstudiante },
        });

        // Calcular puntuación obtenida
        const puntuacionObtenida = respuestas.reduce((total, respuesta) => {
            return total + (respuesta.es_correcta ? respuesta.puntuacion : 0);
        }, 0);

        // Guardar el resultado del examen
        await ResultadoExamen.create({
            id_examen: idExamen,
            id_estudiante: idEstudiante,
            puntuacion_obtenida: puntuacionObtenida,
            fecha_completado: new Date(),
            estado: 'completado',
        });

        res.status(200).json({ message: 'Examen finalizado', puntuacion: puntuacionObtenida });
    } catch (error) {
        console.error('Error al finalizar examen:', error);
        res.status(500).json({ message: 'Error al finalizar examen' });
    }
};




// Ver resultados de un examen resuelto
exports.getResultados = async (req, res) => {
    const { idExamen, idEstudiante } = req.params;

    try {
        const resultado = await ResultadoExamen.findOne({
            where: { id_examen: idExamen, id_estudiante: idEstudiante },
        });

        if (!resultado) {
            return res.status(404).json({ message: 'Resultado no encontrado.' });
        }

        const preguntas = await Preguntas.findAll({
            where: { id_examen: idExamen },
        });

        const respuestas = await RespuestaEstudiante.findAll({
            where: { id_examen: idExamen, id_estudiante: idEstudiante },
        });

        res.status(200).json({
            resultado,
            preguntas,
            respuestas,
        });
    } catch (error) {
        console.error('Error al obtener resultados:', error);
        res.status(500).json({ message: 'Error al obtener resultados' });
    }
};