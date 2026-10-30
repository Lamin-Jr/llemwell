import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import prisma from './config/prisma';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import contactRoutes from './routes/contactRoutes';


const app = express();
const PORT = Number(process.env.PORT) || 8080;

// Configure CORS allowed origins
const defaultOrigins = [
  'https://llemwell.com',
  'https://www.llemwell.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];
const envOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : [];
const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        callback(null, true);
      } else {
        // Also allow Railway subdomains during preview
        if (origin.endsWith('.up.railway.app') || origin.endsWith('.railway.app')) {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} is not allowed by CORS`));
        }
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// Probing endpoint for Railway Healthchecks
app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      service: 'llemwell-backend',
    });
  } catch (error) {
    console.error('Database connection failed in /health:', error);
    res.status(503).json({
      status: 'DOWN',
      error: 'Database connection failed',
      timestamp: new Date().toISOString(),
    });
  }
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`LLEMWELL Backend active on port ${PORT}`);
});

// Graceful Shutdown
const handleShutdown = async (signal: string) => {
  console.log(`Received ${signal}. Starting graceful shutdown...`);
  server.close(async () => {
    console.log('HTTP server closed.');
    try {
      await prisma.$disconnect();
      console.log('Prisma disconnected.');
    } catch (err) {
      console.error('Error during Prisma disconnect:', err);
    }
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
