const mongoose = require("mongoose")



module.exports.connectDB = async()=> {
    try {
        await mongoose.connect(process.env.URL_DB)
        console.log("Connected DB ^_^")
    } catch (error) {
        console.log("Connection Faild" , error)
    }
}