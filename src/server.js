// src/server.js
require("dotenv").config();
const app = require("./app");
const { swaggerDocs } = require("./config/swagger");
const pool = require("./config/database");

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        // Test de conexión a la BD
        const [rows] = await pool.query("SELECT 1 + 1 AS result");
        console.log("Conexión exitosa a MySQL. Resultado:", rows[0].result);

        // Levantar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);

            // Iniciar Swagger Docs
            swaggerDocs(app, PORT);
        });
    } catch (error) {
        console.error("Error al conectar a MySQL:", error);
        process.exit(1);
    }
})();
