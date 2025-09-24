const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String, 
        required: true,
        trim: true
    },
    subtitle: {
        type: String,
        required: false,
        trim: true
    },
    titleImage: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;