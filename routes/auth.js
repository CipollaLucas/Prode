const router = require("express").Router();
const User = require("../models/user");
const Joi = require('@hapi/joi'); //Dependencia para realizar validaciones.
const bcrypt = require('bcrypt');// Encriptacion de password
const jwt = require('jsonwebtoken');//Json Web Token para autorizar las peticiones del login

//--------- REGISTER ------------------------------------------------------//
/** MODELO de esquema para validar. */
// Creamos un esquema de registro usando las validaciones de Joi
const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    lastname: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

/** ENDPOINT (POST) */
router.post('/register', async (req, res) => {

    // Dentro del método que invoca POST
    // Usaremos la propiedad error del objeto que nos entrega schemaRegister.validate()
    const { error } = schemaRegister.validate(req.body)
    // Si este error existe, aqui se termina la ejecución devolviedonos el error
    if (error) {
        return res.status(400).json(
            { error: error.details[0].message }
        )
    }
    // Validacion del mail. Que no exista otro igual.
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            {error: 'Email ya registrado'} 
        )
    }
    //Hasheamos el password. por medio de bcrypt
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });
    try {
        const savedUser = await user.save()
        res.json({
            error: null,
            data: savedUser
        })
        console.log("Agregado exitosamente.\n")
    } catch (error) {
        res.status(400).json({error})
    }
})

module.exports = router