const express = require('express');
var morgan = require('morgan')
var fs = require('fs')
var path = require('path')
const app = express();
const swaggerUI = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
var mysql = require('mysql');

//connection.connect();
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

/*app.get("/usuarios",(req,res)=>{
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'me',
        password : 'secret',
        database : 'my_db'
    });
    connection.connect();
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });
})
*/
const swaggerOptions = {
    definition: {
    openapi: '3.0.0',
    info: {
    title: 'API Empleados',
    version: '1.0.0',
    },
    servers:[
    {url: "http://localhost:8084"}
    ],
    },
    apis: [`${path.join(__dirname,"./routes/ruta_empleado.js")}`],
    };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));
//mysql2
const mysql = require('mysql2/promise');
app.get("/web",async (req,res)=>{
    try{
    const conn = await mysql.createConnection({host:'localhost', user: 'root', password: '162460132-2', database: 'web'});
    const [rows,fields] = await conn.query('SELECT * FROM login');
    res.json(rows);
    }
    catch(err){
        res.status(500).json({mensaje:err.sqlMessage});
       //res.json({mensaje:"Error de conexion"});
    }
});

app.get("/web/:Edad", async(req, res)=>{
    const conn = await mysql.createConnection({host:'localhost', user: 'root', password: '162460132-2', database: 'web'});
    const [rows,fields] = await conn.query('SELECT * FROM login where Edad='+req.params.Edad);
    if(rows.length==0)
    {
        res.status(404).json({mensaje:"Usuario no existe"})
    }
    else{
        res.json(rows)
    }
})

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