const { Create_Conv, Get_Conv } = require("../controller/convirsation")

const router = require("express").Router()


router.route("/").post(Create_Conv)
router.route("/:id").get(Get_Conv)


module.exports = router