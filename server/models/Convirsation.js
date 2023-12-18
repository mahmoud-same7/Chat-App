const mongoose = require("mongoose")
const Joi = require("joi")


const ConvSchema = new mongoose.Schema({
    members : {
        type: Array,
        required:true
    }
},{
    timestamps: true ,
})

const Convirsation = mongoose.model("convirsation" , ConvSchema)



const validtion_Create_conv = (obj)=> {
    const schema = Joi.object({
        senderId: Joi.string().required(),
        reseverId: Joi.string().required(),
    })
    return schema.validate(obj)
}

module.exports = {
    Convirsation,
    validtion_Create_conv
}