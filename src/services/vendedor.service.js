const VendedorRepository = require("../repositories/vendedor.repository");

const VendedorService = {
    listar: async () => {
        // Devuelve la lista de vendedores con su rol asociado (si así lo configuraste en el repo)
        return await VendedorRepository.getAll();
    },

    obtenerPorId: async (idVendedor) => {
        // Busca un vendedor por su ID
        const vendedor = await VendedorRepository.getById(idVendedor);
        if (!vendedor) {
            throw new Error(`Vendedor con ID ${idVendedor} no encontrado`);
        }
        return vendedor;
    },

    crear: async (data) => {
        // data = { nombre, foto, dni, tfno, idRol }
        const nuevo = await VendedorRepository.create(data);
        return nuevo;
    },

    actualizar: async (idVendedor, data) => {
        // data = { nombre, foto, dni, tfno, idRol }
        const actualizado = await VendedorRepository.update(idVendedor, data);
        if (!actualizado) {
            throw new Error(`Vendedor con ID ${idVendedor} no existe`);
        }
        return actualizado;
    },

    eliminar: async (idVendedor) => {
        const borrado = await VendedorRepository.delete(idVendedor);
        if (!borrado) {
            throw new Error(`Vendedor con ID ${idVendedor} no existe`);
        }
        return borrado;
    },
};

module.exports = VendedorService;
