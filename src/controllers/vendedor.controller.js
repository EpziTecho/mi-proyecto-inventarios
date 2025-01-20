const bcrypt = require("bcrypt");
const VendedorService = require("../services/vendedor.service");
const supabase = require("../config/supabase"); // Importa la configuración de Supabase
const { v4: uuidv4 } = require("uuid"); // Para generar nombres únicos para las imágenes

const VendedorController = {
    //este es un comentario de ejemplo
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

            const foto = req.file; // Archivo recibido mediante multipart/form-data

            if (!foto) {
                throw new Error("La foto es obligatoria.");
            }

            if (!password) {
                throw new Error("La contraseña es obligatoria.");
            }

            // Limpiar el nombre eliminando los espacios
            const cleanedName = nombre.replace(/\s+/g, "");

            // Generar el nombre del archivo en el formato "nombre-dni.extensión"
            const extension = foto.originalname.split(".").pop();
            const fileName = `MiawareInventarioTest/${cleanedName}-${dni}.${extension}`;

            // Subir la imagen a Supabase
            const { error: uploadError } = await supabase.storage
                .from("Imagenes")
                .upload(fileName, foto.buffer, {
                    contentType: foto.mimetype,
                });

            if (uploadError) {
                console.error("Error al subir la imagen:", uploadError);
                throw new Error("Error al subir la imagen.");
            }

            // Obtener la URL pública de la imagen
            const { data, error: urlError } = supabase.storage
                .from("Imagenes")
                .getPublicUrl(fileName);

            if (urlError) {
                console.error("Error al obtener la URL pública:", urlError);
                throw new Error("Error al obtener la URL de la imagen.");
            }

            const publicURL = data.publicUrl;

            // Hashear la contraseña
            const passwordHash = await bcrypt.hash(password, 10);

            // Crear el nuevo vendedor
            const nuevoVendedor = await VendedorService.crear(
                {
                    nombre,
                    dni,
                    tfno,
                    username,
                    email,
                    idRol,
                    passwordHash,
                    foto: publicURL, // Guardar la URL de la imagen en la base de datos
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

            const { nombre, dni, tfno, username, email, idRol, password } =
                req.body;

            const foto = req.file; // Archivo recibido mediante multipart/form-data
            let publicURL = null;

            if (foto) {
                // Limpiar el nombre eliminando los espacios
                const cleanedName = nombre.replace(/\s+/g, "");

                // Generar el nombre del archivo en el formato "nombre-dni.extensión"
                const extension = foto.originalname.split(".").pop();
                const fileName = `MiawareInventarioTest/${cleanedName}-${dni}.${extension}`;

                // Subir la nueva imagen a Supabase
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

                // Obtener la URL pública de la imagen
                const { data, error: urlError } = supabase.storage
                    .from("Imagenes")
                    .getPublicUrl(fileName);

                if (urlError) {
                    console.error("Error al obtener la URL pública:", urlError);
                    throw new Error("Error al obtener la URL de la imagen.");
                }

                publicURL = data.publicUrl;
            }

            // Hashear la contraseña si se envía
            let passwordHash = null;
            if (password) {
                passwordHash = await bcrypt.hash(password, 10);
            }

            const actualizado = await VendedorService.actualizar(
                id,
                {
                    nombre,
                    dni,
                    tfno,
                    username,
                    email,
                    idRol,
                    passwordHash,
                    foto: publicURL, // Actualizar la URL de la imagen si se envió una nueva
                },
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
};

module.exports = VendedorController;
