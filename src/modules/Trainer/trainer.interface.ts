import { Types } from 'mongoose';

export interface ITrainer {
  user: Types.ObjectId;
  name: string;
  email: string;
  password: string;
}
