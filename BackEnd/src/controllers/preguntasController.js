const Preguntas = require('../models/Preguntas');

exports.createPregunta = async (req, res) => {
    try {
        const { id_examen, tipo, texto, puntuacion } = req.body;
        const pregunta = await Preguntas.create({ id_examen, tipo, texto, puntuacion });
        res.status(201).json(pregunta);
    } catch (error) {
        console.error('Error al crear la pregunta:', error);
        res.status(500).json({ message: 'Error al crear la pregunta' });
    }
};



exports.getPreguntasByExamen = async (req, res) => {
    try {
        const { id_examen } = req.params;
        const preguntas = await Preguntas.findAll({ where: { id_examen } });
        res.status(200).json(preguntas);
    } catch (error) {
        console.error('Error al obtener preguntas:', error);
        res.status(500).json({ message: 'Error al obtener preguntas' });
    }
}

exports.getPreguntaById = async (req, res) => {
    try {
        const { id } = req.params;
        const pregunta = await Preguntas.findByPk(id);
        res.status(200).json(pregunta);
    } catch (error) {
        console.error('Error al obtener la pregunta:', error);
        res.status(500).json({ message: 'Error al obtener la pregunta' });
    }
}

exports.updatePregunta = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_examen, tipo, texto, puntuacion } = req.body;

        // Verificar si la pregunta existe
        const pregunta = await Preguntas.findOne({ where: { id } });
        if (!pregunta) {
            return res.status(404).json({ message: 'No existe un registro de pregunta con ese ID' });
        }

        await Preguntas.update(
            { id_examen, tipo, texto, puntuacion },
            { where: { id } }
        );

        res.status(200).json({ message: 'Pregunta actualizada' });
    } catch (error) {
        console.error('Error al actualizar la pregunta:', error);
        res.status(500).json({ message: 'Error al actualizar la pregunta' });
    }
}

exports.deletePregunta = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si la pregunta existe
        const pregunta = await Preguntas.findOne({ where: { id } });
        if (!pregunta) {
            return res.status(404).json({ message: 'No existe un registro de pregunta con ese ID' });
        }

        await Preguntas.destroy({ where: { id } });
        res.status(200).json({ message: 'Pregunta eliminada' });
    } catch (error) {
        console.error('Error al eliminar la pregunta:', error);
        res.status(500).json({ message: 'Error al eliminar la pregunta' });
    }
}