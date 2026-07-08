import app from './app';
import { connectDatabase } from './config/database';

const port = Number(process.env.PORT || 5001);

const startServer = async () => {
  try {
    console.log('[Server] Starting StorySpark API server...');
    await connectDatabase();
    console.log('[Server] Database connected successfully');

    app.listen(port, () => {
      console.log(`[Server] StorySpark API listening on port ${port}`);
      console.log(`[Server] Ready to accept requests at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('[Server] Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
