import database from "database/database";
import {
  CreateUserDTO,
  User,
  UserLoginDTO,
} from "modules/user/user.interfaces";

export const createSimpleUser = (): Promise<User> =>
  database.getRepository(User).save({
    active: true,
    createdAt: new Date(),
    email: "email",
    fullName: "full name",
    password: "password",
    username: "username",
    userRole: "Free",
  });

export const baseCreateUserData: CreateUserDTO = {
  username: "vjchave",
  email: "vjchave@gmail.com",
  password: "123456",
  fullName: "victor chaves",
};
