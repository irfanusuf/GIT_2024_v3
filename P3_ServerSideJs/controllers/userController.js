const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (username === "" || email === "" || password === "") {
      return res.render("register", {
        errorMessage: "All credentials required!",
      });
    }

    const findUser = await User.findOne({ email }); // db query which finds user in data base

    if (findUser) {
      return res.render("register", { errorMessage: "User Already Exists" });
    }
    const encryptPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      email: email,
      password: encryptPass,
    });

    if (newUser) {
      // return res.render("register" , {successMessage : "user created Succesfully"})
      return res.redirect("/login");
    } else {
      return res.render("register", { errorMessage: "Some Error!" });
    }
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "" || password === "") {
      return res.render("login", { errorMessage: "All credentials required!" });
    }

    const finduser = await User.findOne({ email });

    if (!finduser) {
      return res.render("login", { errorMessage: "User Not Found!" });
    }

    const comparePass = await bcrypt.compare(password, finduser.password);

    if (comparePass) {
      // you have to create a token // jwt token

      const payload = finduser._id; // user id
      const secretKey = "thisislekjgoimsecretKey"; // digital signtaure
      const token = jwt.sign({ payload }, secretKey); // identity card

      res.cookie("authTokenBlogs", token, {
        maxAge: 30* 24 * 60 * 60 * 1000,    // 30 days
      });

      // return res.render("login" , {successMessage : "Logged in succesfully"})     OR
      return res.redirect("/user/profile");

      // setTimeout(() => {
      //  return res.redirect("/userProfile")
      // }, 3000);
    } else {
      return res.render("login", { errorMessage: "Password incorrect!" });
    }
  } catch (error) {
    console.log(error);
  }
};



module.exports = { registerController, loginController,  };
