const { SwaggerTheme } = require('swagger-themes');
const OpenAPISnippet = require('openapi-snippet');
const express = require('express');
const morgan = require('morgan')
var fs = require('fs')
var path = require('path')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const redoc = require('redoc-express');
const basicAuth = require('express-basic-auth')
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 8084
const host = process.env.host || 'localhost'
const user = process.env.user || 'root'
const password = process.env.password || '162460132-2'
const database = process.env.database || 'clientes'
const dbport = process.env.dbport || 3306

const theme = new SwaggerTheme('v3');

const options = {
    explorer: true,
    customCss: theme.getBuffer('muted')
};


const def = fs.readFileSync(path.join(__dirname,'/swagger.json'), { encoding: 'utf8', flag: 'r' });
const MD = fs.readFileSync(path.join(__dirname,'/README.MD'), { encoding: 'utf8', flag: 'r' });
const defObj = JSON.parse(def);
defObj.info.description=MD;

const swaggerOptions = {
    definition:defObj,
    apis: [`${path.join(__dirname,"./index.js")}`],
}

app.get(
    '/api-docs-redoc',
    redoc({
    title: 'API Docs',
    specUrl: '/api-docs-json',
    nonce: '', // <= it is optional,we can omit this key and value
    // we are now start supporting the redocOptions object
    // you can omit the options object if you don't need it
    // https://redocly.com/docs/api-reference-docs/configuration/functionality/
    redocOptions: {
        theme: {
        colors: {
            primary: {
            main: '#6EC5AB'
            }
        },
        typography: {
            fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
            fontSize: '15px',
            lineHeight: '1.5',
            code: {
            code: '#87E8C7',
            backgroundColor: '#4D4D4E'
            }
        },
        menu: {
            backgroundColor: '#ffffff'
        }
        }
    }
    })
);




var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs, options));
app.use("/api-docs-json",(req,res)=>{
    res.json(swaggerDocs);
})
//mysql2
const mysql = require('mysql2/promise');

/**
 * @swagger
 * /clientes:
 *   get:
 *     tags:
 *       - clientes
 *     summary: Consulta Clientes especificos
 *     description: Obtiene un Json que contiene los clientesde la Base de Datos
 *     responses:
 *       200:
 *         description: Regresa un Json con todos los clientes
 */
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

// SELECT
/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     tags:
 *       - Clientes
 *     summary: Consultar un cliente por ID
 *     description: Obtiene Json con un cliente específico de la Base de Datos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del acliente a consultar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Regresa un Json con el cliente solicitado
 *       404:
 *         description: El cliente no existe
 */
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
// INSERT INTO
/**
 * @swagger
 * /clientes/:
 *   post:
 *     tags:
 *       - Clientes
 *     summary: Agregar un nuevo Cliente
 *     description: Agrega un nuevo Cliente a la Base de Datos con los parámetros proporcionados en el cuerpo de la solicitud
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idtec:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *             required:
 *               - id
 *               - nombre
 *               - apellido
 *     responses:
 *       201:
 *         description: Cliente agregado correctamente
 */
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
// UPDATE
/**
 * @swagger
 * /clientes/:
 *   put:
 *     tags:
 *       - Clientes
 *     summary: Modificar un cliente existente
 *     description: Modifica un cliente existente en la Base de Datos con los parámetros proporcionados en el cuerpo de la solicitud
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *             required:
 *               - idtec
 *     responses:
 *       200:
 *         description: Cliente modificado correctamente
 *       404:
 *         description: Cliente no encontrado
 *       400:
 *         description: Solicitud incorrecta
 */
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

// DELETE
/**
 * @swagger
 * /clientes/:
 *   delete:
 *     tags:
 *       - Clientes
 *     summary: Eliminar un cliente por ID
 *     description: Elimina un cliente de la Base de Datos según el ID proporcionado en los parámetros de la solicitud
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID del cliente a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro eliminado correctamente
 *       404:
 *         description: Registro no encontrado
 */
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