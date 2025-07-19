### live link: https://doctor-patient-management-azure.vercel.app

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **Linting & Formatting**: ESLint, Prettier
- **TypeScript**: Strongly typed codebase



## Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=<your_mongodb_connection_string>
BCRYPT_SALT_ROUNDS=8
JWT_ACCESS_SECRET=<your_jwt_secret>
JWT_ACCESS_EXPIRES_IN=1d

# Cloudinary
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

# ShurjoPay
SP_ENDPOINT=https://sandbox.shurjopayment.com
SP_USERNAME=<your_shurjopay_username>
SP_PASSWORD=<your_shurjopay_password>
SP_PREFIX=SP
SP_RETURN_URL=<your_return_url>
```

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Azhar730/doctor-patient-ams.git
   cd doctor-patient-ams
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
 ```




For any questions or issues, please contact the project maintainer.