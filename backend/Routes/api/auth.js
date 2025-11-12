const express = require('express');

const router = express.Router();
const User = require('../../modules/User');

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'No User Found!' });
        }

        console.log(user);
        
        // Use bcrypt to compare password with hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong Password!' });
        }

        res.json({ id: user.id });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;