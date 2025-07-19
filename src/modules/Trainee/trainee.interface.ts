import { Types } from 'mongoose';

export interface ITrainee {
  user: Types.ObjectId;
  name: string;
  email: string;
  password: string;
}
