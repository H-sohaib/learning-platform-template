// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse :  Il est important de valider les variables d'environnement au démarrage pour s'assurer que le programme ne fonctionne pas avec des valeurs incorrectes ou manquantes. Cela permet d'éviter des erreurs inattendues et de garantir que le programme fonctionne correctement avec les valeurs attendues.
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse :  Si une variable requise est manquante, le programme peut ne pas fonctionner correctement ou lever des erreurs inattendues. Il est donc important de valider les variables d'environnement au démarrage pour s'assurer que toutes les variables requises sont définies.  

const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  // TODO: Implémenter la validation
  let missing = requiredEnvVars.filter((envVar) => {
    return !(envVar in process.env);
  });

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};