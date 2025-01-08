const pool = require("../config/database");

const MenuRepository = {
    getAll: async () => {
        const [rows] = await pool.query(`
      SELECT id, nombre, descripcion
      FROM menu
    `);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query(
            `
      SELECT id, nombre, descripcion
      FROM menu
      WHERE id = ?
    `,
            [id]
        );
        return rows[0] || null;
    },

    create: async (nombre, descripcion) => {
        const [result] = await pool.query(
            `
      INSERT INTO menu (nombre, descripcion)
      VALUES (?, ?)
    `,
            [nombre, descripcion]
        );
        return result.insertId;
    },

    update: async (id, nombre, descripcion) => {
        await pool.query(
            `
      UPDATE menu
      SET nombre = ?, descripcion = ?
      WHERE id = ?
    `,
            [nombre, descripcion, id]
        );
    },

    delete: async (id) => {
        await pool.query(
            `
      DELETE FROM menu
      WHERE id = ?
    `,
            [id]
        );
    },
};

module.exports = MenuRepository;
