const { Create_message, Get_message_withId} = require("../controller/message")
const { verifyToken } = require("../middleware/verfiyToken")

const router = require("express").Router()


router.route("/").post(Create_message)
router.route("/:id").get(verifyToken,Get_message_withId)


module.exports = router