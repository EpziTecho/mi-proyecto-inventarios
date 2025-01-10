// src/app.js
const express = require("express");
const cors = require("cors");
const routes = require("./routes"); // Aquí se importa index.js que ahora exporta el router

const app = express();
app.use(cors());
app.use(express.json());

// Todas las rutas con prefijo /api
app.use("/api", routes);

module.exports = app;
