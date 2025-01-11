// src/repositories/detalle_venta.repository.js
const DetalleVenta = require("../models/detalle_venta.model");
const Producto = require("../models/producto.model");

const DetalleVentaRepository = {
    getAll: async () => {
        return await DetalleVenta.findAll({
            include: [
                {
                    model: Producto,
                    attributes: ["idProducto", "Nombre", "precioVenta"],
                },
            ],
        });
    },

    getByVentaId: async (idVenta) => {
        return await DetalleVenta.findAll({
            where: { idVenta },
            include: [
                {
                    model: Producto,
                    attributes: ["idProducto", "Nombre", "precioVenta"],
                },
            ],
        });
    },

    create: async (data) => {
        return await DetalleVenta.create(data);
    },

    update: async (idVenta, idProducto, data) => {
        const detalle = await DetalleVenta.findOne({
            where: { idVenta, idProducto },
        });
        if (!detalle) return null;
        await detalle.update(data);
        return detalle;
    },

    delete: async (idVenta, idProducto) => {
        const detalle = await DetalleVenta.findOne({
            where: { idVenta, idProducto },
        });
        if (!detalle) return null;
        await detalle.destroy();
        return detalle;
    },
};

module.exports = DetalleVentaRepository;
