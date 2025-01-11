// src/services/venta.service.js
const VentaRepository = require("../repositories/venta.repository");
const DetalleVentaRepository = require("../repositories/detalle_venta.repository");

const VentaService = {
    listar: async () => {
        return await VentaRepository.getAll();
    },

    obtenerPorId: async (idVenta) => {
        const venta = await VentaRepository.getById(idVenta);
        if (!venta) throw new Error(`Venta con ID ${idVenta} no encontrada`);
        return venta;
    },

    crear: async (ventaData, productos, creatorId) => {
        // Crear una sola venta
        ventaData.createdBy = creatorId || null;
        const venta = await VentaRepository.create(ventaData);

        // Asociar los productos en la tabla detalle_venta
        const detalles = await Promise.all(
            productos.map(async (producto) => {
                return await DetalleVentaRepository.create({
                    idVenta: venta.idVenta,
                    idProducto: producto.idProducto,
                    cantidad: producto.cantidad,
                    descuento: producto.descuento || 0,
                });
            })
        );

        return { venta, detalles };
    },

    actualizar: async (idVenta, data, updaterId) => {
        const existente = await VentaRepository.getById(idVenta);
        if (!existente) throw new Error(`Venta con ID ${idVenta} no existe`);
        data.updatedBy = updaterId || null;
        return await VentaRepository.update(idVenta, data);
    },

    eliminar: async (idVenta) => {
        const existente = await VentaRepository.getById(idVenta);
        if (!existente) throw new Error(`Venta con ID ${idVenta} no existe`);
        return await VentaRepository.delete(idVenta);
    },
};

module.exports = VentaService;
