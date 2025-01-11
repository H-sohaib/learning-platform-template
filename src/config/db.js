// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Pour centraliser la configuration et la gestion des connexions aux bases de données
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : En exportant une fonction close() qui ferme les connexions et en l'appelant dans le code principal

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    mongoClient = new MongoClient(config.mongodb.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });

    await mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries

  try {
    redisClient = redis.createClient({
      url: config.redis.uri
    });

    redisClient.on('error', (error) => {
      console.error('Redis error:', error);
    });

    await redisClient.connect();
    console.log('Redis connected');
  } catch (error) {
    console.error('Redis connection error:', error);
    throw error;
  }
}

async function close() {
  if (mongoClient) await mongoClient.close();
  if (redisClient) await redisClient.quit();
  console.log('Connections closed');
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  close,
  getDb: () => db,
  getRedisClient: () => redisClient
};