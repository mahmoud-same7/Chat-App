const mongoose = require("mongoose")
const Joi = require("joi")
const Jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    fullname :{
        type: String,
        required: true ,
        trim : true ,
        minlength : 2,
        maxlength : 20
    },
    email :{
        type: String,
        required: true ,
        trim : true ,
        unique: true
    },
    password :{
        type: String,
        required: true ,
        trim : true ,
        minlength : 8,
    },
},{timestamps:  true})


UserSchema.methods.Token =  function () {
    const token =  Jwt.sign({id:this._id , email: this.email} , process.env.SECRET_KEY,{expiresIn: "12h"})
    return token;
}


const User = mongoose.model("user" , UserSchema)


const ValidationRegister = (obj)=> {
    const schema  = Joi.object({
        fullname :Joi.string().required().trim().min(2).max(20),
        email :Joi.string().trim().email().required(),
        password :Joi.string().trim().min(8).required(),
    })
    return schema.validate(obj)
}



const ValidationLogin = (obj)=> {
    const schema  = Joi.object({
        email : Joi.string().required().trim().email(),
        password : Joi.string().required().trim().min(8),
    })
    return schema.validate(obj)
}


module.exports = {
    User , 
    ValidationRegister ,
    ValidationLogin
}