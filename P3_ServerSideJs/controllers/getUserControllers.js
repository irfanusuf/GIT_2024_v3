const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken")





// [authorised route]

const getUser = async (req, res) => {
  try {
 
    const userId = req.userId

    const findUser  = await User.findById(userId)   // logged in user object //

    // const findUser = await User.findOne({ email: "irfanusuf33@gmail.com" }); // db query which returns user Object

    if (findUser) {
      res.render("userProfile", {
        title: "Techytechs | User-profile",
        username: findUser.username,
        email: findUser.email,
        password : findUser.password
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = getUser;
