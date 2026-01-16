// const { uploadToCloudinary } = require("../config/cloudinary")
// const { Post } = require("../models/post")


// const createPost = async (req, res) => {

//     try {
//         const { postCaption } = req.body

//         const file = req.file.path    // problem hai because multer ko config kiye bager nahi chalehga 

//         let { userId } = req.user

//         const postPicUrl = await uploadToCloudinary(file)

//         const newPost = await new Post({ userId, postCaption, postPicUrl })    // post will be created in context 

//         await newPost.save()     // save will execute the query on mongo server

//         //const newpost = await Post.create({postCaption})    // directly executes on mongo  serrver 

//         return res.status(201).json({ message: "Post created Succesfully !" })


//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "Internal server Error !" })
//     }

// }

// const likePost = async (req, res) => {
//     try {
//         // const postId = req.query.postId  
//         const { postId } = req.query
//         const { userId } = req.user

//         let post = await Post.findById(postId)

//         if (post === null) {

//             return res.status(404).json({ message: "Post not Found!" })
//         }

//         const alreadyLiked = post.likes.includes(userId)

//         if (alreadyLiked) {
//             // remove Like 
//             const findIndex = post.likes.indexof(userId)    // 13 
//             post.likes.splice(findIndex, 1)

//             return res.json({ message: "already liked the post !" })

//         } else {

//             post.likes.push(userId)

//             await post.save()

//             return res.json({ message: "Post Liked Succesfully !" })
//         }



//     } catch (error) {
//         console.log(error)
//     }
// }

// const commentOnPost = async (req, res) => {
//     try {
//         const { postId } = req.query
//         const { userId } = req.user
//         const { text } = req.body

//         let post = await Post.findById(postId)

//         const commentOBJ = {
//             text: text,
//             userId: userId
//         }
//         post.comments.push(commentOBJ)

//         await post.save()
//         return res.json({ message: "Comment SuccessFull !" })
//     } catch (error) {
//         console.log(error)
//     }
// }

// module.exports = { createPost, likePost, commentOnPost }



const mongoose = require("mongoose");
const { Post } = require("../models/post");
const { User } = require("../models/user");
const { uploadToCloudinary } = require("../config/cloudinary");


// -------------------------------------------------------------
// 1. CREATE POST
// -------------------------------------------------------------
exports.createPost = async (req, res) => {
  try {

    const userId = req.user.userId;
    const { postCaption, imageFile } = req.body;

    let secure_url


    if (imageFile !== null) {

      // console.log("the image file is " ,  imageFile)
      secure_url = await uploadToCloudinary(imageFile)
    }


    const post = await Post.create({
      postPicUrl: secure_url,
      postCaption,
      userId
    });



    await User.findByIdAndUpdate(userId, {
      $push: { posts: { postId: post._id } }
    });

   return res.json({ success: true, payload :  post });

  } catch (err) {
    console.log(err)
   return res.status(500).json({ message: "Internal Server Error" });
    
  }
};

// -------------------------------------------------------------
// 1. FETCH POSTS
// -------------------------------------------------------------

exports.fetchUserposts = async (req,res) =>{

  try {
    const {userId} = req.params

    const posts = await Post.find({ userId }).populate("userId" , "username").populate('comments.userId', 'username profilePic');

    if(posts.length > 0){
      return res.json({success : true , payload : posts})
    }

    else{
      return res.json({success : false})
    }


  } catch (error) {
    console.log(error)
  }

}


exports.fetchExploreposts = async (req,res) =>{

  try {
    

    const posts = await Post.find().populate("userId" , "username profilePic").populate('comments.userId', 'username profilePic');

    if(posts.length > 0){
      return res.json({success : true , payload : posts})
    }

    else{
      return res.json({success : false})
    }


  } catch (error) {
    console.log(error)
  }

}
// -------------------------------------------------------------
// 2. LIKE POST
// -------------------------------------------------------------
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.find(l => l.userId.toString() === userId);
    if (alreadyLiked) {
      return res.status(400).json({ message: "Already liked" });
    }

    post.likes.push({ userId });
    await post.save();

    await User.findByIdAndUpdate(userId, {
      $push: { likesGiven: { postId } }
    });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// -------------------------------------------------------------
// 3. COMMENT ON POST
// -------------------------------------------------------------
exports.commentOnPost = async (req, res) => {
  try {

    const {postId} = req.params
    
    const {  text } = req.body;

    const userId = req.user.userId;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = {
      _id: new mongoose.Types.ObjectId(),
      userId,
      text
    };

    post.comments.push(comment);
    await post.save();

    await User.findByIdAndUpdate(userId, {
      $push: { comments: { postId, commentId: comment._id } }
    });

    res.json({ success: true, comment });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// -------------------------------------------------------------
// 4. REPLY ON COMMENT
// -------------------------------------------------------------
exports.replyOnComment = async (req, res) => {
  try {
    const {postId , commentId} = req.params
    
    const {  text } = req.body;

    const userId = req.user.userId;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const reply = {
      _id: new mongoose.Types.ObjectId(),
      userId,
      text
    };

    comment.replies.push(reply);
    await post.save();

    res.json({ success: true, reply });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// -------------------------------------------------------------
// 5. EDIT COMMENT
// -------------------------------------------------------------
exports.editComment = async (req, res) => {
  try {
    const { postId, commentId, newText } = req.body;
    const userId = req.user.userId;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== userId)
      return res.status(403).json({ message: "Not allowed" });

    comment.text = newText;
    comment.isEdited = true;

    await post.save();

    res.json({ success: true, comment });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 

// -------------------------------------------------------------
// 6. REPORT COMMENT
// -------------------------------------------------------------
exports.reportComment = async (req, res) => {
  try {
    const { postId, commentId, reportText } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.isReported = true;
    comment.reportText = reportText;

    await post.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// -------------------------------------------------------------
// 7. REPORT POST
// -------------------------------------------------------------
exports.reportPost = async (req, res) => {
  try {
    const { postId, reportText } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.isReported = true;
    post.reportReason = reportText;

    await post.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// -------------------------------------------------------------
// 8. REPORT USER
// -------------------------------------------------------------
exports.reportUser = async (req, res) => {
  try {
    const { userId, reportText } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isReported.reasonResult = true;
    user.isReported.reason.push({ reportText });

    await user.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// -------------------------------------------------------------
// 9. UPLOAD STORY (single story)
// -------------------------------------------------------------
exports.uploadStory = async (req, res) => {
  try {
    const userId = req.user.userId;

    await User.findByIdAndUpdate(userId, {
      $push: {
        stories: {
          storyUrl: req.file?.path
        }
      }
    });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// -------------------------------------------------------------
// 10. UPLOAD MULTIPLE STORIES
// -------------------------------------------------------------
exports.uploadMultipleStories = async (req, res) => {
  try {
    const userId = req.user.userId;

    const storyArray = req.files?.map(f => ({
      storyUrl: f.path
    })) || [];

    await User.findByIdAndUpdate(userId, {
      $push: { stories: { $each: storyArray } }
    });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
