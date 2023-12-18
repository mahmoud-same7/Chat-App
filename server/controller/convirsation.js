const async_handler = require("express-async-handler");
const {
  Convirsation,
  validtion_Create_conv,
} = require("../models/convirsation");
const { User } = require("../models/User");

/**-----------------------------
 * @method post
 * @route /api/convirsation/
 * @desc  create new convirsation
 * @access public
 -----------------------------*/

module.exports.Create_Conv = async_handler(async (req, res) => {
  // validtion
  const { error } = validtion_Create_conv(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const conv = await Convirsation.create({
    members: [req.body.senderId, req.body.reseverId],
  });
  res.status(201).json(conv );
});




/**-----------------------------
 * @method get
 * @route /api/convirsation/:userId
 * @desc  get all convirsations with id
 * @access public
 -----------------------------*/
module.exports.Get_Conv = async_handler(async (req, res) => {
  const userId = req.params.id;
  const convirsations = await Convirsation.find({ members: { $in: [userId] } });
  const conv_resever_data = Promise.all(
    convirsations.map(async (convirsation) => {
      const resever_Id = await Array.from(convirsation.members).find(
        (el) => el !== userId
      );
      const resever_data = await User.findById(resever_Id).select("-password");
      return {
        user:{
            email: resever_data.email,
            fullname: resever_data.fullname,
            id: resever_data._id,
        },
        convirsationId : convirsation._id
      };
    })
  );
  res.status(200).json(await conv_resever_data);
});
