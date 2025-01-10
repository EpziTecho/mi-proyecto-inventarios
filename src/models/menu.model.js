// src/models/menu.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Menu = sequelize.define(
    "Menu",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING(100),
        },
    },
    {
        tableName: "menu",
        timestamps: false,
    }
);

module.exports = Menu;
