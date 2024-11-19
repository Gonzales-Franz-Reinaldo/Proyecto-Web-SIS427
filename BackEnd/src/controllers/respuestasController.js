const RespuestasEstudiantes = require('../models/RespuestasEstudiantes');

exports.saveRespuestas = async (req, res) => {
    try {
        const { id_examen, id_estudiante, respuestas } = req.body;

        for (const respuesta of respuestas) {
            await RespuestasEstudiantes.create({
                id_examen,
                id_estudiante,
                id_pregunta: respuesta.id_pregunta,
                respuesta: respuesta.respuesta,
                es_correcta: respuesta.es_correcta,
            });
        }

        res.status(201).json({ message: 'Respuestas guardadas correctamente' });
    } catch (error) {
        console.error('Error al guardar respuestas:', error);
        res.status(500).json({ message: 'Error al guardar respuestas' });
    }
};

exports.getRespuestasByEstudiante = async (req, res) => {
    try {
        const { id_estudiante } = req.params;
        const respuestas = await RespuestasEstudiantes.findAll({ where: { id_estudiante } });
        res.status(200).json(respuestas);
    } catch (error) {
        console.error('Error al obtener respuestas:', error);
        res.status(500).json({ message: 'Error al obtener respuestas' });
    }
}


exports.getRespuestasByExamen = async (req, res) => {
    try {
        const { id_examen } = req.params;
        const respuestas = await RespuestasEstudiantes.findAll({ where: { id_examen } });
        res.status(200).json(respuestas);
    } catch (error) {
        console.error('Error al obtener respuestas:', error);
        res.status(500).json({ message: 'Error al obtener respuestas' });
    }
}


exports.getRespuestaById = async (req, res) => {
    try {
        const { id } = req.params;
        const respuesta = await RespuestasEstudiantes.findByPk(id);
        res.status(200).json(respuesta);
    } catch (error) {
        console.error('Error al obtener la respuesta:', error);
        res.status(500).json({ message: 'Error al obtener la respuesta' });
    }
}

exports.updateRespuesta = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_pregunta, respuesta, es_correcta } = req.body;

        // Verificar si la respuesta existe
        const respuestaEstudiante = await RespuestasEstudiantes.findOne({ where: { id } });
        if (!respuestaEstudiante) {
            return res.status(404).json({ message: 'No existe un registro de respuesta con ese ID' });
        }

        await RespuestasEstudiantes.update(
            { id_pregunta, respuesta, es_correcta },
            { where: { id } }
        );

        res.status(200).json({ message: 'Respuesta actualizada' });
    } catch (error) {
        console.error('Error al actualizar la respuesta:', error);
        res.status(500).json({ message: 'Error al actualizar la respuesta' });
    }
}

exports.deleteRespuesta = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si la respuesta existe
        const respuestaEstudiante = await RespuestasEstudiantes.findOne({ where: { id } });
        if (!respuestaEstudiante) {
            return res.status(404).json({ message: 'No existe un registro de respuesta con ese ID' });
        }

        await RespuestasEstudiantes.destroy({ where: { id } });
        res.status(200).json({ message: 'Respuesta eliminada' });
    } catch (error) {
        console.error('Error al eliminar la respuesta:', error);
        res.status(500).json({ message: 'Error al eliminar la respuesta' });
    }
}

