require("dotenv").config();
const { Sequelize } = require("sequelize");

// Crea la instancia de Sequelize con las variables de entorno
const sequelize = new Sequelize(
    process.env.DB_NAME, // MiBD
    process.env.DB_USER, // root
    process.env.DB_PASSWORD, // '' (si no tienes contraseña)
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        port: process.env.DB_PORT || 3306,
        logging: false, // Pon true para ver las queries en consola
    }
);

module.exports = sequelize;
