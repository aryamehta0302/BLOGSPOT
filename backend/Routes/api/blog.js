const express = require('express');
const router = express.Router();
const Blog = require('../../modules/Blog');

// test route
// get all blog posts
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// test route
// create a new blog post
router.post('/create', async (req, res) => {
    const { userid, title, subtitle, titleImage, body } = req.body;
    try {
        const newBlog = new Blog({ userid, title, subtitle, titleImage, body });
        await newBlog.save();
        res.json('Blog Created Successfully!');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;