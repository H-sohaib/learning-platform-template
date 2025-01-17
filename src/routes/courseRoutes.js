// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse :  Pour organiser le code de manière modulaire et maintenable
// Question : Comment organiser les routes de manière cohérente ?
// Réponse:  En regroupant les routes par fonctionnalité ou par ressource

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Define the route for GET /api/courses/
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Courses endpoint' });
});


// Routes pour les cours
// router.post('/', courseController.createCourse);
router.get('/:id', courseController.getCourse);
router.post('/create', courseController.createCourse);
router.get('/stats', courseController.getCourseStats);

module.exports = router;