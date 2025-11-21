const Pet = require('../models/Pet');


const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
};


// GET all pets
exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find({});
        res.status(200).json(pets);
    } catch (error) {
        handleError(res, error);
    }
};


// GET pet by ID
exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Pet not found' });
        res.status(200).json(pet);
    } catch (error) {
        handleError(res, error);
    }
};


// POST create new pet
exports.createPet = async (req, res) => {
    try {
        const pet = await new Pet(req.body).save();
        res.status(201).json(pet);
    } catch (error) {
        handleError(res, error);
    }
};


// PUT full update pet
exports.updatePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!pet) return res.status(404).json({ message: 'Pet not found' });
        res.status(200).json(pet);
    } catch (error) {
        handleError(res, error);
    }
};


// PATCH partial update pet
exports.updatePetPartial = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!pet) return res.status(404).json({ message: 'Pet not found' });
        res.status(200).json(pet);
    } catch (error) {
        handleError(res, error);
    }
};


// DELETE pet
exports.deletePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Pet not found' });
        res.status(204).send();
    } catch (error) {
        handleError(res, error);
    }
};


// GET search pets by query
exports.searchPets = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ message: 'Search query (q) is required.' });


        const searchRegex = new RegExp(q, 'i');
        const pets = await Pet.find({
            $or: [
                { name: searchRegex },
                { species: searchRegex },
                { breed: searchRegex }
            ]
        });


        res.status(200).json(pets);
    } catch (error) {
        handleError(res, error);
    }
};


