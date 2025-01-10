// src/services/rol.service.js
const RolRepository = require("../repositories/rol.repository");

const RolService = {
    listar: async () => {
        return await RolRepository.getAll();
    },

    obtenerPorId: async (idRol) => {
        const rol = await RolRepository.getById(idRol);
        if (!rol) throw new Error(`Rol con ID ${idRol} no encontrado`);
        return rol;
    },

    crear: async (data) => {
        const { nombreRol, descripcionRol } = data;
        return await RolRepository.create(nombreRol, descripcionRol);
    },

    actualizar: async (idRol, data) => {
        const rolExistente = await RolRepository.getById(idRol);
        if (!rolExistente) throw new Error(`Rol con ID ${idRol} no existe`);
        return await RolRepository.update(idRol, data);
    },

    eliminar: async (idRol) => {
        const rolExistente = await RolRepository.getById(idRol);
        if (!rolExistente) throw new Error(`Rol con ID ${idRol} no existe`);
        return await RolRepository.delete(idRol);
    },
};

module.exports = RolService;
