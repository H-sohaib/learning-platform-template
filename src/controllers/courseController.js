// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:  Un contrôleur contient la logique métier tandis qu'une route gère les requêtes HTTP
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Pour rendre le code plus modulaire et réutilisable

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
  try {
    console.log(req.body);

    const { title, description, duration, price, instructor, topics } = req.body;

    if (!title || !duration || !price) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }

    const course = {
      title,
      description,
      duration,
      price,
      instructor,
      topics: topics || [],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const mongodb = db.getDb();
    const result = await mongodb.collection('courses').insertOne(course);

    res.status(201).json({
      _id: result.insertedId,
      ...course
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      error: 'Failed to create course'
    });
  }
}

async function getCourse(req, res) {
  const courseId = req.params.id;
  const redisClient = db.getRedisClient();

  try {
    // Check if the course is in Redis
    const cachedCourse = await redisClient.get(courseId);
    if (cachedCourse) {
      return res.status(200).json(JSON.parse(cachedCourse));
    }
  } catch (error) {

  }

  return res.status(200).json({
    message: 'Get course'
  });
}

async function getCourseStats(req, res) {
}


// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  createCourse,
  getCourse,
  getCourseStats
};