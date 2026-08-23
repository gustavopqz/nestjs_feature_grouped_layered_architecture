import { authenticate, authorize } from '@/middlewares/auth.middleware';
import { Router } from 'express';
import { EmployeeController } from './employee.controller';

const router = Router();

const controller = new EmployeeController();

router.get('/', authenticate, controller.findAll);
router.post('/', authenticate, authorize('admin'), controller.create);

export default router;

