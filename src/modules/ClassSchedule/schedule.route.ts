import { Router } from 'express';
import { ScheduleControllers } from './schedule.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/create-schedule',auth('admin'), ScheduleControllers.createSchedule);
router.get('/', ScheduleControllers.getAllSchedules);
router.get('/:id', ScheduleControllers.getSingleSchedule);

export const ScheduleRoutes = router;
