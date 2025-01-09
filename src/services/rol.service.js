const RolRepository = require("../repositories/rol.repository");

const RolService = {
    listar: async () => {
        return await RolRepository.getAll();
    },
    obtenerPorId: async (idRol) => {
        return await RolRepository.getById(idRol);
    },
    crear: async (data) => {
        return await RolRepository.create(data);
    },
    actualizar: async (idRol, data) => {
        return await RolRepository.update(idRol, data);
    },
    eliminar: async (idRol) => {
        return await RolRepository.delete(idRol);
    },
};

module.exports = RolService;
