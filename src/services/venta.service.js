// src/services/venta.service.js
const VentaRepository = require("../repositories/venta.repository");

const VentaService = {
    listar: async () => {
        return await VentaRepository.getAll();
    },

    obtenerPorId: async (idVenta) => {
        const venta = await VentaRepository.getById(idVenta);
        if (!venta) throw new Error(`Venta con ID ${idVenta} no encontrada`);
        return venta;
    },

    crear: async (data, creatorId) => {
        data.createdBy = creatorId || null;
        return await VentaRepository.create(data);
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
