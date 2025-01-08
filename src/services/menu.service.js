const MenuRepository = require("../repositories/menu.repository");

const MenuService = {
    listar: async () => {
        return await MenuRepository.getAll();
    },

    obtenerPorId: async (id) => {
        const menu = await MenuRepository.getById(id);
        if (!menu) {
            throw new Error(`Menu con ID ${id} no encontrado`);
        }
        return menu;
    },

    crear: async (data) => {
        const { nombre, descripcion } = data;
        const newId = await MenuRepository.create(nombre, descripcion);
        return { id: newId, nombre, descripcion };
    },

    actualizar: async (id, data) => {
        const menuExistente = await MenuRepository.getById(id);
        if (!menuExistente) {
            throw new Error(`Menu con ID ${id} no existe`);
        }
        const { nombre, descripcion } = data;
        await MenuRepository.update(id, nombre, descripcion);
        return { id, nombre, descripcion };
    },

    eliminar: async (id) => {
        const menuExistente = await MenuRepository.getById(id);
        if (!menuExistente) {
            throw new Error(`Menu con ID ${id} no existe`);
        }
        await MenuRepository.delete(id);
        return { message: `Menu ${id} eliminado` };
    },
};

module.exports = MenuService;
