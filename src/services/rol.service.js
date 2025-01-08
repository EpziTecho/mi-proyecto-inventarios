const RolRepository = require("../repositories/rol.repository");

const RolService = {
    listar: async () => {
        return await RolRepository.getAll();
    },

    obtenerPorId: async (idRol) => {
        const rol = await RolRepository.getById(idRol);
        if (!rol) {
            throw new Error(`Rol con ID ${idRol} no encontrado`);
        }
        return rol;
    },

    crear: async (data) => {
        const { nombreRol, descripcionRol } = data;
        const newId = await RolRepository.create(nombreRol, descripcionRol);
        return { idRol: newId, nombreRol, descripcionRol };
    },

    actualizar: async (idRol, data) => {
        const rolExistente = await RolRepository.getById(idRol);
        if (!rolExistente) {
            throw new Error(`Rol con ID ${idRol} no existe`);
        }
        const { nombreRol, descripcionRol } = data;
        await RolRepository.update(idRol, nombreRol, descripcionRol);
        return { idRol, nombreRol, descripcionRol };
    },

    eliminar: async (idRol) => {
        const rolExistente = await RolRepository.getById(idRol);
        if (!rolExistente) {
            throw new Error(`Rol con ID ${idRol} no existe`);
        }
        await RolRepository.delete(idRol);
        return { message: `Rol ${idRol} eliminado` };
    },
};

module.exports = RolService;
