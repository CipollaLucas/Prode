const express = require("express");
const registroUsuario = require("./routes/registroUsuario.js");
const loginUsuario = require("./routes/loginUsuario.js");
const usuariosListar = require("./routes/listarUsuarios.js");
const usuarioDetalle = require("./routes/usuarioDetail.js");
const usuarioDelete = require("./routes/usuarioDelete.js");
const usuarioUpdate = require("./routes/usuarioUpdate.js");
const usuarioChangepass = require("./routes/usuarioChangePass.js")
require("dotenv").config();

//Dependencias para crear instancias
const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mongoose = require("mongoose");

//---------------------------------------------------------------//
//Conexión con el clúester de Mongo.
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.5nmid.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Conectado a la base de datos. \n");
}).catch((e) => {
    console.log("Error en la conexión a la base.\n", e);
});

//------------------ ENDPOINTS ---------------------------------------------//
// Endpoint POST para el registro de credenciales de usuario -
app.use("/api/user", registroUsuario);
//---------------------------------------------------------------//
// Endpoint POST para el login.
app.use("/api/user", loginUsuario);
//---------------------------------------------------------------//
// Endpoint GET para listar los usuarios.
app.use("/api/user", usuariosListar);
//---------------------------------------------------------------//
// Endpoint GET para listar usuario en particular.
app.use("/api/user", usuarioDetalle);
//---------------------------------------------------------------//
// Endpoint GET para eliminar un usuario en particular.
app.use("/api/user", usuarioDelete);
//---------------------------------------------------------------//
// Endpoint PUT para listar usuario en particular.
app.use("/api/user", usuarioUpdate);
//---------------------------------------------------------------//
// Endpoint PUT para actualizar o cambiar el password de un usuario en particular.
app.use("/api/user", usuarioChangepass);
//---------------------------------------------------------------//
// --- Documentación con Swagger --- //
//app.use("/api/api-docs",authDocs);
//---------------------------------------------------------------//
//Endpoint de bienvenida, inicio.
app.get("/", (req, res) => {
    console.log("Estás en el index.");
    res.json({ mensaje: "Bienvenido a mi Auth Api Rest de Usuarios" });
});

//---------------------------------------------------------------//
// --- JWT --- //
const dashboardRoutes = require('./routes/dashboard')
const verifyToken = require('./routes/validate-token')

app.use('/api/dashboard', verifyToken, dashboardRoutes)

//---------------------------------------------------------------//
const PORT = process.env.PORT || 8005;
app.listen(PORT, () => {
    console.log(`Tu servidor está corriendo en el puerto: ${PORT} \n`);
});
