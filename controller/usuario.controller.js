//const coches = require("../bbdd/coches");
const Usuario = require("../model/usuario.model");
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');

class UsuarioController {
    async logIn(req, res) {


        const user = await Usuario.findOne(
            { username: req.body.username }).select("+password");

        const isTruePassword = user ? await bcrypt.compare(req.body.password, user.password) : false;

        if (!user || !isTruePassword) {
            return res.status(404).send("Credenciales incorrectas");
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                rol: user.rol
            },
            process.env.TOKEN_PASSWORD,
            {
                expiresIn: "2h"
            })

        return res.status(200).json({ "mensaje": "Inicio de sesión correcto", "token": token });
        if (!result) {
            return res.status(404).send("credenciales incorrectas");
        }
        return res.status(200).send(result)
    }

    async getUsers(req, res) {
        const result = await Usuario.find()
        return res.status(200).send(result)
    }

    async getUserById(req, res) {
        const result = await Usuario.findById(req.params.id)
        return res.status(200).send(result)
    }

    async signUp(req, res) {
        try {
            const usuario = new Usuario({
                username: req.body.username,
                password: req.body.password,
                nombre: req.body.nombre,
                email: req.body.email,
                rol: req.body.rol
            })

            const result = usuario.save();
            return res.status(201).send("usuario insertado correctamente")

        } catch (error) {
            console.error("Error al insertar en la base de datos");
            return res.status(500).send("error interno");
        }
    }

    async signUpWithEncryptedPassword(req, res) {
        try {

            const passwordEncriptado = await bcrypt.hash(req.body.password, 10)
            console.log(passwordEncriptado);


            const usuario = new Usuario({
                username: req.body.username,
                password: passwordEncriptado,
                nombre: req.body.nombre,
                email: req.body.email,
                rol: req.body.rol
            })

            const result = usuario.save();
            return res.status(201).send("usuario insertado correctamente")

        } catch (error) {
            console.error("Error al insertar en la base de datos");
            return res.status(500).send("error interno");
        }
    }



    async deleteUser(req, res) {
        const result = await Usuario.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).send("No se encontró ningún usuario")
        }

        return res.status(200).send("Usuario eliminado correctamente")

    }


}

module.exports = new UsuarioController();