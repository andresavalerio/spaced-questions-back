import { Repository } from "typeorm";

export type UserRole = "Free" | "Premium";

export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginUserDTO {
  username?: string;
  email?: string;
  password: string;
}


export interface LoginUserResponseDTO {
  user : User;
  token : string;
}

export interface IUserService {
  createUser(user: CreateUserDTO): Promise<User>;
  loginUser(user: LoginUserDTO): Promise<LoginUserResponseDTO>;
}

export interface IUserRepository {
  insertUser(user: User): Promise<void>;
}

export abstract class User {
  username!: string;
  email!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  active!: boolean;
  userRole!: UserRole;
  createdAt!: Date;
}
