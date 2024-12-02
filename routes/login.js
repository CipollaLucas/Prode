const router = require("express").Router();
const User = require("../models/user");
const Joi = require('@hapi/joi'); //Dependencia para realizar validaciones.
const bcrypt = require('bcrypt');// Encriptacion de password
const jwt = require('jsonwebtoken');//Json Web Token para autorizar las peticiones del login

/** LOGIN */
// Esquema del login
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
});

/** ENDPOINT (POST)*/
router.post("/login", async (req, res) => {
    console.log("Estoy en el endpoint LOGIN. \n")
    // Validaciones de login
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Validacion e existencia
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    // Validacion de password en la base de datos
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).json({ error: "Constraseña invalida" });
    
    console.log("Voy a revisar el token");
    // Creando token
    const token = jwt.sign(
        {
        name: user.name,
        id: user._id,
        },
        process.env.TOKEN_SECRET
    );
    console.log("Esto tiene token ---> ", token)
    // Colocando el token en el header y el cuerpo de la respuesta
    res.header("auth-token", token).json({
        error: null,
        data: { token },
        message: "Bienvenido",
    });
    console.log("Logeado OK -->", req.body.email)
});

module.exports = router
