import { Router } from 'express';
import { EmployeeController } from './employee.controller';

const router = Router();

const controller = new EmployeeController();

router.get('/', controller.findAll);
router.post('/', controller.create);

export default router;

