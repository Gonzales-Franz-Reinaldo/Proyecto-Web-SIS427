const Opciones = require('../models/Opciones');

exports.addOpcion = async (req, res) => {
    try {
        const { id_pregunta, texto, es_correcta } = req.body;
        const opcion = await Opciones.create({ id_pregunta, texto, es_correcta });
        res.status(201).json(opcion);
    } catch (error) {
        console.error('Error al añadir opción:', error);
        res.status(500).json({ message: 'Error al añadir opción' });
    }
};

exports.getOpcionesByPregunta = async (req, res) => {
    try {
        const { id_pregunta } = req.params;
        const opciones = await Opciones.findAll({ where: { id_pregunta } });
        res.status(200).json(opciones);
    } catch (error) {
        console.error('Error al obtener opciones:', error);
        res.status(500).json({ message: 'Error al obtener opciones' });
    }
}

exports.getOpcionById = async (req, res) => {
    try {
        const { id } = req.params;
        const opcion = await Opciones.findByPk(id);
        res.status(200).json(opcion);
    } catch (error) {
        console.error('Error al obtener la opción:', error);
        res.status(500).json({ message: 'Error al obtener la opción' });
    }
}

exports.updateOpcion = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_pregunta, texto, es_correcta } = req.body;

        // Verificar si la opción existe
        const opcion = await Opciones.findOne({ where: { id } });
        if (!opcion) {
            return res.status(404).json({ message: 'No existe un registro de opción con ese ID' });
        }

        await Opciones.update(
            { id_pregunta, texto, es_correcta },
            { where: { id } }
        );

        res.status(200).json({ message: 'Opción actualizada' });
    } catch (error) {
        console.error('Error al actualizar la opción:', error);
        res.status(500).json({ message: 'Error al actualizar la opción' });
    }
}

exports.deleteOpcion = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si la opción existe
        const opcion = await Opciones.findOne({ where: { id } });
        if (!opcion) {
            return res.status(404).json({ message: 'No existe un registro de opción con ese ID' });
        }

        await Opciones.destroy({ where: { id } });

        res.status(200).json({ message: 'Opción eliminada' });
    } catch (error) {
        console.error('Error al eliminar la opción:', error);
        res.status(500).json({ message: 'Error al eliminar la opción' });
    }
}
