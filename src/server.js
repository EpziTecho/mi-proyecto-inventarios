require("dotenv").config();
const app = require("./app");
const pool = require("./config/database"); // para probar conexión

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        // Verificar conexión a MySQL
        const [rows] = await pool.query("SELECT 1 + 1 AS result");
        console.log("Conexión exitosa a MySQL. Resultado:", rows[0].result);

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al conectar a MySQL:", error);
        process.exit(1);
    }
})();
