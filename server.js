// server.js
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
// Assuming you have a petRoutes.js file created
const petRoutes = require('./routes/petRoutes'); 

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json()); 

// Database Connection
// You MUST have your correct MONGO_URI in your .env file for this to work
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('DB Connection Error:', err));

// Routes setup
app.use('/api/v1/pets', petRoutes);

// Basic home route
app.get('/', (req, res) => {
    res.send('Welcome to the Pet Adoption API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});