import {
  CreateUserDTO,
  IUserRepository,
  IUserService,
} from "../user.interfaces";

export class UserService implements IUserService {
  constructor(userRepository: IUserRepository) {}

  createUser(user: CreateUserDTO): void {}
}
