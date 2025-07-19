import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../app/config';
import { ITrainee } from './trainee.interface';

const traineeSchema = new Schema<ITrainee>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is Required'],
    },
    name: {
      type: String,
      required: [true, 'Name is Required'],
      trim: true,
      maxlength: [20, 'Name can not be more than 20 Characters'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      validate: {
        validator: (value: string) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: '{VALUE} is not Valid, Please Provide Valid Email',
      },
    },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true },
);

traineeSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});
traineeSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const Trainee = model<ITrainee>('Trainee', traineeSchema);