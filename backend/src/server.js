import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Import routes
import authRoutes from './routes/auth.js';
import mangaRoutes from './routes/manga.js';
import novelRoutes from './routes/novel.js';
import favoriteRoutes from './routes/favorite.js';
import commentRoutes from './routes/comment.js';
import ratingRoutes from './routes/rating.js';
import novelAdvancedRoutes from './routes/novelAdvanced.js';
import progressRoutes from './routes/progress.js';
import notificationRoutes from './routes/notification.js';

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Socket.io
app.set('io', io);

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/manga', mangaRoutes);
app.use('/api/novel', novelRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/novel-advanced', novelAdvancedRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/notifications', notificationRoutes);

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});