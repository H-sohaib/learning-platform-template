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
}

// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
};