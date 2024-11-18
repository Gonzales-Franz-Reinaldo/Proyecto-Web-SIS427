const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

// Carga las variables de entorno desde .env
dotenv.config();

// Configuración de la conexión
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        logging: false, // Cambia a true si deseas ver las consultas SQL
    }
);

// Probar la conexión
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos exitosa.");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
    }
};

testConnection();

module.exports = sequelize;
