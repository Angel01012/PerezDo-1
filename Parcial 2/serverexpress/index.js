const express = require('express');
var morgan = require('morgan')
var fs = require('fs')
var path = require('path')

const cors = require('cors');
const basicAuth = require('express-basic-auth');
const multer = require('multer');
const folder = path.join(__dirname+'/archivos/');

const storage = multer.diskStorage({
    destination: function(req, file, cb){ cb (null, folder)}, 
    filename: function(req, file, cb) {cb(null, file.originalname)}});

const upload =  multer({storage: storage})
const app = express();
app.use(cors());

app.use(upload.single('archivo'));

app.post("/clientes", (req, res) => {
    console.log(`se recibio el archivo: ${req.file.originalname}`);
    console.log(`se recibio el formulario: `+JSON.stringify(req.body));
    res.json(req.body);
});

app.post("/clientes",(req,res)=>{
    res.send("Servidor express contestando a peticion POST");
});
app.listen(8084,(req,res)=>{

    console.log("Servidor express escuchando");
});

