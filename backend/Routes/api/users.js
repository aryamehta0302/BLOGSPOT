const express = require('express');
const router = express.Router();
const User = require('../../modules/User');
const jwt = require('jsonwebtoken');
const config = require('config');


// test route 
// get user details
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// test route 
// create a new user
router.post('/create', async (req, res) => {
    const { name, email, password, gender } = req.body;
    try {
        const newUser = new User({ name, email, password, gender });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;