const Vendedor = require("../models/vendedor.model");

const VendedorRepository = {
    getAll: async () => {
        return await Vendedor.findAll();
    },

    getById: async (id) => {
        return await Vendedor.findByPk(id);
    },

    create: async (data) => {
        return await Vendedor.create(data);
    },
    findByUsername: async (username) => {
        return await Vendedor.findOne({
            where: { username },
        });
    },

    update: async (id, data) => {
        const vendedor = await Vendedor.findByPk(id);
        if (!vendedor) return null;
        await vendedor.update(data);
        return vendedor;
    },

    delete: async (id) => {
        const vendedor = await Vendedor.findByPk(id);
        if (!vendedor) return null;
        await vendedor.destroy();
        return vendedor;
    },
};

module.exports = VendedorRepository;
