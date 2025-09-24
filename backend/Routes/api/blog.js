const express = require('express');
const router = express.Router();
const Blog = require('../../modules/Blog');
const jwt = require('jsonwebtoken');

// JWT Secret (should match users.js)
const JWT_SECRET = 'your-secret-key';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = decoded.user;
        next();
    });
};

// Get all blog posts with user information
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate('userid', 'name email gender profileImage')
            .sort({ date: -1 });
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get a single blog post by ID with user information
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('userid', 'name email gender profileImage');
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(500).send('Server Error');
    }
});

// Get blogs by specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const blogs = await Blog.find({ userid: req.params.userId })
            .populate('userid', 'name email gender profileImage')
            .sort({ date: -1 });
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create a new blog post (protected route)
router.post('/create', authenticateToken, async (req, res) => {
    const { title, subtitle, titleImage, body } = req.body;
    
    try {
        // Validate required fields
        if (!title || !body) {
            return res.status(400).json({ message: 'Title and body are required' });
        }
        
        const newBlog = new Blog({
            userid: req.user.id, // Connect blog to authenticated user
            title,
            subtitle,
            titleImage,
            body
        });
        
        await newBlog.save();
        
        // Populate user info for response
        const populatedBlog = await Blog.findById(newBlog._id)
            .populate('userid', 'name email gender profileImage');
            
        res.status(201).json({
            message: 'Blog created successfully!',
            blog: populatedBlog
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get current user's blogs (protected route)
router.get('/my/blogs', authenticateToken, async (req, res) => {
    try {
        const blogs = await Blog.find({ userid: req.user.id })
            .populate('userid', 'name email gender profileImage')
            .sort({ date: -1 });
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;