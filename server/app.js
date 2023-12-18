const express = require("express")
const cors = require("cors")
const { connectDB } = require("./db/connectDB")


const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))



require("dotenv").config()

connectDB()

// routes
app.use("/api/users" , require("./routes/userRoute"))
app.use("/api/convirsation", require("./routes/convirsationRoute"))
app.use("/api/message", require("./routes/messageRoute"))



const PORT = process.env.PORT
app.listen(PORT , ()=> {console.log("Server is running")})