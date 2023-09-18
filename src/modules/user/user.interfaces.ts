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

export interface IUserService {
  createUser(user: CreateUserDTO): void;
}

export interface IUserRepository {}

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
