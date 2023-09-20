import {
  UserDuplicateError,
  UserNotFoundError,
  UserWrongPasswordError,
} from "../../user.errors";
import {
  CreateUserDTO,
  IAuthService,
  IUserRepository,
  IUserService,
  UserLoginDTO,
  LoginUserResponseDTO,
  User,
} from "../../user.interfaces";

export class UserService implements IUserService {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) {}

  public async createUser(user: CreateUserDTO): Promise<User> {
    const userFound = await this.userRepository.existsByUsername(user.username);

    if (userFound) throw new UserDuplicateError();

    const decodedPassword = this.authService.createDecodedPassword(
      user.password
    );

    const toCreateUser: User = {
      ...user,
      password: decodedPassword,
      active: true,
      createdAt: new Date(),
      userRole: "Free",
    };

    const createdUser = await this.userRepository.save(toCreateUser);

    return createdUser;
  }

  public async loginUser(user: UserLoginDTO): Promise<LoginUserResponseDTO> {
    let userFound: User | null = null;

    if (user.username) {
      userFound = await this.userRepository.getByUsername(user.username);
    } else if (user.email) {
      userFound = await this.userRepository.getByEmail(user.email);
    }

    if (!userFound) throw new UserNotFoundError();

    const verified = this.authService.verifyPasswords(
      user.password,
      userFound.password
    );

    if (!verified) throw new UserWrongPasswordError();

    const token = this.authService.createToken({
      active: userFound.active,
      email: userFound.email,
      username: userFound.username,
      userRole: userFound.userRole,
    });

    return {
      token: token,
      user: userFound,
    };
  }
}
