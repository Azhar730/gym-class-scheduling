import { model, Schema } from 'mongoose';
import { ISchedule } from './schedule.interface';

const scheduleSchema = new Schema<ISchedule>(
  {
    className: { type: String, required: [true, 'Class Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    date: { type: String, required: [true, 'Date is required'] },
    startTime: { type: String, required: [true, 'Start time is required'] },
    endTime: { type: String, required: [true, 'End time is required'] },
    trainer: { type: Schema.Types.ObjectId, ref: 'Trainer', required: true },
    maxCapacity: { type: Number, max: [10,'Trainee capacity is maximum 10'] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Schedule = model<ISchedule>('Schedule', scheduleSchema);
export default Schedule;
