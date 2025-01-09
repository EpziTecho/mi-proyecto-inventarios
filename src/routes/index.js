const { Router } = require("express");
const vendedorRoutes = require("./vendedor.routes");
const rolRoutes = require("./rol.routes");
const menuRoutes = require("./menu.routes");
const rolMenuRoutes = require("./rolMenu.routes");

const router = Router();

// Aquí montas las rutas con sus prefijos
router.use("/vendedores", vendedorRoutes);
router.use("/roles", rolRoutes);
router.use("/menus", menuRoutes);
router.use("/rol-menu", rolMenuRoutes);

module.exports = router;
