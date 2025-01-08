/**
 * @swagger
 * tags:
 *   name: Vendedores
 *   description: API para gestionar los Vendedores
 */

/**
 * @swagger
 * /vendedores:
 *   get:
 *     summary: Obtener todos los vendedores
 *     tags: [Vendedores]
 *     responses:
 *       200:
 *         description: Lista de vendedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vendedor'
 *
 *   post:
 *     summary: Crear un nuevo vendedor
 *     tags: [Vendedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vendedor'
 *     responses:
 *       201:
 *         description: Vendedor creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendedor'
 *       400:
 *         description: Error en los datos de entrada
 */

/**
 * @swagger
 * /vendedores/{id}:
 *   get:
 *     summary: Obtener un vendedor por ID
 *     tags: [Vendedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del vendedor
 *     responses:
 *       200:
 *         description: Vendedor obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendedor'
 *       404:
 *         description: Vendedor no encontrado
 *
 *   put:
 *     summary: Actualizar un vendedor
 *     tags: [Vendedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vendedor a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vendedor'
 *     responses:
 *       200:
 *         description: Vendedor actualizado exitosamente
 *       404:
 *         description: Vendedor no encontrado
 *
 *   delete:
 *     summary: Eliminar un vendedor
 *     tags: [Vendedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vendedor a eliminar
 *     responses:
 *       200:
 *         description: Vendedor eliminado
 *       404:
 *         description: Vendedor no encontrado
 */

const { Router } = require("express");
const VendedorController = require("../controllers/vendedor.controller");

const router = Router();

router.get("/", VendedorController.getAll);
router.get("/:id", VendedorController.getById);
router.post("/", VendedorController.create);
router.put("/:id", VendedorController.update);
router.delete("/:id", VendedorController.remove);

module.exports = router;
