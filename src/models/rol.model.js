const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Rol = sequelize.define(
    "Rol",
    {
        // Sequelize automáticamente asume la tabla 'Rols' si no configuras "tableName",
        // así que forzamos un tableName para que use la tabla "Rol".
        idRol: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreRol: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        descripcionRol: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    },
    {
        tableName: "Rol",
        timestamps: false, // si tu tabla no tiene createdAt, updatedAt
    }
);

module.exports = Rol;
