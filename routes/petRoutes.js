const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

/**
 * @swagger
 * tags:
 *   - name: Pets
 *     description: Pet management
 */

/**
 * @swagger
 * /api/v1/pets:
 *   get:
 *     summary: Get all pets
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: List of all pets
 */
router.get('/', petController.getAllPets);

/**
 * @swagger
 * /api/v1/pets/search:
 *   get:
 *     summary: Search pets by name, species, or breed
 *     tags: [Pets]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search keyword
 *     responses:
 *       200:
 *         description: Matching pets
 */
router.get('/search', petController.searchPets);

/**
 * @swagger
 * /api/v1/pets:
 *   post:
 *     summary: Create a new pet
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               species: { type: string }
 *               breed: { type: string }
 *               age: { type: number }
 *               gender: { type: string }
 *               status: { type: string }
 *               description: { type: string }
 *     responses:
 *       201:
 *         description: Pet created
 */
router.post('/', petController.createPet);

/**
 * @swagger
 * /api/v1/pets/{id}:
 *   get:
 *     summary: Get a pet by ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet data
 */
router.get('/:id', petController.getPetById);

/**
 * @swagger
 * /api/v1/pets/{id}:
 *   put:
 *     summary: Update a pet
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Pet updated
 */
router.put('/:id', petController.updatePet);

/**
 * @swagger
 * /api/v1/pets/{id}:
 *   patch:
 *     summary: Partial update a pet
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Pet partially updated
 */
router.patch('/:id', petController.updatePetPartial);

/**
 * @swagger
 * /api/v1/pets/{id}:
 *   delete:
 *     summary: Delete a pet
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pet deleted
 */
router.delete('/:id', petController.deletePet);

module.exports = router;
