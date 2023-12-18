const async_handler = require("express-async-handler")
const bcrypt = require("bcrypt")

const { ValidationRegister, User, ValidationLogin } = require("../models/User")
const { Convirsation } = require("../models/convirsation")


const Register = async_handler(async(req,res)=> {
    // validtion
    const {error} = ValidationRegister(req.body)
    if(error) { 
        return res.status(400).json({message: error.details[0].message})
    }

    // check user Already register or not
    let user =  await User.findOne({email : req.body.email})
    if(user) {
        return res.status(400).json({message:"This User is Already Register"})
    }
    // hash Password
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password ,salt) 

    // create new User
    user = await User.create({
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
    })
    res.status(201).json({message:"Register Successfully!"})
})


const Login = async_handler(async(req,res)=> {
    // validtion
    const {error} = ValidationLogin(req.body)
    if(error) { 
        return res.status(400).json({message: error.details[0].message})
    }

    // check user Already register or not
    const user =  await User.findOne({email : req.body.email})
    if(!user) {
        return res.status(400).json({message:"This User is Not Found"})
    }
    console.log(user)
    // compare Password
    const comparePass = await bcrypt.compare(req.body.password,user.password)
    if(!comparePass) {
        return res.status(400).json({message:" email or Password InCorrect!"})
    }
    // create Token
    const token = user.Token()
    // response to client
    res.status(200).json({ id: user._id , email: user.email , fullname: user.fullname , token})
})


const GetAllUers = async_handler(async(req,res)=> {
    const users = await User.find().select("-password")
    res.status(200).json(users)
})



module.exports = {
    Register,
    Login,
    GetAllUers
}