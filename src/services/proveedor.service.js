// src/services/proveedor.service.js
const ProveedorRepository = require("../repositories/proveedor.repository");

const ProveedorService = {
    listar: async () => {
        return await ProveedorRepository.getAll();
    },

    obtenerPorId: async (idProveedor) => {
        const prov = await ProveedorRepository.getById(idProveedor);
        if (!prov)
            throw new Error(`Proveedor con ID ${idProveedor} no encontrado`);
        return prov;
    },

    crear: async (data, creatorId) => {
        data.createdBy = creatorId || null;
        return await ProveedorRepository.create(data);
    },

    actualizar: async (idProveedor, data, updaterId) => {
        const existente = await ProveedorRepository.getById(idProveedor);
        if (!existente)
            throw new Error(`Proveedor con ID ${idProveedor} no existe`);
        data.updatedBy = updaterId || null;
        return await ProveedorRepository.update(idProveedor, data);
    },

    eliminar: async (idProveedor) => {
        const existente = await ProveedorRepository.getById(idProveedor);
        if (!existente)
            throw new Error(`Proveedor con ID ${idProveedor} no existe`);
        return await ProveedorRepository.delete(idProveedor);
    },
};

module.exports = ProveedorService;
