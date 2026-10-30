const express = require('express');
const ruta = express.Router();
const cocheController = require('../controller/coche.controller')
const logger = require("../middleware/logger.middleware")


ruta.get("/carga-inicial", cocheController.cargaInicial);

//Para conectar: localhost:3000/api-docs

/**
 * @swagger
 * /api/coches:
 *  get:
 *      summary: Obtenemos todos los coches
 *      responses: 
 *          200:
 *              description: Lista de coches
 */

ruta.get("/",logger, cocheController.findAll)


/**
 * @swagger
 * /api/coches/buscar-id/{id}:
 *  get:
 *      summary: Obtener un coche por id
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del coche
 *      responses:
 *          200:
 *              description: Coche encontrado
 *          404:
 *              description: Coche no encontrado o no existe
 */

ruta.get("/buscar-id/:id", cocheController.findById)
ruta.get("/buscar-anio/:anio", cocheController.findByAnioGreaterThan)
ruta.get("/buscar-marca/:marca", cocheController.findByMarca)


ruta.post("/crear-coche", cocheController.insertOne)
ruta.post("/crear", cocheController.createCoche)

ruta.put("/actualizar/:id", cocheController.updateById)

ruta.delete("/eliminar/:id", cocheController.deleteById)

module.exports = ruta;