const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Venta = require("./venta.model");
const Producto = require("./producto.model");

const DetalleVenta = sequelize.define(
    "DetalleVenta",
    {
        idVenta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Venta,
                key: "idVenta",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        idProducto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Producto,
                key: "idProducto",
            },
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        descuento: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.0,
        },
    },
    {
        tableName: "detalle_venta",
        timestamps: false,
    }
);

DetalleVenta.belongsTo(Venta, { foreignKey: "idVenta" });
DetalleVenta.belongsTo(Producto, { foreignKey: "idProducto" });

module.exports = DetalleVenta;
