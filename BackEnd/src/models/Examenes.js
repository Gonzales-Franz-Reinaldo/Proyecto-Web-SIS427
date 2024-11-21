const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Examenes = sequelize.define('Examenes', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT },
    id_asignatura: { type: DataTypes.INTEGER, allowNull: false },
    fecha_publicacion: { type: DataTypes.DATE, allowNull: false }, // Acepta fecha y hora
    fecha_entrega: { type: DataTypes.DATE, allowNull: false }, // Acepta fecha y hora
    estado: { type: DataTypes.ENUM('borrador', 'publicado'), defaultValue: 'publicado' },
    puntuacion_total: { type: DataTypes.INTEGER, defaultValue: 100 },
    duracion: { type: DataTypes.INTEGER, defaultValue: 60 },
}, {
    tableName: 'examenes',
    timestamps: false
});

module.exports = Examenes;
