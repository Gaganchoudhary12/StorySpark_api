import app from './app';
import { connectDatabase } from './config/database';

const port = Number(process.env.PORT || 5000);

const startServer = async () => {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`StorySpark API listening on port ${port}`);
  });
};

startServer();
