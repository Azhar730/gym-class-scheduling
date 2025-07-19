import { Router } from 'express';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/create-booking', BookingControllers.createBooking);
router.get('/:id', BookingControllers.getBookingsByTrainee);
router.delete('/cancel-booking/:bookingId',auth('trainee'), BookingControllers.cancelBooking);

export const BookingRoutes = router;
