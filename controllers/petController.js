
const Pet = require('../models/Pet');

exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.createPet = async (req, res) => {
    const pet = new Pet(req.body);
    try {
        const newPet = await pet.save();
        res.status(201).json(newPet); 
    } catch (err) {
        res.status(400).json({ message: err.message }); 
    }
};


exports.updatePet = async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } 
        );
        if (!updatedPet) return res.status(404).json({ message: 'Pet not found' });
        res.json(updatedPet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.deletePet = async (req, res) => {
    try {
        const deletedPet = await Pet.findByIdAndDelete(req.params.id);
        if (!deletedPet) return res.status(404).json({ message: 'Pet not found' });
        res.json({ message: 'Pet successfully deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Pet not found' });
        res.json(pet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};