// src/repositories/cliente.repository.js
const Cliente = require("../models/cliente.model");

const ClienteRepository = {
    getAll: async () => {
        return await Cliente.findAll();
    },

    getById: async (idCliente) => {
        return await Cliente.findByPk(idCliente);
    },

    create: async (data) => {
        return await Cliente.create(data);
    },

    update: async (idCliente, data) => {
        const cliente = await Cliente.findByPk(idCliente);
        if (!cliente) return null;
        await cliente.update(data);
        return cliente;
    },

    delete: async (idCliente) => {
        const cliente = await Cliente.findByPk(idCliente);
        if (!cliente) return null;
        await cliente.destroy();
        return cliente;
    },
};

module.exports = ClienteRepository;
