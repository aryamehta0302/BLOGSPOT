const express = require('express');
const router = express.Router();
const User = require('../../modules/User');
const jwt = require('jsonwebtoken');
const { upload } = require('../../config/upload');
const path = require('path');

// JWT Secret (in production, use environment variable)
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

// Get all users (for testing)
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password, gender } = req.body;
    
    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        
        // Validate email domain
        if (!email.endsWith('@gmail.com')) {
            return res.status(400).json({ message: 'Email must be a valid @gmail.com address' });
        }
        
        // Validate required fields
        if (!name || !email || !password || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        
        // Create new user
        user = new User({ name, email, password, gender });
        await user.save();
        
        // Create JWT token
        const payload = {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                gender: user.gender
            }
        };
        
        jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ 
                message: 'User registered successfully', 
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    gender: user.gender
                }
            });
        });
        
    } catch (err) {
        console.error(err.message);
        if (err.code === 11000) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        // Create JWT token
        const payload = {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                gender: user.gender
            }
        };
        
        jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
            if (err) throw err;
            res.json({ 
                message: 'Login successful', 
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    gender: user.gender
                }
            });
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get user profile (protected route)
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Upload profile image (protected route)
router.post('/upload-profile-image', authenticateToken, upload.single('profileImage'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        // Create the URL path for the uploaded image
        const imageUrl = `/uploads/profiles/${req.file.filename}`;

        // Update user with new profile image URL
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profileImage: imageUrl }, // Local file path
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'Profile image uploaded successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                gender: user.gender,
                profileImage: user.profileImage,
                bio: user.bio
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error during image upload' });
    }
});

// Update user profile (protected route)
router.put('/profile', authenticateToken, async (req, res) => {
    try {
        const { name, bio } = req.body;
        
        // Build update object
        const updateFields = {};
        if (name) updateFields.name = name;
        if (bio !== undefined) updateFields.bio = bio; // Allow empty string
        
        const user = await User.findByIdAndUpdate(
            req.user.id,
            updateFields,
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                gender: user.gender,
                profileImage: user.profileImage,
                bio: user.bio
            }
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get current user's blogs (protected route)
router.get('/my-blogs', authenticateToken, async (req, res) => {
    try {
        const Blog = require('../../modules/Blog');
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