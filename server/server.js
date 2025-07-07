import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import subjectRoutes from './routes/subjects.js';
import materialRoutes from './routes/materials.js';
import quizRoutes from './routes/quizzes.js';
import gameRoutes from './routes/games.js';
import communityRoutes from './routes/community.js';
import parentalRoutes from './routes/parental.js';
import contactRoutes from './routes/contact.js';
import progressRoutes from './routes/progress.js';
import flashcardRoutes from './routes/flashcards.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/learnkins')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/parental', parentalRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/flashcards', flashcardRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'LearnKins API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

export default app;