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
    categories: {
        type: [String], // An array of strings
        required: true,
    },
    tags: {
        type: [String], // An array of strings
    },
    featured: {
        type: Boolean,
        default: false,
    },
    draft: {
        type: Boolean,
        default: false,
    },
    metadata: {
        seoTitle: {
            type: String,
        },
        seoDescription: {
            type: String,
        },
        seoKeywords: {
            type: [String], // An array of strings
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
