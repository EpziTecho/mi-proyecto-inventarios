// src/controllers/categoria.controller.js
const CategoriaService = require("../services/categoria.service");

const CategoriaController = {
    getAll: async (req, res) => {
        try {
            const categorias = await CategoriaService.listar();
            res.json(categorias);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener categorías" });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const categoria = await CategoriaService.obtenerPorId(id);
            res.json(categoria);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const creatorId = req.user ? req.user.id : null; // Suponiendo autenticación
            const nuevaCategoria = await CategoriaService.crear(
                req.body,
                creatorId
            );
            res.status(201).json(nuevaCategoria);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updaterId = req.user ? req.user.id : null; // Suponiendo autenticación
            const actualizada = await CategoriaService.actualizar(
                id,
                req.body,
                updaterId
            );
            res.json(actualizada);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const { id } = req.params;
            await CategoriaService.eliminar(id);
            res.json({ message: `Categoría ${id} eliminada` });
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },
};

module.exports = CategoriaController;
