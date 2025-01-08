const pool = require("../config/database");

const RolMenuRepository = {
    // Obtener todos los menús asociados a un rol
    getMenusByRol: async (idRol) => {
        const [rows] = await pool.query(
            `
      SELECT m.id, m.nombre, m.descripcion
      FROM Rol_menu rm
      JOIN menu m ON rm.idmenu = m.id
      WHERE rm.idRol = ?
    `,
            [idRol]
        );
        return rows;
    },

    // Asociar un menu a un rol
    addMenuToRol: async (idRol, idmenu) => {
        await pool.query(
            `
      INSERT INTO Rol_menu (idRol, idmenu)
      VALUES (?, ?)
    `,
            [idRol, idmenu]
        );
    },

    // Eliminar la asociación de un menu con un rol
    removeMenuFromRol: async (idRol, idmenu) => {
        await pool.query(
            `
      DELETE FROM Rol_menu
      WHERE idRol = ? AND idmenu = ?
    `,
            [idRol, idmenu]
        );
    },
};

module.exports = RolMenuRepository;
