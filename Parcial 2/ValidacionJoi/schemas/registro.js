const Joi = require('joi');
module.exports = {
    registroSchema : Joi.object({
        Nombre:Joi.string().required(),
        Apellido:Joi.string().required(),
        NumControl:Joi.number()
        .integer()
        .min(1)
        .required(),
        Correo:Joi.string().min(1).max(50).required(),
        // .email({minDomainSegments:2,tlds:{allow:['com','net']}})
        // .required(),
    }),
};