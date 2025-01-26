const Vendedor = require("../models/vendedor.model");
const { Op } = require("sequelize");

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

    update: async (id, data) => {
        return await Vendedor.update(data, { where: { idVendedor: id } });
    },

    delete: async (id) => {
        return await Vendedor.destroy({ where: { idVendedor: id } });
    },

    findByUniqueFields: async (dni, username, email, excludeId = null) => {
        const conditions = {
            [Op.or]: [{ dni }, { username }, { email }],
        };

        if (excludeId) {
            conditions[Op.and] = [{ idVendedor: { [Op.ne]: excludeId } }];
        }

        return await Vendedor.findOne({ where: conditions });
    },
    findByUsername: async (username) => {
        return await Vendedor.findOne({ where: { username } });
    },
};

module.exports = VendedorRepository;
