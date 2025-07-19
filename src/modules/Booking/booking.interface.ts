import { Types } from "mongoose";

export interface IBooking {
  schedule: Types.ObjectId;
  trainee: Types.ObjectId;
}