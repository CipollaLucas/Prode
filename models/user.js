//** Importamos el modulo de MongoDb */
const mongoose = require("mongoose");

//** Acá definimos el modelo de user y los campos que tendrá. */
//* Se define como Schema porqué es la manera en la que mongo trata su colección.
const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 6,
        max: 255,
    },
    name: {
        type: String,
        require: true,
        min: 6,
        max: 255,
    },
    lastname: {
        type: String,
        require: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        require: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

//** Se exporta el modelo con el nombre - User -  */
module.exports = mongoose.model("User", userSchema);