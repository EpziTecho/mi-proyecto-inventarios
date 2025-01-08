const pool = require("../config/database");

const RolRepository = {
    // 1) Obtener todos los roles
    getAll: async () => {
        const [rows] = await pool.query(`
      SELECT idRol, nombreRol, descripcionRol
      FROM Rol
    `);
        return rows;
    },
    // 2) Obtener un rol por su ID
    getById: async (idRol) => {
        const [rows] = await pool.query(
            `
      SELECT idRol, nombreRol, descripcionRol
      FROM Rol
      WHERE idRol = ?
    `,
            [idRol]
        );
        return rows[0] || null;
    },

    // 3) Crear un rol
    create: async (nombreRol, descripcionRol) => {
        const [result] = await pool.query(
            `
      INSERT INTO Rol (nombreRol, descripcionRol)
      VALUES (?, ?)
    `,
            [nombreRol, descripcionRol]
        );
        return result.insertId;
    },

    // 4) Actualizar un rol
    update: async (idRol, nombreRol, descripcionRol) => {
        await pool.query(
            `
      UPDATE Rol
      SET nombreRol = ?, descripcionRol = ?
      WHERE idRol = ?
    `,
            [nombreRol, descripcionRol, idRol]
        );
    },
    // 5) Eliminar un rol
    delete: async (idRol) => {
        await pool.query(
            `
      DELETE FROM Rol
      WHERE idRol = ?
    `,
            [idRol]
        );
    },
};

module.exports = RolRepository;
