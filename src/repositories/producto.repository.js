// src/repositories/producto.repository.js
const Producto = require("../models/producto.model");
const Categoria = require("../models/categoria.model");
const Proveedor = require("../models/proveedor.model");

const ProductoRepository = {
    getAll: async () => {
        return await Producto.findAll({
            include: [
                {
                    model: Categoria,
                    attributes: [
                        "idCategoria",
                        "nombreCategoria",
                        "descripcionCategoria",
                    ],
                },
                {
                    model: Proveedor,
                    attributes: [
                        "idProveedor",
                        "nombreProveedor",
                        "ruc",
                        "correo",
                    ],
                },
            ],
        });
    },

    getById: async (idProducto) => {
        return await Producto.findByPk(idProducto, {
            include: [
                {
                    model: Categoria,
                    attributes: [
                        "idCategoria",
                        "nombreCategoria",
                        "descripcionCategoria",
                    ],
                },
                {
                    model: Proveedor,
                    attributes: [
                        "idProveedor",
                        "nombreProveedor",
                        "ruc",
                        "correo",
                    ],
                },
            ],
        });
    },

    create: async (data) => {
        return await Producto.create(data);
    },

    update: async (idProducto, data) => {
        const producto = await Producto.findByPk(idProducto);
        if (!producto) return null;
        await producto.update(data);
        return producto;
    },

    delete: async (idProducto) => {
        const producto = await Producto.findByPk(idProducto);
        if (!producto) return null;
        await producto.destroy();
        return producto;
    },
};

module.exports = ProductoRepository;
