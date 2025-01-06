const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas con prefijo /api
app.use("/api", routes);

module.exports = app;
