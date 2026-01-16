const jwt = require("jsonwebtoken")
require('dotenv').config()



const isAuth = (req, res, next) => {

    try {


        const token = req.cookies.authToken   // query paramter ?token=  // param /:token

        // console.log("token" , token)

        if (token === undefined || token === null) {
            return res.status(401).json({ message: "UnAuthorised Kindly Login again !" })
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)

        if (verifyToken) {

            req.user = verifyToken    // verifytoken details are saved in req.user object then the next() is called

            next()
        } else {

            return res.status(403).json({ message: "Forbidden to access !" })
        }


    } catch (error) {
        console.log(error)
        // return res.status(500).json({ message: "Internal server Error !" })
    }

}


module.exports = isAuth