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

    // Cache the newly created course in Redis
    await redisService.cacheData(result.insertedId.toString(), JSON.stringify(course))

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
  console.log(`getCourse called with courseId: ${courseId}`);

  try {
    // Check if the course is in Redis
    const cachedCourse = await redisService.getCachedData(courseId)

    console.log("cached : ", cachedCourse);

    if (cachedCourse) {
      return res.status(200).json(cachedCourse);
    }

    // get the course from MongoDB if not
    const courseObjectId = new ObjectId(courseId);
    const course = await db.getDb().collection('courses').findOne({ _id: courseObjectId })
    console.log("Mongo Course : ", course);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await redisService.cacheData(courseId, JSON.stringify(course))
    return res.status(200).json(course);

  } catch (error) {
    console.error('Error getting course:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCourseStats(req, res) {
  // TODO: Implement course statistics retrieval
  try {
    const mongodb = db.getDb();

    const totalCourses = await mongodb.collection('courses').countDocuments();

    const averageDuration = await mongodb.collection('courses').aggregate([
      { $group: { _id: null, avgDuration: { $avg: "$duration" } } }
    ]).toArray();

    const totalRevenue = await mongodb.collection('courses').aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$price" } } }
    ]).toArray();

    // Number of courses by instructor
    const coursesByInstructor = await mongodb.collection('courses').aggregate([
      { $group: { _id: "$instructor", count: { $sum: 1 } } }
    ]).toArray();

    // Number of courses by topic
    const coursesByTopic = await mongodb.collection('courses').aggregate([
      { $unwind: "$topics" },
      { $group: { _id: "$topics", count: { $sum: 1 } } }
    ]).toArray();

    res.status(200).json({
      totalCourses,
      averageDuration: averageDuration[0]?.avgDuration || 0,
      totalRevenue: totalRevenue[0]?.totalRevenue || 0,
      coursesByInstructor,
      coursesByTopic
    });
  } catch (error) {
    console.error('Error getting course statistics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  createCourse,
  getCourse,
  getCourseStats
};