// controllers/tareasController.js
const Tarea = require('../models/Tarea');
const Entrega_tareas = require('../models/EntregaTareas');
const fs = require('fs');
const path = require('path');

// Obtener todas las tareas por asignatura
exports.getTareasByAsignatura = async (req, res) => {
    try {
        const { id_asignatura } = req.params;
        const tareas = await Tarea.findAll({
            where: { id_asignatura: id_asignatura },
            order: [['fecha_publicacion', 'DESC']],
        });
        res.status(200).json(tareas);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).json({ message: 'Error al obtener tareas' });
    }
};



// Crear una nueva tarea con archivo
exports.createTarea = async (req, res) => {
    try {

        const { titulo, descripcion, fecha_entrega, id_asignatura } = req.body;

        console.log('Archivo recibido:', req.file);
        const archivo_docente = req.file?.path.replace(/^.*[\\\/]/, '') || null;

        const tarea = await Tarea.create({ titulo, descripcion, fecha_entrega, id_asignatura, archivo_docente });

        res.status(201).json(tarea);

    } catch (error) {
        console.error('Error al crear tarea:', error);
        res.status(500).json({ message: 'Error al crear tarea' });
    }
};



// Actualizar una tarea con archivo
exports.updateTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, fecha_entrega } = req.body;

        // Buscar la tarea existente
        const tarea = await Tarea.findByPk(id);
        if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada' });

        // Manejo del archivo
        let archivo_docente = tarea.archivo_docente; // Archivo existente

        if (req.file) {
            // Si se sube un nuevo archivo, elimina el anterior
            if (archivo_docente) {

                const previousFilePath = path.join(__dirname, '../uploads', archivo_docente);
                
                if (fs.existsSync(previousFilePath)) {
                    fs.unlinkSync(previousFilePath); // Elimina el archivo anterior
                }
            }
            archivo_docente = req.file.path.replace(/^.*[\\\/]/, ''); // Nuevo archivo
        }

        // Actualizar los datos en la base de datos
        await Tarea.update(
            { titulo, descripcion, fecha_entrega, archivo_docente },
            { where: { id } }
        );

        res.status(200).json({ message: 'Tarea actualizada con éxito' });
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        res.status(500).json({ message: 'Error al actualizar tarea' });
    }
};



// Para obtener una tarea por id
exports.getTareaById = async (req, res) => {
    try {
        const { id } = req.params;
        const tarea = await Tarea.findOne({ where: { id } });
        if (!tarea) {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(tarea);
    } catch (error) {
        console.error('Error al obtener tarea:', error);
        res.status(500).json({ message: 'Error al obtener tarea' });
    }
}



// Obtener todas las entregas de una tarea
exports.getEntregasByTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const entregas = await Entrega_tareas.findAll({ where: { id_tarea: id } });
        res.status(200).json(entregas);
    } catch (error) {
        console.error('Error al obtener entregas:', error);
        res.status(500).json({ message: 'Error al obtener entregas' });
    }

};



// Subir entrega de tarea (estudiante)
exports.uploadEntrega = async (req, res) => {
    try {
        const { id_tarea, id_estudiante } = req.body;
        const archivo_estudiante = req.file.path; // Ruta del archivo subido
        const entrega = await Entrega_tareas.create({ id_tarea, id_estudiante, archivo_estudiante });
        res.status(201).json(entrega);
    } catch (error) {
        console.error('Error al subir entrega:', error);
        res.status(500).json({ message: 'Error al subir entrega' });
    }
};



// Eliminar una tarea
exports.deleteTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tarea = await Tarea.findByPk(id);
        if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada' });

        // Eliminar el archivo docente
        const filePath = path.join(__dirname, '../uploads', tarea.archivo_docente);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        await tarea.destroy();
        res.status(204).json("Tarea eliminada con éxito");
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        res.status(500).json({ message: 'Error al eliminar tarea' });
    }
};