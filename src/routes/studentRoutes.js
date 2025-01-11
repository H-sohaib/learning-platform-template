const express = require('express');
const router = express.Router();
const courseController = require('../controllers/studentController');

// Routes pour les cours
router.post('/', courseController.createCourse);
router.get('/:id', courseController.getCourse);
router.get('/stats', courseController.getCourseStats);

module.exports = router;