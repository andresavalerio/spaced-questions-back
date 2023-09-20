import { UserService } from "./user.service";
import {
  CreateUserDTO,
  IAuthService,
  IUserRepository,
  User,
  UserRole,
} from "../../user.interfaces";
import {
  UserDuplicateError,
  UserNotFoundError,
  UserWrongPasswordError,
} from "../../user.errors";

describe("UserService", () => {
  let service: UserService;
  let authService: IAuthService;
  let userRepository: IUserRepository;

  beforeAll(() => {
    authService = {
      createDecodedPassword: jest.fn(),
      createToken: jest.fn(),
      verifyPasswords: jest.fn(),
      verifyToken: jest.fn(),
    };

    userRepository = {
      existsByUsername: jest.fn(),
      getByUsername: jest.fn(),
      getByEmail: jest.fn(),
      save: jest.fn(),
    };

    service = new UserService(userRepository, authService);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("shoud be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createUser", () => {
    const createUserData: CreateUserDTO = {
      email: "email@mail.com",
      firstName: "first",
      lastName: "last",
      password: "pass",
      username: "username",
    };

    it("should create user, and return it with decoded password, free role and active true", async () => {
      jest
        .spyOn(userRepository, "save")
        .mockImplementation(async (user) => new Promise((r) => r(user)));

      jest
        .spyOn(authService, "createDecodedPassword")
        .mockImplementation((password) => "decoded:" + password);

      const createdUser = await service.createUser(createUserData);

      expect(createdUser.active).toBeTruthy();
      expect(createdUser.password).toBe("decoded:" + createUserData.password);
      expect(createdUser.userRole).toBe("Free" as UserRole);

      expect(userRepository.existsByUsername).toBeCalled();
      expect(userRepository.save).toBeCalled();
    });

    it("should not create duplicated user, and throw UserDuplicatedError", async () => {
      jest.spyOn(userRepository, "existsByUsername").mockResolvedValue(true);

      await expect(async () => {
        await service.createUser(createUserData);
      }).rejects.toThrow(UserDuplicateError);

      expect(userRepository.existsByUsername).toBeCalled();
      expect(userRepository.save).not.toBeCalled();
    });
  });

  describe("loginUser", () => {
    it("should login user with email, and return it base data and token", async () => {
      jest.spyOn(authService, "createToken").mockReturnValue("token");

      jest.spyOn(authService, "verifyPasswords").mockReturnValue(true);

      jest
        .spyOn(userRepository, "getByEmail")
        .mockResolvedValue({ password: "123" } as User);

      const response = await service.loginUser({
        login: "mail.com",
        password: "123",
      });

      expect(response.token).toBe("token");
      expect(response.user).toBeDefined();
      expect(authService.createToken).toBeCalled();
      expect(userRepository.getByEmail).toBeCalled();
    });

    it("should login user with username, and return it base data and token", async () => {
      jest.spyOn(authService, "createToken").mockReturnValue("token");

      jest.spyOn(authService, "verifyPasswords").mockReturnValue(true);

      jest.spyOn(userRepository, "getByUsername").mockResolvedValue({} as User);

      const response = await service.loginUser({
        login: "username",
        password: "123",
      });

      expect(response.token).toBe("token");
      expect(response.user).toBeDefined();
      expect(authService.createToken).toBeCalled();
      expect(authService.verifyPasswords).toBeCalled();
      expect(userRepository.getByUsername).toBeCalled();
    });

    it("should not login user when it not exist,and throw UserNotFoundError", async () => {
      jest
        .spyOn(userRepository, "getByUsername")
        .mockResolvedValue(null as unknown as User);

      await expect(async () => {
        await service.loginUser({
          login: "username",
          password: "123",
        });
      }).rejects.toThrow(UserNotFoundError);

      expect(authService.createToken).not.toBeCalled();
      expect(authService.verifyPasswords).not.toBeCalled();
      expect(userRepository.getByUsername).toBeCalled();
    });

    it("should not login user when password is wrong, and throw WrongPasswordError", async () => {
      jest
        .spyOn(userRepository, "getByUsername")
        .mockResolvedValue({ active: true, username: "user" } as User);

      jest.spyOn(authService, "verifyPasswords").mockReturnValue(false);

      await expect(async () => {
        await service.loginUser({
          login: "username",
          password: "123",
        });
      }).rejects.toThrow(UserWrongPasswordError);

      expect(authService.createToken).not.toBeCalled();
      expect(authService.verifyPasswords).toBeCalled();
      expect(userRepository.getByUsername).toBeCalled();
    });
  });
});
