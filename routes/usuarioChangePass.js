const router = require("express").Router();
const User = require("../models/user");
const Joi = require('@hapi/joi'); //Dependencia para realizar validaciones.
const bcrypt = require('bcrypt');// Encriptacion de password

// Esquema del pass para la validación
const schemaPass = Joi.object({
    password: Joi.string().min(6).max(1024).required()
});


/** ENDPOINT (PUT)*/
/** Este endpoint trae el password de un usuario particular y le pasamos la nueva contraseña. */
router.put("/changePass/:username", async (req, res) => {
    console.log("Estoy en búsqueda de un usuario particular para actualizar el password.");
    // Usaremos la propiedad error del objeto que nos entrega schemaRegister.validate()
    const { error } = schemaPass.validate(req.body)
    // Si este error existe, aqui se termina la ejecución devolviedonos el error
    if (error) {
        return res.status(400).json(
            {   error: error.details[0].message,
                mensaje: "Asegurate de que el passwor tenga 6 caraceters como mínimo.\n"
            }
        )
    }
    try {
        const username = req.params.username;
        console.log("Revisando el usuario:", username); //Control para ver si llega por la request.
        // Validamos que exista
        const usuario = await User.findOne({ username: req.params.username });
        if (usuario) {
            //Hasheamos el password. por medio de bcrypt
            const salt = await bcrypt.genSalt(10);
            const newpassword = await bcrypt.hash(req.body.password, salt);
            const savedUser = await usuario.save()
            res.status(200).json({
                error: null,
                mensaje: "Acá está el nuevo password",
                body: newpassword,
                data: savedUser
            });
        console.log("Password actualizado exitosamente.\n")

        } else {
            res.status(404).json({ mensaje: "Usuario no encontrado." });
        }
        console.log("Todo Ok. Detalles del usuario que ha actualizado el password.\n") //Control.
    }
    //Si falla por algún motivo sale.
    catch (error) {
        console.log("ERROR salgo por catch.\n", error);
        res.status(500).json({mensaje: "Error al consultar el usuario.\n"})
    }
        
});

module.exports = router