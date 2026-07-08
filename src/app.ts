import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import storyRoutes from './routes/story';
import { connectDatabase } from './config/database';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
app.set('trust proxy', 1);
app.disable('etag');

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));

app.use('/api', (_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

// Custom request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Body:', req.body);
  
  const originalSend = res.send;
  res.send = function(data) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} -> ${res.statusCode}`);
    return originalSend.call(this, data);
  };
  
  next();
});

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', async (_req, _res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/api', storyRoutes);

app.use(errorHandler);

export default app;
