const router = require("express").Router();
const User = require("../models/user");
const Joi = require('@hapi/joi'); //Dependencia para realizar validaciones.


/** ENDPOINT (GET)*/
/** Este endpoint lista todos los usuarios existentes. */
router.get("/listar", async (req, res) => {
    console.log("Estoy en Usuarios, donde haria la consulta de los usuarios.");
    try {
        console.log("Revisando los usuarios.") //Print de control - En el futuro, será log.
        //Guarda en la variable usuarios la consulta asincrona que trae los usuarios a partir del modelo de usuario declarado.
        const usuarios = await User.find().exec();
        //Valida que no esté vacía
        if (usuarios == 0){
            console.log("Existe la colección, pero aparentemente está vacía.");
            res.status(204).json({
                mensaje: "No hay ningun usuario en la tabla.", //Vacía.
            });
        } else {
            //Hay registros. Los muestra.
            res.status(200).json({
                mensaje: "Acá te dejo los usuarios",
                body :  usuarios
            });
        }
        
        console.log("Todo Ok. Lista de usuarios mostrada.\n"); //Control.-
    }
    catch (error) {
        console.log("ERROR salgo por catch.\n", error);
        res.status(500).json({mensaje: "Error al consultar por los usuarios.\n"});
    }
    
    });

module.exports = router