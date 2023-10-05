const express = require('express');
var morgan = require('morgan')
var fs = require('fs')
var path = require('path')
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const basicAuth = require('express-basic-auth')
app.use(express.urlencoded({extended: true}));
//var mysql      = require('mysql');
//connection.connect();
// app.use(basicAuth({
//     users: { 'admin': '1234' }
// }))

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))
//mysql2
const mysql = require('mysql2/promise');
app.get("/clientes",async (req,res)=>{
    try{
    const conn = await mysql.createConnection({host:'localhost', user: 'root', password: '162460132-2', database: 'clientes'});
    const [rows,fields] = await conn.query('SELECT * FROM personas');
    res.json(rows);
    }
    catch(err){
        res.status(500).json({mensaje:err.sqlMessage});
       //res.json({mensaje:"Error de conexion"});
    }
});
app.get("/clientes/:id", async(req, res)=>{
    const conn = await mysql.createConnection({host:'localhost', user: 'root', password: '162460132-2', database: 'clientes'});
    const [rows,fields] = await conn.query('SELECT * FROM personas where id='+req.params.id);
    if(rows.length==0)
    {
        res.status(404).json({mensaje:"Usuario no existe"})
    }
    else{
        res.json(rows)
    }
})

/* ------ */
app.post("/clientes", async (req, res) => {
    console.log("entra a la sentencia");
    const sentencia = `INSERT INTO personas (id,nombre, apellido) VALUES (${req.body.id}, '${req.body.nombre}', '${req.body.apellido}');`;
    try {
        const conn = await mysql.createConnection({host:'localhost', user: 'root', password: '162460132-2', database: 'clientes'});
        console.log(sentencia)
        const [rows,fields] = await conn.query(sentencia);
        res.json({message: "se Agrego"});
    } catch (err) {
        res.status(500).json({ mensaje: err.sqlMessage });
    }
});

/* ------ */
app.put("/clientes", async (req, res) => {
    console.log(req.query);
    //----
    let objeto = req.body;
let campos = Object.keys(objeto);
console.log(campos);
let valores = Object.values(objeto);

let cadenaUpdate = "Update personas";
let cadenaSet = "";
let CadenaWhere = "where";

campos.forEach((campo, index) => {
    if (campo == "id") {
        CadenaWhere = "where "+ campo + '=' + objeto[campo];
    } else {
        cadenaSet = `${cadenaSet}  ${campo} = '${objeto[campo]}'`;
        if (index < campos.length - 1) {
            cadenaSet += ',';
        }
    }
});
var sentencia = cadenaUpdate + ' SET ' + cadenaSet + ' ' + CadenaWhere;
console.log(sentencia)
//-------------
    const { id, nombre, apellido } = req.query;

    // if (!id || !nombre || !apellido) {
    //     res.status(400).json({ mensaje: "Se requieren los parámetros id y nuevoCampo" });
    //     return;
    // }
    try {
        const conn = await mysql.createConnection({host:'localhost', user: 'root', password: '162460132-2', database: 'clientes'});
        const [result] = await conn.query(sentencia);

        if (result.affectedRows > 0) {
            res.json({ mensaje: "Registro modificado correctamente" });
        } else {
            res.status(404).json({ mensaje: "No se encontró ningún registro para modificar" });
        }
    } catch (err) {
        res.status(500).json({ mensaje: err.sqlMessage });
    }
});

app.delete("/clientes",async (req,res)=>{
    console.log(req.query)
    const sentencia = `delete FROM personas where id=${req.query.id}`;
    console.log(sentencia);
    try{
        const conn = await mysql.createConnection({host:'localhost', user: 'root', password: '162460132-2', database: 'clientes'});
        const [rows,fields] = await conn.query(sentencia);
    res.json(rows);
    }    
    catch(err){
        res.status(500).json({mensaje:err.sqlMessage});
    }
})
app.get("/alumnos",(req,res)=>{
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    res.send("Servidor express contestando a peticion GET");
    //res.json({respuesta: "Contestando la peticion"})
    
});
app.post("/clientes",(req,res)=>{
    res.send("Servidor express contestando a peticion POST");
});

app.get("/clientes", (req, res, next) => {
    try {
        res.status(500).send("error: servidor no responde");
    } catch (error) {
        next(error); 
    }
});

app.use((err, req, res, next) => {
    res.status(500).send({
    message: err.message
    });
});
app.listen(8084,(req,res)=>{

    console.log("Servidor express escuchando");
});