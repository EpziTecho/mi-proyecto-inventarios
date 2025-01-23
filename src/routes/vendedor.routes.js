const { Router } = require("express");
const VendedorController = require("../controllers/vendedor.controller");
const upload = require("../middlewares/upload.middleware");
const VendedorMiddleware = require("../middlewares/validateVendedor.middleware");

const router = Router();

router.get("/", VendedorController.getAll);
router.get("/:id", VendedorController.getById);
router.post(
    "/",
    upload.single("foto"),
    VendedorMiddleware.validarEntrada,
    VendedorController.create
);
router.put(
    "/:id",
    upload.single("foto"),
    VendedorMiddleware.validarEntrada,
    VendedorController.update
);
router.delete("/:id", VendedorController.remove);

module.exports = router;
