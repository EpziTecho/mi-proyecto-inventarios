// src/repositories/proveedor.repository.js
const Proveedor = require("../models/proveedor.model");

const ProveedorRepository = {
    getAll: async () => {
        return await Proveedor.findAll();
    },

    getById: async (idProveedor) => {
        return await Proveedor.findByPk(idProveedor);
    },

    create: async (data) => {
        return await Proveedor.create(data);
    },

    update: async (idProveedor, data) => {
        const proveedor = await Proveedor.findByPk(idProveedor);
        if (!proveedor) return null;
        await proveedor.update(data);
        return proveedor;
    },

    delete: async (idProveedor) => {
        const proveedor = await Proveedor.findByPk(idProveedor);
        if (!proveedor) return null;
        await proveedor.destroy();
        return proveedor;
    },
};

module.exports = ProveedorRepository;
