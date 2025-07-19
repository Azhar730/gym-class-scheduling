import { Types } from 'mongoose';

export interface ISchedule {
  _id: any;
  className: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  trainer: Types.ObjectId;
  maxCapacity: number;
  isDeleted: boolean;
}
