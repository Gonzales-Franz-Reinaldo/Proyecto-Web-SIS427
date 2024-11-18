const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ResultadosExamenes = sequelize.define('ResultadosExamenes', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_examen: { type: DataTypes.INTEGER, allowNull: false },
    id_estudiante: { type: DataTypes.INTEGER, allowNull: false },
    puntuacion_obtenida: { type: DataTypes.INTEGER, allowNull: false },
    fecha_completado: { type: DataTypes.DATE, allowNull: false }
}, {
    tableName: 'resultados_examenes',
    timestamps: false
});

module.exports = ResultadosExamenes;
