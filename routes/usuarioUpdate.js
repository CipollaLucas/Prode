const router = require("express").Router();
const User = require("../models/user");
const Joi = require('@hapi/joi'); //Dependencia para realizar validaciones.


/** ENDPOINT (PUT)*/
/** Este endpoint trae los detalles de un usuario particular y le pasamos los datos que queremos updatear. */
router.put("/update/:username", async (req, res) => {
    console.log("Estoy en búsqueda de un usuario particular para hacer un update.");
    try {
        const username = req.params.username;
        console.log("Revisando el usuario:", username); //Control para ver si llega por la request.
        // Validamos que exista
        const usuario = await User.findOne({ username: req.params.username });
        if (usuario) {
            usuario.name = req.body.name;
            usuario.lastname = req.body.lastname;
            const savedUser = await usuario.save()
            res.status(200).json({
                error: null,
                mensaje: "Acá están los detalles del usuario actualizado",
                body: usuario,
                data: savedUser
            });
        console.log("Actualizado exitosamente.\n")

        } else {
            res.status(404).json({ mensaje: "Usuario no encontrado." });
        }
        console.log("Todo Ok. Detalles del usuario actualizado mostrado.\n") //Control.
    }
    //Si falla por algún motivo sale.
    catch (error) {
        console.log("ERROR salgo por catch.\n", error);
        res.status(500).json({mensaje: "Error al consultar el usuario.\n"})
    }
        
});

module.exports = router