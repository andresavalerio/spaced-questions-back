export type UserRole = "Free" | "Premium";

export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export interface UserLoginDTO {
  login: string;
  password: string;
}

export interface LoginUserResponseDTO {
  user: User;
  token: string;
}

export type GetUserResponseDTO = {
  username: string;
  email: string;
  fullName: string;
  active: boolean;
  userRole: UserRole;
  createdAt: Date;
};

export interface IUserService {
  createUser(user: CreateUserDTO): Promise<User>;
  loginUser(user: UserLoginDTO): Promise<LoginUserResponseDTO>;
  getUser(token: string): Promise<UserTokenDTO>;
}

export interface IUserRepository {
  save(user: User): Promise<User>;
  existsByUsername(username: string): Promise<boolean>;
  getByUsername(username: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
}

export abstract class User {
  username!: string;
  email!: string;
  password!: string;
  fullName!: string;
  active!: boolean;
  userRole!: UserRole;
  createdAt!: Date;
}

export interface UserTokenDTO {
  username: string;
  email: string;
  active: boolean;
  userRole: UserRole;
}

export interface IAuthService {
  createToken(payload: UserTokenDTO): string;
  verifyToken(token: string): UserTokenDTO;
  createDecodedPassword(rawPassword: string): string;
  verifyPasswords(rawPassword: string, decodedPassword: string): boolean;
}
