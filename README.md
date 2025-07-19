## live link: https://gym-class-schedule-server-lovat.vercel.app

### Diagram: https://drive.google.com/file/d/1QG428ApTVmUMV1Tqv8P4guS5fJd2n4Ld/view?usp=sharing

## Project Overview

This system allows a gym to efficiently manage:

- User registration/login
- Role-based access (admin, trainer, trainee)
- Gym class creation and schedule management
- Booking system with availability checks and cancellations
- Secure authentication with access tokens

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **Linting & Formatting**: ESLint, Prettier
- **TypeScript**: Strongly typed codebase

### API Endpoints

## Auth Routes

| Method | Endpoint               | Description    |
| ------ | ---------------------- | -------------- |
| POST   | `/auth/create-admin`   | Create admin   |
| POST   | `/auth/create-trainer` | Create trainer |
| POST   | `/auth/create-trainee` | Create trainee |
| POST   | `/auth/login`          | Login          |

### Class & Schedule Routes

| Method | Endpoint                     | Description                 |
| ------ | ---------------------------- | --------------------------- |
| POST   | `/schedules/create-schedule` | Create a new class schedule |
| GET    | `/schedules`                 | Get all schedules           |
| GET    | `/schedules/:id`             | Get single schedule         |

### Booking Routes

| Method | Endpoint                              | Description            |
| ------ | ------------------------------------- | ---------------------- |
| POST   | `/bookings/create-booking`            | Book a class           |
| GET    | `/bookings/:id`                       | GetBookings By Trainee |
| DELETE | `/bookings/cancel-booking/:bookingId` | Cancel a booking       |

## Database Schema

### User Schema

```ts
{
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
    role: {
      type: String,
      enum: ['admin', 'trainer', 'trainee'],
      default: 'trainee',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
```

## Admin Schema

```ts
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
```

## Trainer Schema

```ts
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
```
## Trainee Schema

```ts
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
```

## Class Schedule Schema

```ts
{
    className: { type: String, required: [true, 'Class Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    date: { type: String, required: [true, 'Date is required'] },
    startTime: { type: String, required: [true, 'Start time is required'] },
    endTime: { type: String, required: [true, 'End time is required'] },
    trainer: { type: Schema.Types.ObjectId, ref: 'Trainer', required: true },
    maxCapacity: { type: Number, max: [10,'Trainee capacity is maximum 10'] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
```

## Booking Schema

```ts
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
```

## Admin Credentials
```
email: admin@gmail.com
password: 1234
```


## Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=<your_mongodb_connection_string>
BCRYPT_SALT_ROUNDS=8
JWT_ACCESS_SECRET=<your_jwt_secret>
JWT_ACCESS_EXPIRES_IN=1d
```

## Instruction to run locally

1. Clone the repository:

   ```sh
   git clone https://github.com/Azhar730/gym-class-scheduling.git
   cd gym-class-scheduling
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the environment variables in the `.env` file.

```sh
   rename .env.example to .env
```

4. Start the development server:

   ```sh
   npm run dev
   ```


### Postman: https://.postman.co/workspace/My-Workspace~f4d8142b-6c42-4d03-8827-d67c7c407e0a/collection/39434732-c8abb60e-081f-46e6-a405-59be5ded79aa?action=share&creator=39434732

```
For any questions or issues, please contact the project maintainer.
Azhar Mahmud
azharmahmud730@gmail.com
01954973740
```
