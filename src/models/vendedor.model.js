// src/models/vendedor.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Rol = require("./rol.model");

const Vendedor = sequelize.define(
    "Vendedor",
    {
        idVendedor: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        foto: {
            type: DataTypes.STRING(255),
        },
        dni: {
            type: DataTypes.STRING(20),
        },
        tfno: {
            type: DataTypes.STRING(20),
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
        },
        passwordHash: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        passwordSalt: {
            type: DataTypes.STRING(255),
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        lastLogin: {
            type: DataTypes.DATE,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        idRol: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Rol,
                key: "idRol",
            },
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        },
    },
    {
        tableName: "Vendedor",
        timestamps: false,
    }
);

Vendedor.belongsTo(Rol, {
    foreignKey: "idRol",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});
Rol.hasMany(Vendedor, {
    foreignKey: "idRol",
});

module.exports = Vendedor;
