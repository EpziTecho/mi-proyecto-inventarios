// src/services/cliente.service.js
const ClienteRepository = require("../repositories/cliente.repository");

const ClienteService = {
    listar: async () => {
        return await ClienteRepository.getAll();
    },

    obtenerPorId: async (idCliente) => {
        const cliente = await ClienteRepository.getById(idCliente);
        if (!cliente)
            throw new Error(`Cliente con ID ${idCliente} no encontrado`);
        return cliente;
    },

    crear: async (data, creatorId) => {
        data.createdBy = creatorId || null;
        return await ClienteRepository.create(data);
    },

    actualizar: async (idCliente, data, updaterId) => {
        const existente = await ClienteRepository.getById(idCliente);
        if (!existente)
            throw new Error(`Cliente con ID ${idCliente} no existe`);
        data.updatedBy = updaterId || null;
        return await ClienteRepository.update(idCliente, data);
    },

    eliminar: async (idCliente) => {
        const existente = await ClienteRepository.getById(idCliente);
        if (!existente)
            throw new Error(`Cliente con ID ${idCliente} no existe`);
        return await ClienteRepository.delete(idCliente);
    },
};

module.exports = ClienteService;
