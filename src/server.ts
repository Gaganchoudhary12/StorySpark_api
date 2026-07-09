import app from './app';
import { connectDatabase } from './config/database';

const port = Number(process.env.PORT || 5001);

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(port);
  } catch (error) {
    console.error('[Server] Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
