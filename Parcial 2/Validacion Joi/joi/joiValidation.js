const validation = (schema)=>{
let joivalidation = (req, res, next)=>{
    let {error}= schema.validate(req.body,{abortEarly: false});
    console.log(error);
    if (error) {
        let {details}=error
        res.status(422).json({error:details});
    }else
    {
        next();
    }
}
return joivalidation;
}
module.exports=validation