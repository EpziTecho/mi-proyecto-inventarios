const { Router } = require("express");
const VendedorController = require("../controllers/vendedor.controller");
const upload = require("../middlewares/upload.middleware");
const VendedorMiddleware = require("../middlewares/validateVendedor.middleware");

const router = Router();
//Ruta para obtener todos los vendedores
router.get("/", VendedorController.getAll);
//Ruta para obtener un vendedor por su ID
router.get("/:id", VendedorController.getById);
//Ruta para crear un vendedor
router.post(
    "/",
    upload.single("foto"),
    VendedorMiddleware.validarEntrada,
    VendedorController.create
);
//Ruta para actualizar un vendedor
router.put(
    "/:id",
    upload.single("foto"),
    VendedorMiddleware.validarEntrada,
    VendedorController.update
);
// Ruta para eliminar múltiples vendedores
router.delete("/multiRemove", VendedorController.multiRemove);
//Ruta para eliminar un vendedor
router.delete("/:id", VendedorController.remove);

module.exports = router;
