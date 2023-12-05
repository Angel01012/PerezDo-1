const request = require('supertest');

request(app)
    .get('/')
    .expect(200)
    .end((err, res) => {
        if (err) throw err;
        console.log('GET / deberia mandar un mensaje de hola mundo"');
    });

    request(app)
    .get('/clientes')
    .expect(200)
    .end((err, res) => {
        if (err) throw err;
        console.log('GET / deberia regresar un listado de los clientes');
    });