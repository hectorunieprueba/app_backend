const express = require('express');
const app = express();
const mongoose = require('mongoose');
const rutaCoches = require('./routes/coches.routes')
const rutaUsuarios = require('./routes/usuarios.routes')

const rutaVentas = require('./routes/ventas.routes')
const logger = require('./middleware/logger.middleware')

//variables de entorno 
require('dotenv').config();



//Middleware
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use("/api/coches", rutaCoches);
app.use("/api/usuarios", rutaUsuarios);
app.use("/api/ventas", rutaVentas);

app.use(logger);

//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))


const PUERTO = process.env.PORT || 3000
// El puerto donde ejecutaremos la API. El log aparecerá en nuestra consola
app.listen(PUERTO, () => {
    console.log("Aplicación arrancada en el puerto 3000");
});


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("BBDD en marcha!!"))
.catch(() => console.log("LA BBDD PETÓ!!"))
