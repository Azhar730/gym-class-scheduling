export interface IUser {
  email: string;
  password: string;
  role: "admin"|"trainer"|"trainee";
  isDeleted: boolean
}