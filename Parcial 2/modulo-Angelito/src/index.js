
let color = ["Rojo", "Verde", "Azul"]
/**
 * Necesito que tenga un indice entre 0-2
 * Posibles soluciones (Rojo, Verde y Azul)
 * @param {*} indice  Numero de 0-2
 * @returns Equipo
 */

function obtieneColor(indice) {
   return color(indice);
}

module.exports.obtieneColor = obtieneColor;
console.log(module);
