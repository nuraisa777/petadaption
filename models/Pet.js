const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    species: { 
        type: String, 
        required: true, 
        enum: ['Dog','Cat','Rabbit','Bird','Other'], 
        trim: true 
    },
    breed: { type: String, required: true, trim: true },
    age: { 
        type: Number, 
        required: true, 
        min: 0, 
        validate: { 
            validator: Number.isInteger, 
            message: '{VALUE} is not an integer' 
        } 
    },
    gender: { type: String, required: true, enum: ['Male','Female','Unknown'], trim: true },
    status: { 
        type: String, 
        default: 'Available', 
        enum: ['Available','Adopted','Pending'], 
        trim: true 
    },
    description: { type: String, default: '', trim: true },
    // Field added to store the URL of an online picture
    pictureUrl: { 
        type: String, 
        required: false,
        trim: true 
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pet', petSchema);