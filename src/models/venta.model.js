// src/models/venta.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Cliente = require("./cliente.model");
const Vendedor = require("./vendedor.model");
const Sucursal = require("./sucursal.model");

const Venta = sequelize.define(
    "Venta",
    {
        idVenta: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idCliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Cliente,
                key: "idCliente",
            },
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        },
        idVendedor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Vendedor,
                key: "idVendedor",
            },
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        },
        idSucursal: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Sucursal,
                key: "idSucursal",
            },
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        },
        tipoPago: {
            type: DataTypes.STRING(50),
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        igv: {
            type: DataTypes.DECIMAL(10, 2),
        },
        subTotal: {
            type: DataTypes.DECIMAL(10, 2),
        },
        montoTotal: {
            type: DataTypes.DECIMAL(10, 2),
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "Venta",
        timestamps: false,
    }
);

Venta.belongsTo(Cliente, { foreignKey: "idCliente" });
Venta.belongsTo(Vendedor, { foreignKey: "idVendedor" });
Venta.belongsTo(Sucursal, { foreignKey: "idSucursal" });

module.exports = Venta;
