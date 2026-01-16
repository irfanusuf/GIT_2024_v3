const mongoose = require('mongoose')


const Userschema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    posts: [{ postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' } }],
    followers: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
    following: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
    profilePic: { type: String },
    bio: { type: String },
    stories: [
        {
            storyUrl: { type: String, required: true },
            timeCreated: { type: Date, default: Date.now },
            expire: { type: Date, default: () => new Date(Date.now() + 86400000) }
        }
    ],
    likesGiven: [{ postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' } }],
    comments: [{ postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, commentId: { type: mongoose.Schema.Types.ObjectId } }],
    isReported: {
        reasonResult: { type: Boolean, default: false },
        reason: [{ reportText: String }],
        banned: { type: Boolean, default: false }
    }
}, { timestamps: true })


const User = mongoose.model('User', Userschema)
module.exports = { User }