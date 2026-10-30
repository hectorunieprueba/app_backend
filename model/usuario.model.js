const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        //El username debe ser único, no se podrá repetir
        unique: true,
        //Trim para eliminar espacios delante y detrás
        trim: true
    },
    password: {
        type: String,
        required: true,
        //con select hacemos que el campo no se devuelva en las consultas
        select: false
    },
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //minúsculas
        lowercase: true,
        trim: true,
        
        match: [/^\S+@\S+\.\S+$/, "El email no es válido"]
    },
    enable: {
        type: Boolean,
        default: true,
        select: false
    },
    rol: {
        type: String,
        required: true,
        trim: true,
        //enum para que no podamos poner otra opción que no sea
        //la del modelo
        enum: ["ADMON", "CLIENTE", "DIRECTOR"]
    }
},
{
    timestamps: true,
    versionKey: false
}
)

const Usuario = mongoose.model("usuario", usuarioSchema);

module.exports = Usuario;