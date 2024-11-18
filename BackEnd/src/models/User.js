const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    ci: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.ENUM('docente', 'estudiante'), allowNull: false },
    fecha_registro: { type: DataTypes.DATE, allowNull: false },
});

module.exports = User;
