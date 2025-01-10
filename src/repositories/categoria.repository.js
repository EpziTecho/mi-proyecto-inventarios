// src/repositories/categoria.repository.js
const Categoria = require("../models/categoria.model");

const CategoriaRepository = {
    getAll: async () => {
        return await Categoria.findAll();
    },

    getById: async (idCategoria) => {
        return await Categoria.findByPk(idCategoria);
    },

    create: async (data) => {
        return await Categoria.create(data);
    },

    update: async (idCategoria, data) => {
        const categoria = await Categoria.findByPk(idCategoria);
        if (!categoria) return null;
        await categoria.update(data);
        return categoria;
    },

    delete: async (idCategoria) => {
        const categoria = await Categoria.findByPk(idCategoria);
        if (!categoria) return null;
        await categoria.destroy();
        return categoria;
    },
};

module.exports = CategoriaRepository;
