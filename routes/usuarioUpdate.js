const router = require("express").Router();
const User = require("../models/user");
const Joi = require('@hapi/joi'); //Dependencia para realizar validaciones.

// Esquema de los datos a validar al momento de actualizar
const schemaUpdate = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    lastname: Joi.string().min(6).max(255).required()
});

/** ENDPOINT (PUT)*/
/** Este endpoint trae los detalles de un usuario particular y le pasamos los datos que queremos updatear. */
router.put("/update/:username", async (req, res) => {
    console.log("Estoy en búsqueda de un usuario particular para hacer un update.");
    // Usaremos la propiedad error del objeto que nos entrega schemaRegister.validate()
    const { error } = schemaUpdate.validate(req.body)
    // Si este error existe, aqui se termina la ejecución devolviedonos el error
    if (error) {
        return res.status(400).json(
            {   error: error.details[0].message,
                mensaje: "Asegurate de que el nombre y el apellido tenga 6 caraceters como mínimo y no sean numeros.\n"
            }
        )
    }
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