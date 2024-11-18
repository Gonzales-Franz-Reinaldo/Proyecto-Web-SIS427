const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Examenes = sequelize.define('Examenes', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT },
    id_asignatura: { type: DataTypes.INTEGER, allowNull: false },
    fecha_publicacion: { type: DataTypes.DATE, allowNull: false },
    fecha_entrega: { type: DataTypes.DATE, allowNull: false },
    estado: { type: DataTypes.ENUM('borrador', 'publicado'), defaultValue: 'borrador' },
    puntuacion_total: { type: DataTypes.INTEGER, defaultValue: 100 }
}, {
    tableName: 'examenes',
    timestamps: false
});

module.exports = Examenes;
