import AppError from '../../app/errors/AppError';
import { Trainer } from '../Trainer/trainer.model';
import { ISchedule } from './schedule.interface';
import Schedule from './schedule.model';

const createScheduleIntoDB = async (payload: ISchedule) => {
  const { trainer, date, startTime, endTime } = payload;
  const trainerUser = await Trainer.findById(trainer);
  if (!trainerUser) {
    throw new AppError(404, 'Trainer not found');
  }
  // check if the schedule time overlaps for the same trainer
  const overlap = await Schedule.findOne({
    trainer,
    date,
    $or: [
      {
        startTime: { $lt: endTime, $gte: startTime },
      },
      {
        endTime: { $gt: startTime, $lte: endTime },
      },
      {
        startTime: { $lte: startTime },
        endTime: { $gte: endTime },
      },
    ],
  });
  if (overlap) {
    throw new AppError(409, 'Trainer already has a class at this time.');
  }

  const startDate = new Date(`2000-01-01T${startTime}:00`);
  const endDate = new Date(`2000-01-01T${endTime}:00`);
  const diffMs = endDate.getTime() - startDate.getTime();
  const diffHours = diffMs / (1000 * 60 * 60); // Convert to hours

  if (diffHours > 2) {
    throw new AppError(400, 'Class duration cannot exceed 2 hours.');
  }

  // check maximum 5 classes allowed per day
  const totalSchedules = await Schedule.countDocuments({ date });
  if (totalSchedules >= 5) {
    throw new AppError(400, 'Maximum 5 classes can be scheduled per day.');
  }
  const result = await Schedule.create(payload);
  return result;
};

const getAllSchedulesFromDB = async () => {
  const result = await Schedule.find().populate('trainer');
  return result;
};

const getSingleScheduleFromDB = async (id: string) => {
  const result = await Schedule.findById(id).populate('trainer');
  return result;
};

export const ScheduleServices = {
  createScheduleIntoDB,
  getAllSchedulesFromDB,
  getSingleScheduleFromDB,
};
