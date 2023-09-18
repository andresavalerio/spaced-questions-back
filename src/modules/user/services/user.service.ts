import {
  CreateUserDTO,
  IUserRepository,
  IUserService,
  LoginUserDTO,
  LoginUserResponseDTO,
} from "../user.interfaces";

export class UserService implements IUserService {
  constructor(userRepository: IUserRepository) {}

  public async createUser(user: CreateUserDTO): Promise<User> {}

  public async loginUser(user: LoginUserDTO): Promise<LoginUserResponseDTO> {}
}
