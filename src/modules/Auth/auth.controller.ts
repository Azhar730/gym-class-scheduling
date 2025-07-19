import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { AuthServices } from './auth.service';

const registerAdmin = catchAsync(async (req, res) => {
  const result = await AuthServices.registerAdminIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});
const registerTrainer = catchAsync(async (req, res) => {
  const result = await AuthServices.registerTrainerIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Trainer created successfully',
    data: result,
  });
});
const registerTrainee = catchAsync(async (req, res) => {
  const result = await AuthServices.registerTraineeIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Trainee created successfully',
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User login successfully',
    data: result.verifiedUser,
    accessToken: result.accessToken,
  });
});

export const AuthControllers = {
  registerAdmin,
  registerTrainer,
  registerTrainee,
  login,
};
