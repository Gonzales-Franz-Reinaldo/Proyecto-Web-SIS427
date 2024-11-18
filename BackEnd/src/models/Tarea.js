// models/Tarea.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tarea = sequelize.define('Tarea', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    fecha_publicacion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    fecha_entrega: { type: DataTypes.DATE, allowNull: false },
    id_asignatura: { type: DataTypes.INTEGER, allowNull: false },
    archivo_docente: { type: DataTypes.STRING, allowNull: true }, // Ruta del archivo subido por el docente
}, {
    tableName: 'tareas',
    timestamps: false,
});

module.exports = Tarea;
