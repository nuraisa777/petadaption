// models/Pet.js
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, enum: ['dog', 'cat', 'rabbit', 'other'], required: true },
    breed: String,
    age: Number,
    gender: String,
    status: { type: String, default: 'Available', enum: ['Available', 'Pending', 'Adopted'] },
    shelter: { type: mongoose.Schema.Types.ObjectId, ref: 'Shelter' } // Link to a Shelter model
});

module.exports = mongoose.model('Pet', petSchema);