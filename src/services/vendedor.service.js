const VendedorRepository = require("../repositories/vendedor.repository");

const VendedorService = {
    listar: async () => {
        return await VendedorRepository.getAll();
    },

    obtenerPorId: async (idVendedor) => {
        const vendedor = await VendedorRepository.getById(idVendedor);
        if (!vendedor) {
            throw new Error(`Vendedor con ID ${idVendedor} no encontrado`);
        }
        return vendedor;
    },

    crear: async (data) => {
        // validacion de data necesaria?
        const { nombre, foto, dni, tfno, idRol } = data;
        const newId = await VendedorRepository.create(
            nombre,
            foto,
            dni,
            tfno,
            idRol
        );
        return { idVendedor: newId, ...data };
    },

    actualizar: async (idVendedor, data) => {
        // x2 validacion de data necesaria?
        const vendedorExistente = await VendedorRepository.getById(idVendedor);
        if (!vendedorExistente) {
            throw new Error(`Vendedor con ID ${idVendedor} no existe`);
        }
        const { nombre, foto, dni, tfno, idRol } = data;
        await VendedorRepository.update(
            idVendedor,
            nombre,
            foto,
            dni,
            tfno,
            idRol
        );
        return { idVendedor, ...data };
    },

    eliminar: async (idVendedor) => {
        const vendedorExistente = await VendedorRepository.getById(idVendedor);
        if (!vendedorExistente) {
            throw new Error(`Vendedor con ID ${idVendedor} no existe`);
        }
        await VendedorRepository.delete(idVendedor);
        return { message: `Vendedor ${idVendedor} eliminado` };
    },
};

module.exports = VendedorService;
