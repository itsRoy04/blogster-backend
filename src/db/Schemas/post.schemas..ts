import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    metadata: {
        seoTitle: String,
        seoDescription: String,
        seoKeywords: [String],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model('Post', postSchema);


export default Post;