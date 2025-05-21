import { Router } from 'express';
import authRoutes from './auth.routes.js';
import eventRoutes from './event.routes.js';
import devotionalRoutes from './devotional.routes.js';
import userRoutes from './user.routes.js';
import statusRoutes from './status.routes.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/events', authenticateToken, eventRoutes);
router.use('/devotionals', authenticateToken, devotionalRoutes);
router.use('/users', authenticateToken, userRoutes);
router.use('/status', statusRoutes);

export default router;