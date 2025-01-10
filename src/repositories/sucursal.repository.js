// src/repositories/sucursal.repository.js
const Sucursal = require("../models/sucursal.model");

const SucursalRepository = {
    getAll: async () => {
        return await Sucursal.findAll();
    },

    getById: async (idSucursal) => {
        return await Sucursal.findByPk(idSucursal);
    },

    create: async (data) => {
        return await Sucursal.create(data);
    },

    update: async (idSucursal, data) => {
        const sucursal = await Sucursal.findByPk(idSucursal);
        if (!sucursal) return null;
        await sucursal.update(data);
        return sucursal;
    },

    delete: async (idSucursal) => {
        const sucursal = await Sucursal.findByPk(idSucursal);
        if (!sucursal) return null;
        await sucursal.destroy();
        return sucursal;
    },
};

module.exports = SucursalRepository;
