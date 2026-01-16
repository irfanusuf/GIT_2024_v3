const multer  = require('multer')



const upload = multer({ 
    dest: 'uploads/', 
    limits : 10 * 1024 *1024     // max file size = 10MB
})    


// media files after uploads will be saved in upload folder  only if they are blob  // access req.file.path
// base 64 url then it will not be saved in uploads folder 
// u can access the streamed data in req.body

const multMid = upload.single("postImage")

const uploadProfileMidWare = upload.single("profilepic")




module.exports = {multMid , uploadProfileMidWare}