const { Register, Login, GetAllUers } = require("../controller/user")

const router = require("express").Router()


router.route("/register").post(Register)
router.route("/login").post(Login)

router.route("/").get(GetAllUers)

module.exports = router