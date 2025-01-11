// Question: Pourquoi créer des services séparés ?
// Réponse:  Pour réutiliser la logique métier dans différents contrôleurs

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
};