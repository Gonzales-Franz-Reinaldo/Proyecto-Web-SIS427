const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ResultadoExamen = sequelize.define('ResultadoExamen', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_examen: { type: DataTypes.INTEGER, allowNull: false },
    id_estudiante: { type: DataTypes.INTEGER, allowNull: false },
    puntuacion_obtenida: { type: DataTypes.FLOAT, allowNull: true },
    fecha_inicio: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_completado: { type: DataTypes.DATE, allowNull: true },
    estado: { type: DataTypes.ENUM('pendiente', 'completado'), allowNull: false, defaultValue: 'pendiente' },
}, {
    tableName: 'resultados_examenes',
    timestamps: false,
});

module.exports = ResultadoExamen;
