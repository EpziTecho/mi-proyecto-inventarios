// src/repositories/menu.repository.js
const { Menu } = require("../models");

const MenuRepository = {
    getAll: async () => {
        return await Menu.findAll();
    },

    getById: async (id) => {
        return await Menu.findByPk(id);
    },

    create: async (data) => {
        // data = { nombre, descripcion }
        return await Menu.create(data);
    },

    update: async (id, data) => {
        // Primero buscamos si existe
        const menu = await Menu.findByPk(id);
        if (!menu) return null;
        await menu.update(data);
        return menu;
    },

    delete: async (id) => {
        const menu = await Menu.findByPk(id);
        if (!menu) return null;
        await menu.destroy();
        return menu;
    },
};

module.exports = MenuRepository;
