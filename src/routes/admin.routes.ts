import { Router } from 'express';

import { authenticateToken } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';

const router = Router();

// SOLO ADMIN
router.post(
  '/approve-report',
  authenticateToken,
  authorizeRoles('admin'),
  (req, res) => {
    res.json({
      success: true,
      message: 'Report approved'
    });
  }
);

export default router;