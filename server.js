
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');

const petRoutes = require('./routes/petRoutes'); 

const app = express();


app.use(express.json()); 


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('DB Connection Error:', err));


app.use('/api/v1/pets', petRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the Pet Adoption API!');
});

//Hey! This is my first comment 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
