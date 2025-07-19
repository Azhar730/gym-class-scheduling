import { Router } from 'express';
import { ScheduleControllers } from './schedule.controller';

const router = Router();

router.post('/create-schedule', ScheduleControllers.createSchedule);
router.get('/', ScheduleControllers.getAllSchedules);
router.get('/:id', ScheduleControllers.getSingleSchedule);

export const ScheduleRoutes = router;
