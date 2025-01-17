// Question: Pourquoi créer des services séparés ?
// Réponse:  Pour réutiliser la logique métier dans différents contrôleurs

const { ObjectId } = require('mongodb');
const db = require('../config/db');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  try {
    const mongodb = db.getDb();
    const objectId = new ObjectId(id);
    const document = await mongodb.collection(collection).findOne({ _id: objectId });
    return document;
  } catch (error) {
    console.error(`Error finding document by ID in collection ${collection}:`, error);
    throw error;
  }
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById
};