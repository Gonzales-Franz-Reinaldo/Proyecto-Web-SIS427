const Examenes = require('../models/Examenes');

exports.createExamen = async (req, res) => {
    try {
        const { titulo, descripcion, id_asignatura, fecha_publicacion, fecha_entrega } = req.body;
        const examen = await Examenes.create({ titulo, descripcion, id_asignatura, fecha_publicacion, fecha_entrega });
        res.status(201).json(examen);
    } catch (error) {
        console.error('Error al crear el examen:', error);
        res.status(500).json({ message: 'Error al crear el examen' });
    }
};

exports.getExamenesByAsignatura = async (req, res) => {
    try {
        const { id_asignatura } = req.params;
        const examenes = await Examenes.findAll({ where: { id_asignatura } });
        res.status(200).json(examenes);
    } catch (error) {
        console.error('Error al obtener exámenes:', error);
        res.status(500).json({ message: 'Error al obtener exámenes' });
    }
};

// Otros métodos como update, delete...
// updateExamen
exports.updateExamen = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, id_asignatura, fecha_publicacion, fecha_entrega } = req.body;
        await Examenes.update({ titulo, descripcion, id_asignatura, fecha_publicacion, fecha_entrega }, { where: { id } });
        res.status(200).json({ message: 'Examen actualizado' });
    }
    catch (error) {
        console.error('Error al actualizar el examen:', error);
        res.status(500).json({ message: 'Error al actualizar el examen' });
    }
}

// deleteExamen
exports.deleteExamen = async (req, res) => {
    try {
        const { id } = req.params;
        await Examenes.destroy({ where: { id } });
        res.status(200).json({ message: 'Examen eliminado' });
    }

    catch (error) {
        console.error('Error al eliminar el examen:', error);
        res.status(500).json({ message: 'Error al eliminar el examen' });
    }

}
