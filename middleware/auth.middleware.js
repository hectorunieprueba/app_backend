const jwt = require("jsonwebtoken")


const verificarToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    // console.log(authHeader);

    const token = authHeader.split(" ")[1];
    // console.log(token);

    const tokenVerificado = jwt.verify(token, process.env.TOKEN_PASSWORD);

    console.log(tokenVerificado);

    if (tokenVerificado.id != req.params.id) {

        return res.status(401).send("NO TIENES PERMISO PARA ESTO!")
    }

    next()
}

const verificarId = (req, res, next) => {

    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1];

    const tokenVerificado = jwt.verify(token, process.env.TOKEN_PASSWORD);

    console.log(tokenVerificado);

    if (tokenVerificado.id != req.params.id
        && (tokenVerificado.rol != "ADMON" && tokenVerificado.rol != "DIRECTOR")) {

        return res.status(401).send("NO TIENES PERMISO PARA ESTO!")
    }

    next();

}

const permitirRoles = (...rolesPermitidos) => {

    return (req, res, next) => {

        const authHeader = req.headers.authorization;

        const token = authHeader.split(" ")[1];

        const tokenVerificado = jwt.verify(token, process.env.TOKEN_PASSWORD);

        if (!rolesPermitidos.includes(tokenVerificado.rol)) {
             return res.status(401).send("NO TIENES PERMISO PARA ESTO!")
        }


        next();
    }

}



module.exports = { verificarToken, verificarId, permitirRoles };