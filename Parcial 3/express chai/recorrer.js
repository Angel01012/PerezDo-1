let objeto = {id: 7,  apellido: "Perez"};
let campos = Object.keys(objeto);
console.log(campos);
let valores = Object.values(objeto);

let cadenaUpdate = "Update persona";
let cadenaSet = "";
let CadenaWhere = "where";

campos.forEach((campo, index) => {
    console.log(campo + '=' + objeto[campo] + ',');
    if (campo == 'id') {
        CadenaWhere = "where "+ campo + '=' + objeto[campo];
    } else {
        cadenaSet = `${cadenaSet} ${campo} = '${objeto[campo]}'`;
        if (index < campos.length - 1) {
            cadenaSet += ',';
        }
    }
});
var sentencia = cadenaUpdate + ' SET' + cadenaSet + ' ' + CadenaWhere;
console.log(sentencia);
