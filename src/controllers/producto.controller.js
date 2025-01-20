const ProductoService = require("../services/producto.service");

const ProductoController = {
    getAll: async (req, res) => {
        try {
            const productos = await ProductoService.listar();
            return res.json(productos);
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
            const producto = await ProductoService.obtenerPorId(id);
            return res.json(producto);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const creatorId = req.user ? req.user.id : null;
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
                foto, // URL de la imagen enviada directamente por el frontend
            } = req.body;

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
            const updaterId = req.user ? req.user.id : null;
            const { foto, ...productoData } = req.body;

            const actualizado = await ProductoService.actualizar(
                id,
                { ...productoData, foto },
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
