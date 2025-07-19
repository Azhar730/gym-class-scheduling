import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { ScheduleServices } from '../ClassSchedule/schedule.service';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});
const getBookingsByTrainee = catchAsync(async (req, res) => {
  const {id} = req.params
  const result = await BookingServices.getBookingsByTraineeFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking retrieved successfully',
    data: result,
  });
});
const cancelBooking = catchAsync(async (req, res) => {
  const {bookingId} = req.params
  const {id} = req.user
  const result = await BookingServices.cancelBookingFrmDB(bookingId,id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking canceled successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getBookingsByTrainee,
  cancelBooking
};
