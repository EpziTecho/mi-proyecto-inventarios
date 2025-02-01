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
        // Validar datos antes de crear
        await VendedorService.validarCreacion(data);

        if (!data.passwordHash) {
            throw new Error("El campo passwordHash es obligatorio.");
        }

        data.createdBy = creatorId || null;
        return await VendedorRepository.create(data);
    },

    actualizar: async (id, data, updaterId) => {
        const existente = await VendedorRepository.getById(id);
        if (!existente) throw new Error(`Vendedor con ID ${id} no existe`);

        // Validar datos antes de actualizar
        const camposActualizados = await VendedorService.validarActualizacion(
            id,
            data
        );

        if (Object.keys(camposActualizados).length === 0) {
            throw new Error("No se han realizado cambios en los datos");
        }

        camposActualizados.updatedBy = updaterId || null;

        // Ejecutar la actualización y devolver el objeto actualizado para que hugito no se moleste x2
        const vendedorActualizado = await VendedorRepository.update(
            id,
            camposActualizados
        );

        return vendedorActualizado;
    },

    eliminar: async (id) => {
        const existente = await VendedorRepository.getById(id);
        if (!existente) throw new Error(`Vendedor con ID ${id} no existe`);
        return await VendedorRepository.delete(id);
    },

    validarCreacion: async (data) => {
        // Validar duplicados
        const duplicado = await VendedorRepository.findByUniqueFields(
            data.dni,
            data.username,
            data.email
        );
        if (duplicado) {
            const duplicados = [];
            if (duplicado.dni === data.dni) duplicados.push("DNI");
            if (duplicado.username === data.username)
                duplicados.push("username");
            if (duplicado.email === data.email) duplicados.push("email");
            throw new Error(
                `Los siguientes campos ya están en uso: ${duplicados.join(
                    ", "
                )}`
            );
        }
    },

    validarActualizacion: async (id, data) => {
        // Obtener el registro actual del vendedor
        const vendedorActual = await VendedorRepository.getById(id);
        if (!vendedorActual) {
            throw new Error("Vendedor no encontrado");
        }

        // Crear un objeto con solo los campos válidos que necesitan actualización
        const camposParaActualizar = {};
        for (const campo in data) {
            if (
                data[campo] !== undefined &&
                data[campo] !== vendedorActual[campo]
            ) {
                camposParaActualizar[campo] = data[campo];
            }
        }

        // Si no hay campos para actualizar, lanzar error
        if (Object.keys(camposParaActualizar).length === 0) {
            throw new Error("No se han realizado cambios en los datos");
        }

        // Validar duplicados solo para los campos relevantes
        const duplicado = await VendedorRepository.findByUniqueFields(
            camposParaActualizar.dni || null,
            camposParaActualizar.username || null,
            camposParaActualizar.email || null,
            id
        );

        if (duplicado) {
            const duplicados = [];
            if (duplicado.dni === camposParaActualizar.dni)
                duplicados.push("DNI");
            if (duplicado.username === camposParaActualizar.username)
                duplicados.push("username");
            if (duplicado.email === camposParaActualizar.email)
                duplicados.push("email");

            throw new Error(
                `Los siguientes campos ya están en uso: ${duplicados.join(
                    ", "
                )}`
            );
        }

        return camposParaActualizar;
    },

    login: async (username, password) => {
        const vendedor = await VendedorRepository.findByUsername(username);
        if (!vendedor) throw new Error("Usuario no encontrado");
        const match = await bcrypt.compare(password, vendedor.passwordHash);
        if (!match) throw new Error("Contraseña incorrecta");
        const token = jwt.sign(
            {
                id: vendedor.idVendedor,
                username: vendedor.username,
                role: vendedor.idRol,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        vendedor.lastLogin = new Date();
        await vendedor.save();
        return { token };

        throw new Error("Método login no implementado");
    },
    // Método para obtener vendedores por sus IDs
    obtenerPorIds: async (ids) => {
        return await VendedorRepository.getByIds(ids);
    },
    // Método para eliminar múltiples vendedores
    eliminarMultiples: async (ids) => {
        return await VendedorRepository.deleteMultiple(ids);
    },
    //Método para cambiar el estado de un vendedor con toggleSwitch
    toggleEstado: async (id) => {
        // Obtener el vendedor actual
        const vendedor = await VendedorRepository.getById(id);
        if (!vendedor) {
            throw new Error("Vendedor no encontrado.");
        }

        // Alternar el estado
        const nuevoEstado = !vendedor.estado;

        // Actualizar el estado en la base de datos
        await VendedorRepository.update(id, { estado: nuevoEstado });

        return { id, estado: nuevoEstado };
    },
};

module.exports = VendedorService;
