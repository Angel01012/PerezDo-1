const e = require('express');
const express = require('express');
const { check, validationResult, checkSchema } = require('express-validator');
const app = express();
app.use(express.json());

app.post("/clientes2",[check('edad').isNumeric()
,check('correo').isEmail()]
,(req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        console.log(req.body);
        res.json({mensaje:"Respuesta a peticion post"});
    } else{
        res.json(result);
    }
});

app.post("/clientes",checkSchema({
    'login': {isLength: {options:{min: 5, max:10}}},
    'edad': {isNumeric:{errorMessage: "la edad debe de ser numerica"}},
    'correo': {isEmail: {}}
}),
(req,res)=>{
    const result =  validationResult(req);
    if (result.isEmpty()) {
        res.json({mensaje: "Login correcto"});
    }
    else{
        res.json(result)
    }
}
)
app.get("/clientes", (req, res, next) => {
    try {
    throw new Error("Error generado para prueba");
    } catch (error) {
        next(error); 
    }
});

app.use((err, req, res, next) => {
    res.status(502).send("Hubo un error en el servidor: " + err.message);
});

app.listen(8084,()=>{
    console.log("Servidor express escuchando 8084");
});