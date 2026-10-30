const express = require('express');
const ruta = express.Router();
const usuarioController = require('../controller/usuario.controller')
const validarUsuario = require('../middleware/validarVenta.middleware');
const authMiddleware = require("../middleware/auth.middleware")



ruta.get("/", usuarioController.getUsers)
ruta.get("/:id", usuarioController.getUserById)

ruta.post("/login", validarUsuario.validarUsuario, usuarioController.logIn)
// ruta.post("/signup", usuarioController.signUp)
ruta.post("/signup", usuarioController.signUpWithEncryptedPassword)



ruta.delete("/delete/:id",authMiddleware.permitirRoles("DIRECTOR", "ADMON"), usuarioController.deleteUser)

module.exports = ruta;