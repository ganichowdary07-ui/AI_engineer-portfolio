import { app } from './app.js';
import { checkDatabaseConnection, prisma } from './config/db.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  console.log(`====================================================`);
  console.log(`🚀 Portfolio Backend Server running on port ${PORT}`);
  console.log(`📡 Base URL: http://localhost:${PORT}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);

  const dbConnected = await checkDatabaseConnection();
  if (dbConnected) {
    console.log(`✅ Connected successfully to MySQL database via Prisma!`);
  } else {
    console.warn(`⚠️ MySQL Database is not connected yet.`);
    console.warn(`👉 Please verify your DATABASE_URL in backend/.env`);
    console.warn(`👉 For MySQL Workbench setup, see backend/README.md`);
  }
});

// Graceful Shutdown
async function handleShutdown(signal: string) {
  console.log(`\nReceived ${signal}. Gracefully shutting down...`);
  server.close(async () => {
    try {
      await prisma.$disconnect();
      console.log('Prisma disconnected.');
      process.exit(0);
    } catch (err) {
      console.error('Error during shutdown:', err);
      process.exit(1);
    }
  });
}

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));
