// src/services/menu.service.js
const MenuRepository = require("../repositories/menu.repository");

const MenuService = {
    listar: async () => {
        return await MenuRepository.getAll();
    },

    obtenerPorId: async (id) => {
        return await MenuRepository.getById(id);
    },

    crear: async (data) => {
        return await MenuRepository.create(data);
    },

    actualizar: async (id, data) => {
        return await MenuRepository.update(id, data);
    },

    eliminar: async (id) => {
        return await MenuRepository.delete(id);
    },
};

module.exports = MenuService;
