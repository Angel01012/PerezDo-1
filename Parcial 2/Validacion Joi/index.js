const e = require('express');
const express = require('express');
const { check, validationResult, checkSchema } = require('express-validator');
const app = express();
const joi = require('joi');
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



app.listen(8084,()=>{
    console.log("Servidor express escuchando 8084");
});