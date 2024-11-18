// models/Entrega.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Entrega_tareas = sequelize.define('Entrega_tareas', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_tarea: { type: DataTypes.INTEGER, allowNull: false },
    id_estudiante: { type: DataTypes.INTEGER, allowNull: false },
    archivo_estudiante: { type: DataTypes.STRING, allowNull: false }, // Ruta del archivo subido
    fecha_entrega: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'entrega_tareas',
    timestamps: false,
});

module.exports = Entrega_tareas;
