const express = require('express');
const ruta = express.Router();
const ventaController = require('../controller/venta.controller')
const validarVenta = require('../middleware/validarVenta.middleware')
const authMiddleware = require("../middleware/auth.middleware")


/**
 * @swagger
 * /api/ventas/rango:
 *  get:
 *      summary: Obtenemos ventas con búsqueda dinámica
 *      parameters:
 *          - in: query
 *            name: min
 *            schema:
 *              type: number
 *            description: Precio mínimo de búsqueda
 *          - in: query
 *            name: max
 *            schema:
 *              type: number
 *            description: Precio máximo de búsqueda
 *      responses:
 *          200:
 *              description: Devolvemos coche con el filtro deseado
 */



ruta.get("/rango", ventaController.getVentasFilterByPrecio)



ruta.post("/registro",validarVenta.validarVenta, ventaController.registro)
ruta.get("/:id", ventaController.getVentaById)
ruta.get("/",authMiddleware.verificarToken, ventaController.getVentasByPrecio)


module.exports = ruta;