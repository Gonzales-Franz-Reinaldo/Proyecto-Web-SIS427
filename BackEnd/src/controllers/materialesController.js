const Material = require('../models/Material');
const fs = require('fs');
const path = require('path');


// Obtener todos los materiales de una asignatura
exports.getMaterialesByAsignatura = async (req, res) => {
    try {
        const { id_asignatura } = req.params;
        const materiales = await Material.findAll({ where: { id_asignatura } });
        res.status(200).json(materiales);
    } catch (error) {
        console.error('Error al obtener materiales:', error);
        res.status(500).json({ message: 'Error al obtener materiales' });
    }
};

// Crear un nuevo material
exports.createMaterial = async (req, res) => {
    try {
        const { titulo, descripcion, id_asignatura } = req.body;
        const archivo = req.file?.path.replace(/^.*[\\\/]/, '') || null;

        const material = await Material.create({ titulo, descripcion, archivo, id_asignatura });
        res.status(201).json(material);
    } catch (error) {
        console.error('Error al crear material:', error);
        res.status(500).json({ message: 'Error al crear material' });
    }
};

// Actualizar un material existente
exports.updateMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion } = req.body;

        const material = await Material.findByPk(id);
        if (!material) return res.status(404).json({ message: 'Material no encontrado' });

        let archivo = material.archivo;
        if (req.file) {
            if (archivo) {
                const previousFilePath = path.join(__dirname, '../uploads', archivo);
                if (fs.existsSync(previousFilePath)) fs.unlinkSync(previousFilePath);
            }
            archivo = req.file.path.replace(/^.*[\\\/]/, '');
        }

        await Material.update({ titulo, descripcion, archivo }, { where: { id } });
        res.status(200).json({ message: 'Material actualizado con éxito' });
    } catch (error) {
        console.error('Error al actualizar material:', error);
        res.status(500).json({ message: 'Error al actualizar material' });
    }
};



// Eliminar un material
exports.deleteMaterial = async (req, res) => {
    try {
        const { id } = req.params;

        const material = await Material.findByPk(id);
        if (!material) return res.status(404).json({ message: 'Material no encontrado' });

        const filePath = path.join(__dirname, '../uploads', material.archivo);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        await Material.destroy({ where: { id } });
        res.status(200).json({ message: 'Material eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar material:', error);
        res.status(500).json({ message: 'Error al eliminar material' });
    }
};






// Obtener materiales por asignatura
exports.getMaterialesPorAsignatura = async (req, res) => {
    const { id_asignatura } = req.params;

    try {
        const materiales = await Material.findAll({
            where: { id_asignatura },
            attributes: ['id', 'titulo', 'descripcion', 'archivo', 'fecha_publicacion'],
        });

        res.status(200).json(materiales);
    } catch (error) {
        console.error('Error al obtener materiales:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};