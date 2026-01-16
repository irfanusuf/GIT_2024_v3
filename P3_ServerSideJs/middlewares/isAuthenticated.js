const jwt = require("jsonwebtoken")


const isAuthenticated = async (req, res, next) => {
  try {
    const { authTokenBlogs } = req.cookies;

    if (authTokenBlogs === undefined) {
      return res
        .status(401)
        .render("login", {
          errorMessage: "Your are not authorized to view this page, Kindly Login First!  ",
        }); // unAuthenticated
    }
    const secretKey = "thisislekjgoimsecretKey"; // digital signtaure

    jwt.verify(authTokenBlogs, secretKey, (reject, resolve) => {
      if (reject) {
        return res
          .status(403)
          .render("error", { error: "Un-Authorized to view this page " });
      }
      req.userId = resolve.payload
      return next();
    });
  } catch (error) {
    res.render("error", { error: error.message });
    console.log(error);
  }
};



module.exports = {isAuthenticated}