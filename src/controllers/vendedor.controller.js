const VendedorService = require("../services/vendedor.service");

const VendedorController = {
    getAll: async (req, res) => {
        try {
            const vendedores = await VendedorService.listar();
            return res.json(vendedores);
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ error: "Error al obtener vendedores" });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const vendedor = await VendedorService.obtenerPorId(id);
            return res.json(vendedor);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const vendedorCreado = await VendedorService.crear(req.body);
            return res.status(201).json(vendedorCreado);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updated = await VendedorService.actualizar(id, req.body);
            return res.json(updated);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await VendedorService.eliminar(id);
            return res.json({ message: `Vendedor ${id} eliminado`, result });
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },
};

module.exports = VendedorController;
