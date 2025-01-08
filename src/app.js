const express = require("express");
const cors = require("cors");

const vendedorRoutes = require("./routes/vendedor.routes");
const rolRoutes = require("./routes/rol.routes");
const menuRoutes = require("./routes/menu.routes");
const rolMenuRoutes = require("./routes/rolMenu.routes");

const app = express();
app.use(cors());
app.use(express.json());

// api/...
app.use("/api/vendedores", vendedorRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/rol-menu", rolMenuRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    return res.status(500).json({ error: "Error interno del servidor" });
});

module.exports = app;
