const Jwt = require("jsonwebtoken")



const verifyToken = (req,res,next)=> {
    const token = req.headers.authorization
    try {
        if(token) {
            const decode = Jwt.verify(token , process.env.SECRET_KEY)
            req.user = decode
            next()
        }else {
            return res.status(401).json({msg:"This Token Incorrect"})
        }
    } catch (error) {
        return res.status(401).json({msg:"access denied!"})
    }
}




module.exports = {
    verifyToken
}