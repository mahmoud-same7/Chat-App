const async_handler = require("express-async-handler")
const { Message, validtionMessage } = require("../models/Message")
const { User } = require("../models/User")

/**-----------------------------
 * @method post
 * @route /api/message/
 * @desc  create new message
 * @access public
 -----------------------------*/

 module.exports.Create_message = async_handler(async(req,res)=> {
    const {text , sender_Id , convirsationId} = req.body
    const message = await Message.create({
        text,
        sender_Id,
        convirsationId
    })
    res.status(201).json({message : "Create Message"})
})


/**-----------------------------
 * @method get
 * @route /api/message/userId
 * @desc  get message with id
 * @access public
 -----------------------------*/

 module.exports.Get_message_withId = async_handler(async(req,res)=> {
    const convirsationId = req.params.id
    const messages = await Message.find({convirsationId})
    if(messages.length <= 0) {
            // create new message
            const newMessage = await Message.create({
                text:"",
                sender_Id: req.user.id,
                convirsationId : convirsationId
            })
            return res.status(201).json({newMessage})
    }
    const messageUser = Promise.all(messages.map( async (message)=> {
            const sendUser = await User.findById(message.sender_Id).select("-password")
            return {sendUser , message: message.text}
    }))
    res.status(200).json(await messageUser )
})