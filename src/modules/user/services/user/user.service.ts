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
  GetUserResponseDTO,
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

    userFound = await this.userRepository.getByUsername(user.login);

    if (!userFound)
      userFound = await this.userRepository.getByEmail(user.login);

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

  public async getUser(token: string): Promise<GetUserResponseDTO> {
    try {
      const userData = this.authService.verifyToken(token);

      const user = await this.userRepository.getByUsername(userData.username);

      if (!user) throw new UserNotFoundError();

      return {
        active: user.active,
        createdAt: user.createdAt,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        userRole: user.userRole,
      };
    } catch (error) {
      throw error;
    }
  }
}
