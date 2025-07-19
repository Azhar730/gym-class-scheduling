import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/create-admin',auth('admin'), AuthControllers.registerAdmin);
router.post('/create-trainer',auth('admin'), AuthControllers.registerTrainer);
router.post('/create-trainee', AuthControllers.registerTrainee);
router.post('/login', AuthControllers.login);
export const AuthRoute = router;
