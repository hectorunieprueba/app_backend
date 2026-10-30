const validarVenta = (req,res, next) => {
    if (!req.body.idusuario || !req.body.idcoche || !req.body.precio) {
        return res.status(404).send("Faltan datos")
    }

    if(req.body.precio < 0){
          return res.status(404).send("El precio no puede ser inferior a 0")
    }

    next();
}

const validarUsuario = (req, res, next) => {
    if(!req.body.username || !req.body.password){
         return res.status(404).send("Faltan datos")
    }

    next();
}

module.exports = {validarVenta, validarUsuario}