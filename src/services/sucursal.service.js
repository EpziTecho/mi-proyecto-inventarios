// src/services/sucursal.service.js
const SucursalRepository = require("../repositories/sucursal.repository");

const SucursalService = {
    listar: async () => {
        return await SucursalRepository.getAll();
    },

    obtenerPorId: async (idSucursal) => {
        const sucursal = await SucursalRepository.getById(idSucursal);
        if (!sucursal)
            throw new Error(`Sucursal con ID ${idSucursal} no encontrada`);
        return sucursal;
    },

    crear: async (data, creatorId) => {
        data.createdBy = creatorId || null;
        return await SucursalRepository.create(data);
    },

    actualizar: async (idSucursal, data, updaterId) => {
        const existente = await SucursalRepository.getById(idSucursal);
        if (!existente)
            throw new Error(`Sucursal con ID ${idSucursal} no existe`);
        data.updatedBy = updaterId || null;
        return await SucursalRepository.update(idSucursal, data);
    },

    eliminar: async (idSucursal) => {
        const existente = await SucursalRepository.getById(idSucursal);
        if (!existente)
            throw new Error(`Sucursal con ID ${idSucursal} no existe`);
        return await SucursalRepository.delete(idSucursal);
    },
};

module.exports = SucursalService;
