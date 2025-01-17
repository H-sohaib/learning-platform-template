// Question: Comment organiser le point d'entrée de l'application ?
// Réponse : En regroupant les routes, les middlewares et les configurations dans un seul fichier
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
// Réponse : En utilisant des fonctions asynchrones pour initialiser les connexions et les configurations


const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
// const studentRoutes = require('./routes/studentRoutes');

const app = express();

async function startServer() {
  try {
    // TODO: Initialiser les connexions aux bases de données
    await db.connectMongo();
    await db.connectRedis();
    // TODO: Configurer les middlewares Express
    app.use(express.json());
    // TODO: Monter les routes
    app.use('/api/courses', courseRoutes);
    // TODO: Démarrer le serveur
    app.listen(config.port, () => {
      console.log(`Server started on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // TODO: Implémenter la fermeture propre des connexions
  await db.close();
  console.log('Shutting down server');
  process.exit(0);
});

startServer();

module.exports = app;