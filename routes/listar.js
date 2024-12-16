const router = require("express").Router();
const User = require("../models/user");
const Joi = require('@hapi/joi'); //Dependencia para realizar validaciones.


/** ENDPOINT (GET)*/
/** Este endpoint lista todos los usuarios existentes. */
router.get("/listar", async (req, res, next) => {
    console.log("Estoy en Usuarios, donde haria la consulta de los usuarios.");
    try {
        console.log("Revisando los usuarios.")
        const usuarios = await User.find().exec();
        res.json(usuarios);
        console.log("Todo Ok.\n")
    }
    catch (error) {
        console.log("ERROR salgo por catch.\n", error);
        res.status(500).json({mensaje: "Error al consultar usuarios.\n"})
    }
    
    });

router.get("/listar/:id", async (req, res, next) => {
    console.log("Estoy en Usuarios, donde haria la consulta de los usuarios.");
    try {
        console.log("Revisando el usuario.", req.body.username)
        //const usuarios = await User.find().exec();
        //res.json(usuarios);
        //console.log("Todo Ok.\n")
    }
    catch (error) {
        console.log("ERROR salgo por catch.\n", error);
        res.status(500).json({mensaje: "Error al consultar usuarios.\n"})
    }
        
});

module.exports = router