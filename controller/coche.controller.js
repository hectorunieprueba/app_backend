const coches = require("../bbdd/coches");
const Coche = require("../model/coche.model");

const cargaInicial = async (req, res) => {
    await Coche.insertMany(coches);
    res.status(201).send("Carga completa!");
}

const findAll = async (req, res) => {
    const result = await Coche.find();
    res.status(200).send(result);
}

const findById = async (req, res) => {
    const result = await Coche.find({ _id: req.params.id });
    res.status(200).send(result);
}

const findByAnioGreaterThan = async (req, res) => {

    /* 
    gt : greater than (mayor que)
    gte : greater than or equals (mayor o igual que)
    lt : less than (menor que)
    lte : less than or equals (menor o igual que)
    */

    const result = await Coche.find({ anio: { $gte: req.params.anio } });
    if (result.length == 0) {
        return res.status(404).send({ message: "No hay coches que cumplan el parámetro" });
    }
    return res.status(200).send(result);
}

const findByMarca = async (req, res) => {
    const result = await Coche.find({ marca: req.params.marca });
    res.status(200).send(result);
}

//insertOne
const insertOne = async (req, res) => {
    try {
        const coche = req.body;
        const cocheNuevo = new Coche(coche);
        const result = cocheNuevo.save();
        return res.status(201).send("Coche insertado correctamente");

    } catch (error) {
        console.error("Error al insertar Coche");
        res.status(404).send({message: "Error al insertar Coche"})
    }
    
}

const createCoche = async (req, res) => {

    try {
        const { marca, modelo, anio, extras } = req.body;
        Coche.create({ marca, modelo, anio, extras });
        return res.status(201).send({ message: "Coche insertado correctamente 😊" })
        
    } catch (error) {
        console.error("Error al insertar Coche");
        res.status(404).send({message: "Error al insertar Coche"})
        
    }

}

const updateById = async (req, res) => {
    try {
        const result = await Coche.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        return res.status(200).send(result)
        
    } catch (error) {
        console.error("Error al actualizar Coche");
        res.status(404).send({message: "Error al actualizar Coche"})
    }
}

const deleteById = async (req, res) => {
    try {
        const result = await Coche.findByIdAndDelete(req.params.id)
        return res.status(200).send({message: "Coche eliminado correctamente"})
        
    } catch (error) {
        console.error("Error al actualizar Coche");
        res.status(404).send({message: "Error al actualizar Coche"})
    }
}


module.exports = {
    cargaInicial,
    findAll,
    findById,
    findByAnioGreaterThan,
    findByMarca,
    insertOne,
    createCoche,
    updateById,
    deleteById
}