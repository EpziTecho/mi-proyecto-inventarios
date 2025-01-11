// src/controllers/cliente.controller.js
const ClienteService = require("../services/cliente.service");

const ClienteController = {
    getAll: async (req, res) => {
        try {
            const clientes = await ClienteService.listar();
            res.json(clientes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener clientes" });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const cliente = await ClienteService.obtenerPorId(id);
            res.json(cliente);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const creatorId = req.user ? req.user.id : null; // Suponiendo middleware de autenticación
            const nuevoCliente = await ClienteService.crear(
                req.body,
                creatorId
            );
            res.status(201).json(nuevoCliente);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updaterId = req.user ? req.user.id : null; // Suponiendo middleware de autenticación
            const actualizado = await ClienteService.actualizar(
                id,
                req.body,
                updaterId
            );
            res.json(actualizado);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const { id } = req.params;
            await ClienteService.eliminar(id);
            res.json({ message: `Cliente ${id} eliminado` });
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },
};

module.exports = ClienteController;
