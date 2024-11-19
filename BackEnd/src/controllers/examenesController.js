const Examenes = require('../models/Examenes');

exports.createExamen = async (req, res) => {
    try {
        const { titulo, descripcion, id_asignatura, fecha_publicacion, fecha_entrega, puntuacion_total, duracion } = req.body;
        const examen = await Examenes.create({
            titulo,
            descripcion,
            id_asignatura,
            fecha_publicacion,
            fecha_entrega,
            puntuacion_total,
            duracion
        });
        res.status(201).json(examen);
    } catch (error) {
        console.error('Error al crear examen:', error);
        res.status(500).json({ message: 'Error al crear examen' });
    }
};

exports.getExamenesByAsignatura = async (req, res) => {
    try {
        const { id_asignatura } = req.params;
        const examenes = await Examenes.findAll({ where: { id_asignatura } });
        res.status(200).json(examenes);
    } catch (error) {
        console.error('Error al obtener examenes:', error);
        res.status(500).json({ message: 'Error al obtener examenes' });
    }
};


exports.updateExamen = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, id_asignatura, fecha_publicacion, fecha_entrega, duracion } = req.body;

        // Verificar si el examen existe
        const examen = await Examenes.findOne({ where: { id } });
        if (!examen) {
            return res.status(404).json({ message: 'No existe un registro de examen con ese ID' });
        }

        await Examenes.update(
            { titulo, descripcion, id_asignatura, fecha_publicacion, fecha_entrega, duracion },
            { where: { id } }
        );

        res.status(200).json({ message: 'Examen actualizado' });
    } catch (error) {
        console.error('Error al actualizar el examen:', error);
        res.status(500).json({ message: 'Error al actualizar el examen' });
    }
}



exports.deleteExamen = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el examen existe
        const examen = await Examenes.findOne({ where: { id } });
        if (!examen) {
            return res.status(404).json({ message: 'No existe un registro de examen con ese ID' });
        }

        await Examenes.destroy({ where: { id } });
        res.status(200).json({ message: 'Examen eliminado' });
    } catch (error) {
        console.error('Error al eliminar el examen:', error);
        res.status(500).json({ message: 'Error al eliminar el examen' });
    }
}



exports.publicarExamen = async (req, res) => {
    try {
        const { id } = req.params;
        const examen = await Examenes.findByPk(id);
        if (!examen) {
            return res.status(404).json({ message: 'Examen no encontrado' });
        }

        examen.estado = 'publicado';
        await examen.save();

        res.status(200).json(examen);
    } catch (error) {
        console.error('Error al publicar el examen:', error);
        res.status(500).json({ message: 'Error al publicar el examen' });
    }
};
