const bcrypt = require("bcrypt");
const VendedorService = require("../services/vendedor.service");

const VendedorController = {
    getAll: async (req, res) => {
        try {
            const vendedores = await VendedorService.listar();
            return res.json(
                vendedores.map((vendedor) => ({
                    ...vendedor,
                    foto: vendedor.foto
                        ? Buffer.from(vendedor.foto, "base64").toString("utf-8")
                        : null, // Convertir Base64 para el cliente
                }))
            );
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ error: "Error al obtener vendedores" });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const vendedor = await VendedorService.obtenerPorId(id);
            if (vendedor.foto) {
                vendedor.foto = Buffer.from(vendedor.foto, "base64").toString(
                    "utf-8"
                ); // Convertir Base64 para el cliente
            }
            return res.json(vendedor);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const creatorId = req.user ? req.user.id : null; // Asume que viene de middleware auth
            const { nombre, dni, tfno, username, email, password, idRol } =
                req.body;

            if (!password) {
                throw new Error("La contraseña es obligatoria.");
            }

            // Hashear la contraseña
            const passwordHash = await bcrypt.hash(password, 10);

            // Convertir imagen a Base64
            const foto = req.file ? req.file.buffer.toString("base64") : null;

            const nuevoVendedor = await VendedorService.crear(
                {
                    nombre,
                    dni,
                    tfno,
                    username,
                    email,
                    idRol,
                    passwordHash,
                    foto,
                },
                creatorId
            );

            return res.status(201).json(nuevoVendedor);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updaterId = req.user ? req.user.id : null; // Asume que viene de middleware auth
            const { password } = req.body;

            // Hashear la contraseña si se envía
            let passwordHash = null;
            if (password) {
                passwordHash = await bcrypt.hash(password, 10);
            }

            // Convertir imagen a Base64
            const foto = req.file ? req.file.buffer.toString("base64") : null;

            const actualizado = await VendedorService.actualizar(
                id,
                { ...req.body, passwordHash, foto },
                updaterId
            );
            return res.json(actualizado);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await VendedorService.eliminar(id);
            return res.json({ message: `Vendedor ${id} eliminado`, result });
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const result = await VendedorService.login(username, password);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(401).json({ error: error.message });
        }
    },
};

module.exports = VendedorController;
