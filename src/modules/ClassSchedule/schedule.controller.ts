import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { ScheduleServices } from './schedule.service';

const createSchedule = catchAsync(async (req, res) => {
  const result = await ScheduleServices.createScheduleIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Schedule created successfully',
    data: result,
  });
});
const getAllSchedules = catchAsync(async (req, res) => {
  const result = await ScheduleServices.getAllSchedulesFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Schedules retrieved successfully',
    data: result,
  });
});
const getSingleSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ScheduleServices.getSingleScheduleFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Schedule retrieved successfully',
    data: result,
  });
});
export const ScheduleControllers = {
  createSchedule,
  getAllSchedules,
  getSingleSchedule,
};
