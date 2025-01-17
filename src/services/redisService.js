// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : En utilisant des clés uniques et des stratégies de cache appropriées
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utiliser des préfixes pour distinguer les différentes catégories de clés
const db = require('../config/db');
// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl = 3600) { // Default TTL of 1 hour
  const redisClient = db.getRedisClient();
  try {
    await redisClient.set(key, JSON.stringify(data), 'EX', ttl);
  } catch (error) {
    console.error('Error caching data:', error);
  }
}

async function getCachedData(key) {
  const redisClient = db.getRedisClient();
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting cached data:', error);
    return null;
  }
}

module.exports = {
  cacheData,
  getCachedData
};