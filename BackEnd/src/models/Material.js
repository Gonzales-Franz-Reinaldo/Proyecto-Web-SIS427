// models/Material.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Material = sequelize.define('Material', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
    archivo: { type: DataTypes.STRING, allowNull: false },
    fecha_publicacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    id_asignatura: { type: DataTypes.INTEGER, allowNull: false },
}, {
    tableName: 'materiales',
    timestamps: false,
});

// Asociación con la tabla Asignatura
// Material.belongsTo(Asignatura, { foreignKey: 'id_asignatura', as: 'Asignatura' });


module.exports = Material;
