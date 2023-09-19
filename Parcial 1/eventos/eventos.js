const events = require('events');

function saludar(){
    const emisor = new events.EventEmitter();
    setTimeout(()=>emisor.emit('saludar','juan'),3000);
    setTimeout(()=>emisor.emit('saludar','jose'),5000);
    setTimeout(()=>emisor.emit('saludar','miguel'),7000);
    return emisor;
}

let sal = saludar();

sal.on('saludar',(nombre)=>{
    console.log('hola '+nombre)
});