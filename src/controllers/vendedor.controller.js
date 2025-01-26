const bcrypt = require("bcrypt");
const VendedorService = require("../services/vendedor.service");
const supabase = require("../config/supabase");

const VendedorController = {
    getAll: async (req, res) => {
        try {
            const vendedores = await VendedorService.listar();
            return res.json(vendedores);
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
            return res.json(vendedor);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const creatorId = req.user ? req.user.id : null;
            const { nombre, dni, tfno, username, email, password, idRol } =
                req.body;
            const foto = req.file;

            // Paso 1: Validaciones a nivel de servicio (campos duplicados, formato de datos)
            const passwordHash = await bcrypt.hash(password, 10);
            const vendedorData = {
                nombre,
                dni,
                tfno,
                username,
                email,
                passwordHash,
                idRol,
                estado: 1,
            };
            await VendedorService.validarCreacion(vendedorData);

            // Paso 2: Subir la imagen después de las validaciones
            if (!foto) throw new Error("La foto es obligatoria.");
            const cleanedName = nombre.replace(/\s+/g, "");
            const extension = foto.originalname.split(".").pop();
            const fileName = `MiawareInventarioTest/${cleanedName}-${dni}.${extension}`;

            const { error: uploadError } = await supabase.storage
                .from("Imagenes")
                .upload(fileName, foto.buffer, { contentType: foto.mimetype });

            if (uploadError) {
                console.error("Error al subir la imagen:", uploadError);
                throw new Error("Error al subir la imagen.");
            }

            const { data, error: urlError } = await supabase.storage
                .from("Imagenes")
                .getPublicUrl(fileName);

            if (urlError) {
                console.error("Error al obtener la URL pública:", urlError);
                throw new Error("Error al obtener la URL de la imagen.");
            }

            vendedorData.foto = data.publicUrl;

            // Paso 3: Crear el vendedor después de todas las validaciones
            const nuevoVendedor = await VendedorService.crear(
                vendedorData,
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
            const {
                nombre,
                dni,
                tfno,
                username,
                email,
                idRol,
                password,
                estado,
            } = req.body;
            const foto = req.file;

            // Paso 1: Validaciones a nivel de servicio
            const passwordHash = password
                ? await bcrypt.hash(password, 10)
                : undefined;
            const vendedorData = {
                nombre,
                dni,
                tfno,
                username,
                email,
                idRol,
                passwordHash,
                estado,
            };
            await VendedorService.validarActualizacion(id, vendedorData);

            // Paso 2: Subir la imagen si es necesario
            let publicURL = null;
            if (foto) {
                const cleanedName = nombre.replace(/\s+/g, "");
                const extension = foto.originalname.split(".").pop();
                const fileName = `MiawareInventarioTest/${cleanedName}-${dni}.${extension}`;

                const { error: uploadError } = await supabase.storage
                    .from("Imagenes")
                    .upload(fileName, foto.buffer, {
                        contentType: foto.mimetype,
                    });

                if (uploadError) {
                    console.error(
                        "Error al subir la nueva imagen:",
                        uploadError
                    );
                    throw new Error("Error al subir la nueva imagen.");
                }

                const { data, error: urlError } = await supabase.storage
                    .from("Imagenes")
                    .getPublicUrl(fileName);

                if (urlError) {
                    console.error("Error al obtener la URL pública:", urlError);
                    throw new Error("Error al obtener la URL de la imagen.");
                }
                publicURL = data.publicUrl;
            }

            vendedorData.foto = publicURL || undefined;

            // Paso 3: Actualizar el vendedor después de todas las validaciones
            const actualizado = await VendedorService.actualizar(
                id,
                vendedorData,
                updaterId
            );
            return res.json(actualizado);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
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
};

module.exports = VendedorController;
