const DetalleVenta = require("../models/detalle_venta.model");
const Producto = require("../models/producto.model");

const DetalleVentaRepository = {
    // Crear un detalle de venta
    create: async (data) => {
        return await DetalleVenta.create(data);
    },

    // Obtener todos los detalles de ventas
    getAll: async () => {
        return await DetalleVenta.findAll({
            include: [
                {
                    model: Producto,
                    attributes: [
                        "idProducto",
                        "Nombre",
                        "descripcion",
                        "precioVenta",
                    ],
                },
            ],
        });
    },

    // Obtener detalles por ID de venta
    getByVentaId: async (idVenta) => {
        return await DetalleVenta.findAll({
            where: { idVenta },
            include: [
                {
                    model: Producto,
                    attributes: [
                        "idProducto",
                        "Nombre",
                        "descripcion",
                        "precioVenta",
                    ],
                },
            ],
        });
    },

    // Obtener un detalle específico por ID de venta y producto
    getByVentaAndProductoId: async (idVenta, idProducto) => {
        return await DetalleVenta.findOne({
            where: { idVenta, idProducto },
            include: [
                {
                    model: Producto,
                    attributes: [
                        "idProducto",
                        "Nombre",
                        "descripcion",
                        "precioVenta",
                    ],
                },
            ],
        });
    },

    // Actualizar un detalle de venta
    update: async (idVenta, idProducto, data) => {
        const detalle = await DetalleVenta.findOne({
            where: { idVenta, idProducto },
        });
        if (!detalle)
            throw new Error(
                `Detalle no encontrado para venta ${idVenta} y producto ${idProducto}`
            );
        return await detalle.update(data);
    },

    // Eliminar un detalle de venta
    delete: async (idVenta, idProducto) => {
        const detalle = await DetalleVenta.findOne({
            where: { idVenta, idProducto },
        });
        if (!detalle)
            throw new Error(
                `Detalle no encontrado para venta ${idVenta} y producto ${idProducto}`
            );
        await detalle.destroy();
        return detalle;
    },
};

module.exports = DetalleVentaRepository;
