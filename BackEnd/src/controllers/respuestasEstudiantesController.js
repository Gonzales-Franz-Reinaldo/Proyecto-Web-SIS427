const RespuestaEstudiante = require('../models/RespuestaEstudiante');
const Examenes = require('../models/Examenes');

// Guardar respuestas de un estudiante
exports.guardarRespuestas = async (req, res) => {
    const { idExamen, idEstudiante, respuestas } = req.body;

    try {
        // Verificar si el examen aún está dentro del tiempo límite
        const examen = await Examenes.findByPk(idExamen);
        const now = new Date();
        if (now > new Date(examen.fecha_entrega)) {
            return res.status(400).json({ message: 'El tiempo del examen ha expirado.' });
        }

        // Registrar respuestas
        for (const respuesta of respuestas) {
            await RespuestaEstudiante.create({
                id_examen: idExamen,
                id_estudiante: idEstudiante,
                id_pregunta: respuesta.idPregunta,
                respuesta: respuesta.respuesta,
                es_correcta: respuesta.esCorrecta, // Calcular aquí si es necesario
                estado: 'finalizada',
            });
        }

        res.status(200).json({ message: 'Respuestas guardadas correctamente.' });
    } catch (error) {
        console.error('Error al guardar respuestas:', error);
        res.status(500).json({ message: 'Error al guardar respuestas' });
    }
};
