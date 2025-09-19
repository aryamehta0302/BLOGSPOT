const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./Routes/api/users');

const app = express();
const port = 3000;

// Connect to the database
connectDB();    

// Enable CORS for frontend (adjust origin as needed)
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes 
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});