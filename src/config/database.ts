import mongoose from 'mongoose';

let connectionPromise: Promise<typeof mongoose> | null = null;

export const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI || '';

  if (!uri) {
    throw new Error('MONGODB_URI is not configured');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 10000
    })
    .then((connection) => {
      console.log('MongoDB connected');
      return connection;
    })
    .catch((error) => {
      connectionPromise = null;
      console.error('MongoDB connection failed:', error);
      throw error;
    });

  return connectionPromise;
};
