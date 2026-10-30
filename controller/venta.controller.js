//const coches = require("../bbdd/coches");
const Venta = require("../model/venta.model");
const Usuario = require("../model/usuario.model");
const Coche = require("../model/coche.model");


class VentaController{

    async registro(req, res){
        const usuarioVenta = await Usuario.findById(req.body.idusuario);

        // if (!usuarioVenta) {
        //     return res.status(404).send("usuario no encontrado");
        // }
        
        const cocheVenta = await Coche.findById(req.body.idcoche);
        // if (!cocheVenta) {
        //     return res.status(404).send("usuario no encontrado");
        // }
        
        const ventaNueva = new Venta({
            usuario:{
                _id: usuarioVenta._id
            }, 
            coche: {
                _id: cocheVenta._id
            },
            precio: req.body.precio
        });

        const resultVenta = await ventaNueva.save();

        cocheVenta.isVendido = true;

        return res.status(201).send("venta registrada correctamente")

    }
    
    async getVentaById(req,res){
        const result = await Venta.findById(req.params.id)
        .populate("coche", "marca modelo anio")
        .populate("usuario", "username email")
        
        return res.status(200).send(result)
        
    }

    async getVentasByPrecio(req,res){
        const result = await Venta.find().sort({precio: 1});
        return res.status(200).send(result)
    }


    // async getVentasFilterByPrecio(req, res){
    //     const result = await Venta.find({precio: {$gt: req.params.max, $lt: req.params.min}})
    //     return res.status(200).send(result);
    // }
    
    async getVentasFilterByPrecio(req, res){
        // const result = await Venta.find({precio: {$gt: req.params.max, $lt: req.params.min}})
        // return res.status(200).send(result);
    
        let filter = {}
        let filterPrecio = {}
        let orden = 1;
        if (req.query.ord == "desc") {
            orden = -1
        }

        if (req.query.min) {
            filterPrecio.$gt = Number(req.query.min);
        }
        
        if(req.query.max){
            filterPrecio.$lt = Number(req.query.max);
        }

        if (req.query.min || req.query.max) {
            filter.precio = filterPrecio
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;
           
        const result = await Venta
        .find(filter)
        .sort({precio: orden})
        .skip(skip)
        .limit(limit)

        return res.status(200).send(result)
    }


}

module.exports = new VentaController();