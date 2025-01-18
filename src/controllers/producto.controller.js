const ProductoService = require("../services/producto.service");

const ProductoController = {
    getAll: async (req, res) => {
        try {
            const productos = await ProductoService.listar();
            // Convertir a JSON y mapear los resultados
            return res.json(
                productos.map((producto) => {
                    const plainProducto = producto.toJSON(); // Convertir a objeto plano
                    return {
                        ...plainProducto,
                        foto: plainProducto.foto
                            ? Buffer.from(
                                  plainProducto.foto,
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
    }, // Correcion ejemplo para problemas las referencias circulares en JSON

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const producto = await ProductoService.obtenerPorId(id);
            if (producto.foto) {
                producto.foto = Buffer.from(producto.foto)
                    .toString("base64")
                    .toString("utf-8"); // Convertir binario a Base64 para el cliente
            }
            return res.json(producto);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            console.log(req.body);
            const creatorId = req.user ? req.user.id : null; // Si usas autenticación
            const {
                Nombre,
                codigoProducto,
                descripcion,
                notas,
                stock,
                idCategoria,
                marca,
                idProveedor,
                precioCompra,
                precioVenta,
                cantidadMedida,
                unidadMedida,
                fechaVencimiento,
                fechaRegistro,
                fechaRetiro,
            } = req.body;

            // Convertir Base64 a binario
            const foto = req.file ? req.file.buffer.toString("base64") : null;

            const nuevoProducto = await ProductoService.crear(
                {
                    Nombre,
                    codigoProducto,
                    descripcion,
                    notas,
                    stock,
                    idCategoria,
                    marca,
                    idProveedor,
                    precioCompra,
                    precioVenta,
                    cantidadMedida,
                    unidadMedida,
                    fechaVencimiento,
                    fechaRegistro,
                    fechaRetiro,
                    foto,
                },
                creatorId
            );
            return res.status(201).json(nuevoProducto);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updaterId = req.user ? req.user.id : null; // Si usas autenticación
            const { foto, ...productoData } = req.body;

            // Convertir Base64 a binario
            const fotoBuffer = foto ? Buffer.from(foto, "base64") : null;

            const actualizado = await ProductoService.actualizar(
                id,
                { ...productoData, foto: fotoBuffer },
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
            await ProductoService.eliminar(id);
            return res.json({ message: `Producto ${id} eliminado` });
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },
};

module.exports = ProductoController;
