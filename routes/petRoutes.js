// routes/petRoutes.js
const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController'); // Will be created in next step

// Map your designed endpoints to controller functions
router.get('/', petController.getAllPets); // GET /api/v1/pets
router.post('/', petController.createPet); // POST /api/v1/pets
router.get('/:id', petController.getPetById); // GET /api/v1/pets/{petId}
router.put('/:id', petController.updatePet); // PUT /api/v1/pets/{petId}
router.delete('/:id', petController.deletePet); // DELETE /api/v1/pets/{petId}
// Add other routes like /search here...

module.exports = router;