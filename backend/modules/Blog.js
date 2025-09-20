const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    userid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    title: {
        type: String, 
        required: true
    },

    subtitle: {
        type: String,
        required: false
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
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;