

const nodeMailer = require("nodemailer")

require('dotenv').config()    // not required ! 



// console.log(process.env.SMTP_HOST)
// console.log(process.env.SMTP_PORT)
// console.log(process.env.SMTP_USER)
// console.log(process.env.SMTP_PASS)



const transporter = nodeMailer.createTransport({
    host : process.env.SMTP_HOST,
    port : 587,
    secure : false , //true of only 465
    auth : {
        user: process.env.SMTP_USER ,
        pass : process.env.SMTP_PASS     // app password you google password jo ap use kerna chahty mail send kernay kayliye 
    }
})



module.exports = {transporter}


