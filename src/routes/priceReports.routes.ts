import { Router } from 'express';
import { getReports, createReport } from '../controllers/priceReports.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getReports);
router.post('/', authenticateToken, createReport);

export default router;