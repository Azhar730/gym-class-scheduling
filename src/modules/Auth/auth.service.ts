import User from '../User/user.model';
import AppError from '../../app/errors/AppError';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../app/config';
import { IUser } from '../User/user.interface';
import { IAdmin } from '../Admin/admin.interface';
import mongoose from 'mongoose';
import { Admin } from '../Admin/admin.model';
import { ITrainer } from '../Trainer/trainer.interface';
import { Trainer } from '../Trainer/trainer.model';
import { ITrainee } from '../Trainee/trainee.interface';
import { Trainee } from '../Trainee/trainee.model';

const registerAdminIntoDB = async (payload: IAdmin) => {
  const userData: Partial<IUser> = {};
  userData.role = 'admin';
  userData.email = payload.email;
  userData.password = payload.password;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create a user
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user!');
    }
    payload.user = newUser[0]._id;
    // create an admin
    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(400, 'Failed to create Admin');
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
const registerTrainerIntoDB = async (payload: ITrainer) => {
  const userData: Partial<IUser> = {};
  userData.role = 'trainer';
  userData.email = payload.email;
  userData.password = payload.password;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create a user
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user!');
    }
    payload.user = newUser[0]._id;
    // create a trainer
    const newTrainer = await Trainer.create([payload], { session });
    if (!newTrainer.length) {
      throw new AppError(400, 'Failed to create Trainer');
    }
    await session.commitTransaction();
    await session.endSession();
    return newTrainer;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
const registerTraineeIntoDB = async (payload: ITrainee) => {
  const userData: Partial<IUser> = {};
  userData.role = 'trainee';
  userData.email = payload.email;
  userData.password = payload.password;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create a user
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user!');
    }
    payload.user = newUser[0]._id;
    // create a trainee
    const newTrainee = await Trainee.create([payload], { session });
    if (!newTrainee.length) {
      throw new AppError(400, 'Failed to create Trainee');
    }
    await session.commitTransaction();
    await session.endSession();
    return newTrainee;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const login = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(404, 'User not found !');
  }
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new AppError(400, 'Password not match !');
  }
  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const verifiedUser = {
    id: user?._id,
    email: user?.email,
    role: user?.role,
  };
  return {
    verifiedUser,
    accessToken,
  };
};

export const AuthServices = {
  registerAdminIntoDB,
  registerTrainerIntoDB,
  registerTraineeIntoDB,
  login,
};
