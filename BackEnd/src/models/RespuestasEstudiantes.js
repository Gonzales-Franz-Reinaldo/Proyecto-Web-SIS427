const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RespuestasEstudiantes = sequelize.define('RespuestasEstudiantes', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_examen: { type: DataTypes.INTEGER, allowNull: false },
    id_estudiante: { type: DataTypes.INTEGER, allowNull: false },
    id_pregunta: { type: DataTypes.INTEGER, allowNull: false },
    respuesta: { type: DataTypes.TEXT },
    es_correcta: { type: DataTypes.BOOLEAN, defaultValue: null }
}, {
    tableName: 'respuestas_estudiantes',
    timestamps: false
});

module.exports = RespuestasEstudiantes;
