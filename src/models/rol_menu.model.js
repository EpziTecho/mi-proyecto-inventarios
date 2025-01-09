// src/models/rol_menu.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const RolMenu = sequelize.define(
    "Rol_menu",
    {
        idRol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        idmenu: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        tableName: "Rol_menu",
        timestamps: false,
    }
);

module.exports = RolMenu;
