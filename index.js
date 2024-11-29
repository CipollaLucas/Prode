const express = require("express");
const authRoutes = require("./routes/auth.js");
const authLogin = require("./routes/login.js");
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
    console.log("Conectado a la base de datos");
}).catch((e) => {
    console.log("Database error", e);
});
//---------------------------------------------------------------//
// Endpoint POST para el registro de credenciales de usuario -
app.use("/api/user", authRoutes);
//---------------------------------------------------------------//
// Endpoint POST para el login.
app.use("/api/user", authLogin);
//---------------------------------------------------------------//
//Endpoint de bienvenida, inicio.
app.get("/", (req, res) => {
    console.log("Estás en el index.");
    res.json({ mensaje: "Bienvenido a mi Auth Api Rest" });
});
//---------------------------------------------------------------//
const PORT = process.env.PORT || 8005;
app.listen(PORT, () => {
    console.log(`Tu servidor está corriendo en el puerto: ${PORT}`);
});
