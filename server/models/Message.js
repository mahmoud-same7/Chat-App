const mongoose = require("mongoose")
const Joi = require("joi")

const messageSchema = new mongoose.Schema({
    text : {
        type: String,
    },
    sender_Id:{
        type:String,
        required:true
    },
    convirsationId :{ 
        type: String,
    }
})

const Message = mongoose.model("message",  messageSchema)


module.exports = {
    Message ,
}