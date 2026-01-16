const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    postPicUrl: { type: String },
    postCaption: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],


    comments: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            text: { type: String },
            isReported: { type: Boolean, default: false },
            isEdited: { type: Boolean, default: false },
            replies: [
                {
                    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
                    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                    text: { type: String },
                    isReported: { type: Boolean, default: false },
                    isEdited: { type: Boolean, default: false }
                }
            ]
        }
    ],



    
    shareCount: { type: Number, default: 0 },
    reports: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, reportText: String, createdAt: Date }]
}, { timestamps: true })


const Post = mongoose.model('Post', schema)
module.exports = { Post }