import { Types } from 'mongoose';

export interface IAdmin {
  user: Types.ObjectId;
  name: string;
  email: string;
  password: string;
}
