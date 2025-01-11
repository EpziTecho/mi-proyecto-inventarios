// src/services/detalle_venta.service.js
const DetalleVentaRepository = require("../repositories/detalle_venta.repository");

const DetalleVentaService = {
    listar: async () => {
        return await DetalleVentaRepository.getAll();
    },

    obtenerPorVentaId: async (idVenta) => {
        const detalles = await DetalleVentaRepository.getByVentaId(idVenta);
        if (!detalles)
            throw new Error(
                `No se encontraron detalles para la venta con ID ${idVenta}`
            );
        return detalles;
    },

    crear: async (data) => {
        return await DetalleVentaRepository.create(data);
    },

    actualizar: async (idVenta, idProducto, data) => {
        const existente = await DetalleVentaRepository.update(
            idVenta,
            idProducto,
            data
        );
        if (!existente)
            throw new Error(
                `No se encontró el detalle de venta con Venta ID ${idVenta} y Producto ID ${idProducto}`
            );
        return existente;
    },

    eliminar: async (idVenta, idProducto) => {
        const existente = await DetalleVentaRepository.delete(
            idVenta,
            idProducto
        );
        if (!existente)
            throw new Error(
                `No se encontró el detalle de venta con Venta ID ${idVenta} y Producto ID ${idProducto}`
            );
        return existente;
    },
};

module.exports = DetalleVentaService;
