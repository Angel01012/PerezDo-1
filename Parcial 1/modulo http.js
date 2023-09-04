let http = require('http')
let servidor = http.createServer(function (req, res){
    //res.setHeader("Access-control-Allow-Origin","*")
    res.write('servidor  http contenstando')
    res.end()
})
servidor.listen(8080,()=>{
    console.log("servidor node-http escuchando en el puerto 8080")
});