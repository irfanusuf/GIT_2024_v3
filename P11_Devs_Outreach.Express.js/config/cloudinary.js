


const cloudinary = require("cloudinary").v2;
require('dotenv').config()



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});



const uploadToCloudinary = async (file , folderName) => {

    try {
        if(!file) return
        const uploadToCloud = await cloudinary.uploader.upload(file, {
            folder: folderName
        })
        const secureUrl = uploadToCloud.secure_url
        return secureUrl

    } catch (error) {
        console.log("Cloudinary Error " , error)
    }

}





module.exports = { uploadToCloudinary}