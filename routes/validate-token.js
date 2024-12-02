const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    console.log("Dentro de verifyToken. \n")
    // Obtenemos el token del header del request
    const token = req.header("auth-token");
    console.log("TOKEN: ", token)
    // Validamos si no hay token
    if (!token) return res.status(401).json({ error: "Acceso denegado. No está el token" });

    try {
        // Verificamos el token usando la dependencia de jwt y el método .verify
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(token, "-- ", TOKEN_SECRET)
        // si el token es correcto nos devolvera los datos que pusimos en el token
        req.user = verified;
        // next() indica que el req paso la prueba y continue su camino
        next();
        console.log("Token válido.\n")
    } catch (error) {
        console.log("Token inválido.\n",error, "\n")
        res.status(400).json({ error: "Token no valido, acceso denegado" });
    }
};

module.exports = verifyToken;