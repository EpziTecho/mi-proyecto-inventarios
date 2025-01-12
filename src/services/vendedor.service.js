const VendedorRepository = require("../repositories/vendedor.repository");

const VendedorService = {
    listar: async () => {
        return await VendedorRepository.getAll();
    },

    obtenerPorId: async (id) => {
        const vendedor = await VendedorRepository.getById(id);
        if (!vendedor) throw new Error(`Vendedor con ID ${id} no encontrado`);
        return vendedor;
    },

    crear: async (data, creatorId) => {
        data.createdBy = creatorId || null;
        return await VendedorRepository.create(data);
    },

    actualizar: async (id, data, updaterId) => {
        const existente = await VendedorRepository.getById(id);
        if (!existente) throw new Error(`Vendedor con ID ${id} no existe`);
        data.updatedBy = updaterId || null;
        return await VendedorRepository.update(id, data);
    },

    eliminar: async (id) => {
        const existente = await VendedorRepository.getById(id);
        if (!existente) throw new Error(`Vendedor con ID ${id} no existe`);
        return await VendedorRepository.delete(id);
    },

    login: async (username, password) => {
        // Aquí agregarías la lógica de autenticación
        throw new Error("Método login no implementado");
    },
};

module.exports = VendedorService;
