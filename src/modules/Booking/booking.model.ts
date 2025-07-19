import { model, Schema } from 'mongoose';
import { IBooking } from './booking.interface';

const bookingSchema = new Schema<IBooking>(
  {
    schedule: {
      type: Schema.Types.ObjectId,
      ref: 'Schedule',
      required: [true, 'Schedule is required'],
    },
    trainee: {
      type: Schema.Types.ObjectId,
      ref: 'Trainee',
      required: [true, 'Trainee is required'],
    },
  },
  { timestamps: true },
);

export const Booking = model<IBooking>('Booking', bookingSchema);
