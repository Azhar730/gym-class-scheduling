import { Router } from 'express';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/create-booking',auth('trainee'), BookingControllers.createBooking);
router.get('/:id',auth('trainee'), BookingControllers.getBookingsByTrainee);
router.delete('/cancel-booking/:bookingId',auth('trainee'), BookingControllers.cancelBooking);

export const BookingRoutes = router;
