const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Categoria = require("./categoria.model");
const Proveedor = require("./proveedor.model");

const Producto = sequelize.define(
    "Producto",
    {
        idProducto: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        codigoProducto: {
            type: DataTypes.STRING(50),
        },
        descripcion: {
            type: DataTypes.STRING(255),
        },
        notas: {
            type: DataTypes.STRING(255),
        },
        stock: {
            type: DataTypes.INTEGER,
        },
        idCategoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Categoria,
                key: "idCategoria",
            },
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        },
        marca: {
            type: DataTypes.STRING(50),
        },
        idProveedor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Proveedor,
                key: "idProveedor",
            },
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        },
        precioCompra: {
            type: DataTypes.DECIMAL(10, 2),
        },
        precioVenta: {
            type: DataTypes.DECIMAL(10, 2),
        },
        cantidadMedida: {
            type: DataTypes.DECIMAL(10, 2),
        },
        unidadMedida: {
            type: DataTypes.STRING(20),
        },
        fechaVencimiento: {
            type: DataTypes.DATE,
        },
        fechaRegistro: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        fechaRetiro: {
            type: DataTypes.DATE,
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
        tableName: "Producto",
        timestamps: false,
    }
);

Producto.belongsTo(Categoria, { foreignKey: "idCategoria" });
Producto.belongsTo(Proveedor, { foreignKey: "idProveedor" });

module.exports = Producto;
