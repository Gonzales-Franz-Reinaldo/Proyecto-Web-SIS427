const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RespuestaEstudiante = sequelize.define('RespuestaEstudiante', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_examen: { type: DataTypes.INTEGER, allowNull: false },
    id_estudiante: { type: DataTypes.INTEGER, allowNull: false },
    id_pregunta: { type: DataTypes.INTEGER, allowNull: false },
    respuesta: { type: DataTypes.TEXT, allowNull: true },
    es_correcta: { type: DataTypes.BOOLEAN, allowNull: true },
    estado: { type: DataTypes.ENUM('pendiente', 'finalizada'), allowNull: false, defaultValue: 'pendiente' },
    fecha_respuesta: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'respuestas_estudiantes',
    timestamps: false,
});

module.exports = RespuestaEstudiante;
