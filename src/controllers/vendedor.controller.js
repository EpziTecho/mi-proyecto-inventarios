const bcrypt = require("bcrypt");
const VendedorService = require("../services/vendedor.service");
const supabase = require("../config/supabase");
const excel = require("xlsx");
const { generateVendedoresPDF } = require("../utils/pdfGenerator");

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

            // Paso 1: Obtener los datos actuales del vendedor antes de actualizar
            const vendedorActual = await VendedorService.obtenerPorId(id);
            if (!vendedorActual) {
                throw new Error("Vendedor no encontrado.");
            }

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

            let publicURL = null;

            // Paso 2: Si se envía una nueva foto, eliminar la anterior y subir la nueva
            if (foto) {
                // Extraer el nombre del archivo anterior de la URL de Supabase
                if (vendedorActual.foto) {
                    const urlParts = vendedorActual.foto.split("/");
                    const fileName = urlParts[urlParts.length - 1]; // Extraer el nombre del archivo

                    // Intentar eliminar la imagen anterior en Supabase
                    const { error: deleteError } = await supabase.storage
                        .from("Imagenes")
                        .remove([`MiawareInventarioTest/${fileName}`]);

                    if (deleteError) {
                        console.error(
                            "Error al eliminar la imagen anterior:",
                            deleteError
                        );
                    }
                }

                // Subir la nueva imagen a Supabase
                const cleanedName = nombre.replace(/\s+/g, "");
                const extension = foto.originalname.split(".").pop();
                const newFileName = `MiawareInventarioTest/${cleanedName}-${dni}.${extension}`;

                const { error: uploadError } = await supabase.storage
                    .from("Imagenes")
                    .upload(newFileName, foto.buffer, {
                        contentType: foto.mimetype,
                    });

                if (uploadError) {
                    console.error(
                        "Error al subir la nueva imagen:",
                        uploadError
                    );
                    throw new Error("Error al subir la nueva imagen.");
                }

                // Obtener la nueva URL pública
                const { data, error: urlError } = await supabase.storage
                    .from("Imagenes")
                    .getPublicUrl(newFileName);

                if (urlError) {
                    console.error("Error al obtener la URL pública:", urlError);
                    throw new Error("Error al obtener la URL de la imagen.");
                }
                publicURL = data.publicUrl;
            }

            vendedorData.foto = publicURL || vendedorActual.foto;

            // Paso 3: Actualizar la base de datos con la nueva URL de la foto
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

            // Obtener los datos del vendedor antes de eliminarlo
            const vendedorActual = await VendedorService.obtenerPorId(id);
            if (!vendedorActual) {
                throw new Error("Vendedor no encontrado.");
            }

            let fotoEliminada = false;

            // Si el vendedor tiene una foto, eliminarla de Supabase
            if (vendedorActual.foto) {
                const urlParts = vendedorActual.foto.split("/");
                const fileName = urlParts[urlParts.length - 1]; // Extraer el nombre del archivo

                const { error: deleteError } = await supabase.storage
                    .from("Imagenes")
                    .remove([`MiawareInventarioTest/${fileName}`]);

                if (deleteError) {
                    console.error(
                        "❌ Error al eliminar la imagen:",
                        deleteError
                    );
                } else {
                    fotoEliminada = true;
                }
            }

            // Eliminar el vendedor de la base de datos
            const result = await VendedorService.eliminar(id);

            return res.json({
                message: `Vendedor ${id} eliminado`,
                vendedorEliminado: result === 1,
                imagenEliminada: fotoEliminada,
            });
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },
    multiRemove: async (req, res) => {
        try {
            const { vendedores } = req.body; // Array de objetos con la propiedad "id"

            if (!Array.isArray(vendedores) || vendedores.length === 0) {
                throw new Error(
                    "Debe proporcionar una lista de vendedores válida."
                );
            }

            // Extraer los IDs de los objetos en el array
            const ids = vendedores.map((v) => v.id);

            // Paso 1: Obtener los vendedores y sus fotos antes de eliminarlos
            const vendedoresAEliminar = await VendedorService.obtenerPorIds(
                ids
            );

            if (vendedoresAEliminar.length === 0) {
                throw new Error("No se encontraron vendedores para eliminar.");
            }

            // Paso 2: Extraer los nombres de las imágenes de Supabase
            const archivosAEliminar = vendedoresAEliminar
                .filter((v) => v.foto) // Solo considerar vendedores con fotos
                .map((v) => {
                    const urlParts = v.foto.split("/");
                    return `MiawareInventarioTest/${
                        urlParts[urlParts.length - 1]
                    }`;
                });

            // Paso 3: Eliminar los vendedores de la base de datos
            const resultadoEliminacion =
                await VendedorService.eliminarMultiples(ids);

            // Paso 4: Eliminar imágenes en Supabase (solo si hay archivos a eliminar)
            let imagenesEliminadas = false;
            if (archivosAEliminar.length > 0) {
                const { error: deleteError } = await supabase.storage
                    .from("Imagenes")
                    .remove(archivosAEliminar);

                if (deleteError) {
                    console.error(
                        "❌ Error al eliminar algunas imágenes:",
                        deleteError
                    );
                } else {
                    imagenesEliminadas = true;
                }
            }

            return res.json({
                message: `${ids.length} vendedores eliminados correctamente`,
                vendedoresEliminados: resultadoEliminacion,
                imagenesEliminadas: imagenesEliminadas,
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    },
    // Método para exportar a Excel
    exportExcel: async (req, res) => {
        try {
            const { atributos } = req.body; // Recibir los atributos que se desean incluir

            if (!Array.isArray(atributos) || atributos.length === 0) {
                throw new Error(
                    "Debe proporcionar una lista de atributos válida."
                );
            }

            // Obtener todos los vendedores
            const vendedores = await VendedorService.listar();

            if (!vendedores || vendedores.length === 0) {
                throw new Error("No hay datos disponibles para exportar.");
            }

            // Filtrar solo los atributos seleccionados
            const data = vendedores.map((vendedor) => {
                let fila = {};
                atributos.forEach((atributo) => {
                    if (vendedor[atributo] !== undefined) {
                        fila[atributo] = vendedor[atributo];
                    }
                });
                return fila;
            });

            // Crear hoja de cálculo
            const ws = excel.utils.json_to_sheet(data);
            const wb = excel.utils.book_new();
            excel.utils.book_append_sheet(wb, ws, "Vendedores");

            // Guardar en un buffer
            const buffer = excel.write(wb, {
                bookType: "xlsx",
                type: "buffer",
            });

            // Configurar la respuesta HTTP para descargar el archivo
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=Reporte_vendedores.xlsx"
            );
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.send(buffer);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    },
    //Método para cambiar el estado de un vendedor por id
    toggleEstado: async (req, res) => {
        try {
            const { id } = req.params;

            // Alternar el estado
            const resultado = await VendedorService.toggleEstado(id);

            return res.json({
                message: "Estado cambiado con éxito",
                vendedor: resultado,
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    },

    //Método para exportar a pdf
    exportPDF: async (req, res) => {
        try {
            const { atributos } = req.body;
            if (!Array.isArray(atributos) || atributos.length === 0) {
                throw new Error(
                    "Debe proporcionar una lista de atributos válida."
                );
            }
            await generateVendedoresPDF(res, atributos);
        } catch (error) {
            console.error("❌ Error al generar el PDF:", error.message);
            return res.status(400).json({ error: error.message });
        }
    },
};

module.exports = VendedorController;
