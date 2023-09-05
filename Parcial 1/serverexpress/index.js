const express = require('express');
const app = express();

app.use(express.json());

app.get("/alumnos",(req,res)=>{
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    res.send("Servidor express contestando a peticion GET");
    //res.json({respuesta: "Contestando la peticion"})
    
});
app.post("/alumnos",(req,res)=>{
    res.send("Servidor express contestando a peticion POST");
});
app.listen(8084,(req,res)=>{
    console.log("Servidor express escuchando");
});