const bcrypt = require("bcrypt");
const VendedorService = require("../services/vendedor.service");

const VendedorController = {
    getAll: async (req, res) => {
        try {
            const vendedores = await VendedorService.listar();
            return res.json(
                vendedores.map((vendedor) => {
                    const plainVendedor = vendedor.toJSON();
                    return {
                        ...plainVendedor,
                        foto: plainVendedor.foto
                            ? Buffer.from(
                                  plainVendedor.foto,
                                  "base64"
                              ).toString("utf-8")
                            : null,
                    };
                })
            );
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ error: "Error al obtener productos" });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const vendedor = await VendedorService.obtenerPorId(id);
            if (vendedor.foto) {
                vendedor.foto = Buffer.from(vendedor.foto, "base64").toString(
                    "utf-8"
                );
            }
            return res.json(vendedor);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        //console.log(req.body.foto);
        try {
            const creatorId = req.user ? req.user.id : null;
            const {
                nombre,
                dni,
                tfno,
                username,
                email,
                password,
                idRol,
                foto,
            } = req.body;

            if (!password) {
                throw new Error("La contraseña es obligatoria.");
            }

            // Hashear la contraseña
            const passwordHash = await bcrypt.hash(password, 10);

            const nuevoVendedor = await VendedorService.crear(
                {
                    nombre,
                    dni,
                    tfno,
                    username,
                    email,
                    idRol,
                    passwordHash,
                    foto, // Foto en Base64 enviada directamente por el frontend
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
            const updaterId = req.user ? req.user.id : null;
            const { password, foto } = req.body;

            // Hashear la contraseña si se envía
            let passwordHash = null;
            if (password) {
                passwordHash = await bcrypt.hash(password, 10);
            }

            const actualizado = await VendedorService.actualizar(
                id,
                { ...req.body, passwordHash, foto }, // Foto en Base64 enviada directamente por el frontend
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
