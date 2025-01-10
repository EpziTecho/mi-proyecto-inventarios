// src/services/categoria.service.js
const CategoriaRepository = require("../repositories/categoria.repository");

const CategoriaService = {
    listar: async () => {
        return await CategoriaRepository.getAll();
    },

    obtenerPorId: async (idCategoria) => {
        const categoria = await CategoriaRepository.getById(idCategoria);
        if (!categoria)
            throw new Error(`Categoría con ID ${idCategoria} no encontrada`);
        return categoria;
    },

    crear: async (data, creatorId) => {
        // Asigna el creador si se proporciona
        data.createdBy = creatorId;
        return await CategoriaRepository.create(data);
    },

    actualizar: async (idCategoria, data, updaterId) => {
        const existente = await CategoriaRepository.getById(idCategoria);
        if (!existente)
            throw new Error(`Categoría con ID ${idCategoria} no existe`);
        // Asigna el usuario que actualiza
        data.updatedBy = updaterId;
        return await CategoriaRepository.update(idCategoria, data);
    },

    eliminar: async (idCategoria) => {
        const existente = await CategoriaRepository.getById(idCategoria);
        if (!existente)
            throw new Error(`Categoría con ID ${idCategoria} no existe`);
        return await CategoriaRepository.delete(idCategoria);
    },
};

module.exports = CategoriaService;
