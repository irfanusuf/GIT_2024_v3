
const { User } = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { transporter } = require("../config/nodemailer")
const { uploadToCloudinary } = require("../config/cloudinary")
require('dotenv').config()


exports.register = async (req, res) => {

    try {

        const { email, username, password } = req.body



        if (email === "" || password === "" || username === "") {

            return res.status(400).json({ message: "All user details are required !" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "user already exists" })
        }

        const encryptPass = await bcrypt.hash(password, 10)

        const profilepic = req.file && req.file.path
        let secureProfilePicUrl

        if (profilepic !== undefined) {
            console.log("uploading......")
            secureProfilePicUrl = await uploadToCloudinary(profilepic, "Devs-Outreach-ProfilePics")
        }

        const newUser = await User.create({ email, username, password: encryptPass, profilePic: secureProfilePicUrl || "" })

        const payload = {
            userId: newUser._id,
            username: newUser.username
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 7 * 24 * 60 * 60 * 1000
        })

        const cookieOptions = {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
            httpOnly: true, // prevent access from JS
            secure: process.env.NODE_ENV === 'production', // required for SameSite=None
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // allow cross-site in production
        }

        // // Optionally set a specific domain for production (e.g. ".example.com")
        // if (process.env.NODE_ENV === 'production' && process.env.COOKIE_DOMAIN) {
        //     cookieOptions.domain = process.env.COOKIE_DOMAIN
        // }

        res.cookie("authToken", token, cookieOptions)

        res.json({
            success: true,
            message: "New User created Succesfully !",
            payload: newUser.username
        })


        const mailOptions = {

            from: process.env.SMTP_USER,
            to: email,
            subject: "Registration Succesfull",
            html: "<h2> Welcome to the devsOutreach we are very happy that u joined our platform</h2>"
        }

        await transporter.sendMail(mailOptions)


        // if (sendMail.rejected) {
        //     console.log(sendMail)    
        // }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server  Error" })
    }
}


exports.login = async (req, res) => {

    try {

        const { email, password } = req.body

        if (email === "" || password === "") {
            return res.status(400).json({ message: "Email and pass both are required !" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser === null) {
            return res.status(404).json({ message: "No User Found !" })
        }
        const verifyPass = await bcrypt.compare(password, existingUser.password)

        const payload = {
            userId: existingUser._id,
            username: existingUser.username
        }


        if (verifyPass) {
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: 7 * 24 * 60 * 60 * 1000
            })

            const cookieOptions = {
                maxAge: 7 * 24 * 60 * 60 * 1000, 
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', 
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' 
            }

            res.cookie("authToken", token, cookieOptions)

            return res.json({
                success: true,
                message: "Logged in succesfully !",
                payload: existingUser.username
            })
        } else {
            return res.status(400).json({ message: "Password incorrect !" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server Error" })
    }



}


exports.verifyUser = async (req, res) => {
    try {

        const userId = req.user.userId;

        let user = await User.findById(userId)    // userId objectID

        if (user === null) {
            return res.status(404).json({ success: false })
        } else {
            return res.status(200).json({ success: true, message: "User Verified", payload: user._id })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server Error !" })
    }

}


exports.userDetails = async (req, res) => {
    try {
        const { username } = req.params
        let user = await User.findOne({ username })    // userId objectID    log n        // findById log 0 
        if (user !== null) {
            return res.status(200).json({ success: true, payload: user })
        } else {
            return res.status(404).json({ message: "User Not Found !" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server Error !" })
    }
}


exports.updateUser = async (req, res) => {
    try {
        const updates = req.body
        const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password')
        res.json(user)
    } catch (err) { res.status(500).json({ message: 'server error' }) }
}


exports.updateBio = async (req, res) => {
    try {
        const { bio } = req.body
        const user = await User.findByIdAndUpdate(req.user._id, { bio }, { new: true }).select('-password')
        res.json(user)
    } catch (err) { res.status(500).json({ message: 'server error' }) }
}


exports.uploadProfile = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'no file' })
        const url = `/uploads/${req.file.filename}`
        const user = await User.findByIdAndUpdate(req.user._id, { profilePic: url }, { new: true }).select('-password')
        res.json(user)
    } catch (err) { res.status(500).json({ message: 'server error' }) }
}


exports.followUser = async (req, res) => {
    try {
        const targetId = req.params.targetId
        if (req.user._id.equals(targetId)) return res.status(400).json({ message: 'cannot follow self' })
        const target = await User.findById(targetId)
        if (!target) return res.status(404).json({ message: 'target not found' })
        // add follower to target
        if (!target.followers.some(f => f.userId.equals(req.user._id))) {
            target.followers.push({ userId: req.user._id })
            await target.save()
        }
        // add following to current user
        const me = await User.findById(req.user._id)
        if (!me.following.some(f => f.userId.equals(target._id))) {
            me.following.push({ userId: target._id })
            await me.save()
        }
        res.json({ message: 'followed' })
    } catch (err) { console.error(err); res.status(500).json({ message: 'server error' }) }
}


exports.unfollowUser = async (req, res) => {
    try {
        const targetId = req.params.targetId
        const target = await User.findById(targetId)
        if (!target) return res.status(404).json({ message: 'target not found' })
        target.followers = target.followers.filter(f => !f.userId.equals(req.user._id))
        await target.save()
        const me = await User.findById(req.user._id)
        me.following = me.following.filter(f => !f.userId.equals(target._id))
        await me.save()
        res.json({ message: 'unfollowed' })
    } catch (err) { console.error(err); res.status(500).json({ message: 'server error' }) }
}


