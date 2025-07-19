import { Router } from 'express';
import { ScheduleControllers } from './schedule.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/create-schedule',auth('admin'), ScheduleControllers.createSchedule);
router.get('/',auth('admin'), ScheduleControllers.getAllSchedules);
router.get('/:id',auth('admin'), ScheduleControllers.getSingleSchedule);

export const ScheduleRoutes = router;
