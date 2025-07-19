import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import { AuthRoute } from './modules/Auth/auth.route';
import { ScheduleRoutes } from './modules/ClassSchedule/schedule.route';
import { BookingRoutes } from './modules/Booking/booking.route';

const app: Application = express();
app.use(express.json());
// app.use(cors({ origin: ['https://medimart-nu.vercel.app','http://localhost:3000'], credentials: true }));
app.use(cors());
app.use('/auth', AuthRoute);
app.use('/schedules', ScheduleRoutes);
app.use('/bookings', BookingRoutes);

const getController = (req: Request, res: Response) => {
  res.send('Hello from Gym Class Scheduling and Membership Management System!');
};

app.get('/', getController);
app.use(globalErrorHandler);
app.use(notFound);
export default app;
