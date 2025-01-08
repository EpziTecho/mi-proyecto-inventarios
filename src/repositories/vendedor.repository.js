const pool = require("../config/database");

const VendedorRepository = {
    // 1) Obtener todos los vendedores

    getAll: async () => {
        const [rows] = await pool.query(`
            SELECT 
              v.idVendedor, 
              v.nombre, 
              v.foto, 
              v.dni, 
              v.tfno, 
              v.idRol, 
              r.nombreRol
            FROM Vendedor v
            JOIN Rol r ON v.idRol = r.idRol
          `);
        return rows;
    },

    // 2) Obtener un vendedor por su ID
    getById: async (idVendedor) => {
        const [rows] = await pool.query(
            `
          SELECT 
            v.idVendedor, 
            v.nombre, 
            v.foto, 
            v.dni, 
            v.tfno, 
            v.idRol, 
            r.nombreRol
          FROM Vendedor v
          JOIN Rol r ON v.idRol = r.idRol
          WHERE v.idVendedor = ?
        `,
            [idVendedor]
        );
        return rows[0] || null;
    },

    // 3) Crear un vendedor
    create: async (nombre, foto, dni, tfno, idRol) => {
        const [result] = await pool.query(
            `
      INSERT INTO Vendedor (nombre, foto, dni, tfno, idRol)
      VALUES (?, ?, ?, ?, ?)
    `,
            [nombre, foto, dni, tfno, idRol]
        );
        return result.insertId; // ID autogenerado consultar con hugosama xd :v
    },

    // 4) Actualizar un vendedor
    update: async (idVendedor, nombre, foto, dni, tfno, idRol) => {
        await pool.query(
            `
      UPDATE Vendedor
      SET nombre = ?, foto = ?, dni = ?, tfno = ?, idRol = ?
      WHERE idVendedor = ?
    `,
            [nombre, foto, dni, tfno, idRol, idVendedor]
        );
    },

    // 5) Eliminar un vendedor
    delete: async (idVendedor) => {
        await pool.query(
            `
      DELETE FROM Vendedor
      WHERE idVendedor = ?
    `,
            [idVendedor]
        );
    },
};

module.exports = VendedorRepository;
