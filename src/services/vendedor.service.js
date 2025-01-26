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
        await VendedorService.validarActualizacion(id, data);

        if (data.password && !data.passwordHash) {
            throw new Error("El campo passwordHash es obligatorio.");
        }

        data.updatedBy = updaterId || null;
        return await VendedorRepository.update(id, data);
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
        // Validar duplicados excluyendo el propio registro
        const duplicado = await VendedorRepository.findByUniqueFields(
            data.dni,
            data.username,
            data.email,
            id
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
        // Aquí agregarías la lógica de autenticación
        throw new Error("Método login no implementado");
    },
};

module.exports = VendedorService;
