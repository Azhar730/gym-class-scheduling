import mongoose from 'mongoose';
import AppError from '../../app/errors/AppError';
import Schedule from '../ClassSchedule/schedule.model';
import { Trainee } from '../Trainee/trainee.model';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBookingIntoDB = async (payload: IBooking) => {
  const { schedule, trainee } = payload;
  const existSchedule = await Schedule.findById(schedule);
  const existTrainee = await Trainee.findById(trainee);
  if (!existSchedule) {
    throw new AppError(404, 'Schedule not found');
  }
  if (!existTrainee) {
    throw new AppError(404, 'Trainee not found');
  }
  // Check if max booking limit (10) reached
  const totalBookings = await Booking.countDocuments({ schedule });
  if (totalBookings >= 10) {
    throw new AppError(400, 'Class schedule is full. Maximum 10 trainees allowed per schedule');
  }
  // Check if trainee already booked another class at the same time
  const alreadyBooked = await Booking.findOne({
    trainee,
  }).populate({
    path: 'schedule',
    match: {
      date: existSchedule.date,
      startTime: existSchedule.startTime,
    },
  });
  if (alreadyBooked) {
    throw new AppError(400, 'You already have a booking at this time');
  }

  // create booking
  const result = await Booking.create(payload);
  return result;
};

const getBookingsByTraineeFromDB = async (id: string) => {
  const result = await Booking.find({ trainee: id })
    .populate('schedule')
    .populate('trainee')
    .sort({ createdAt: -1 });
  if (result.length == 0) {
    throw new AppError(404, 'You have no booking schedule');
  }
  return result;
};

const cancelBookingFrmDB = async (bookingId: string, userId: string) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new AppError(404, 'Booking not found');
  }
  // check ownership
  const trainee = await Trainee.findOne(
    { user: new mongoose.Types.ObjectId(userId) },
    { _id: 1 },
  );
  if (booking.trainee.toString() !== trainee?._id?.toString()) {
    throw new AppError(403, 'You can not cancel this booking');
  }
  const result = await Booking.findByIdAndDelete(bookingId);
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getBookingsByTraineeFromDB,
  cancelBookingFrmDB,
};
