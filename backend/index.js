const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./Routes/api/users');
const blogRoutes = require('./Routes/api/blog');


const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors());

// Connect to the database
connectDB();    

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes 
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});