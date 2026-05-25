import { Router } from 'express';
import { getReports, createReport } from '../controllers/priceReports.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';

const router = Router();

router.get('/', getReports);
router.post('/', authenticateToken, authorizeRoles('user', 'admin'), createReport);

export default router;
