// src/repositories/vendedor.repository.js
const { Vendedor, Rol } = require("../models");

const VendedorRepository = {
    getAll: async () => {
        return await Vendedor.findAll({
            include: [{ model: Rol, attributes: ["idRol", "nombreRol"] }],
        });
    },

    getById: async (idVendedor) => {
        return await Vendedor.findByPk(idVendedor, {
            include: [{ model: Rol, attributes: ["idRol", "nombreRol"] }],
        });
    },

    create: async (data) => {
        return await Vendedor.create(data);
    },

    update: async (idVendedor, data) => {
        const vendedor = await Vendedor.findByPk(idVendedor);
        if (!vendedor) return null;
        await vendedor.update(data);
        return vendedor;
    },

    delete: async (idVendedor) => {
        const vendedor = await Vendedor.findByPk(idVendedor);
        if (!vendedor) return null;
        await vendedor.destroy();
        return vendedor;
    },

    findByUsername: async (username) => {
        return await Vendedor.findOne({ where: { username } });
    },
};

module.exports = VendedorRepository;
