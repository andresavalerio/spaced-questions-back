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
    firstName: "first",
    lastName: "last",
    password: "password",
    username: "username",
    userRole: "Free",
  });

export const baseCreateUserData: CreateUserDTO = {
  username: "vjchave",
  email: "vjchave@gmail.com",
  password: "123456",
  firstName: "victor",
  lastName: "chaves",
};

export const baseLoginUserData: UserLoginDTO = {
  username: "vjchave",
  email: "vjchave@gmail.com",
  password: "123456",
};
