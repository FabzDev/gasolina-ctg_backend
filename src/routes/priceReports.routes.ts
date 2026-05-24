import { Router } from 'express';
import { getReports, createReport } from '../controllers/priceReports.controller';

const router = Router();

router.get('/', getReports);
router.post('/', createReport);

export default router;