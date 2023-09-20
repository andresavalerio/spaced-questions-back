import request from "supertest";
import express, { type Express } from "express";
import { UserController } from "./user.controller";
import {
  CreateUserDTO,
  IUserService,
  User,
  UserLoginDTO,
  UserRole,
  UserTokenDTO,
} from "../user.interfaces";
import { UserDuplicateError, UserNotFoundError } from "../user.errors";

const baseCreateUserData = {
  username: "vjchave",
  email: "vjchave@gmail.com",
  password: "123456",
  firstName: "victor",
  lastName: "chaves",
};

describe("UserController", () => {
  let application: Express;
  let service: IUserService;

  const requestCreateUser = (data: CreateUserDTO) =>
    request(application).post("/").send(data);

  const requestLoginUser = (data: UserLoginDTO) =>
    request(application).post("/login").send(data);

  beforeAll(() => {
    service = {
      createUser: jest.fn(),
      loginUser: jest.fn(),
    };
  });

  beforeEach(() => {
    application = express();

    application.use(express.json());

    const controller = new UserController(service);

    const router = controller.getRouter();

    application.use("/", router);

    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(application).toBeDefined();
  });

  describe("createUser", () => {
    it("should create user, return his data but without his password", async () => {
      jest.spyOn(service, "createUser").mockResolvedValue({
        ...baseCreateUserData,
        active: true,
        createdAt: new Date(),
        userRole: "Free",
      });

      await requestCreateUser(baseCreateUserData)
        .expect(200)
        .then((created) => {
          const data = created.body as User;

          expect(data.active).toBe(true);
          expect(data.userRole).toBe("Free" as UserRole);
          expect(data.password).toBe("");
        });
    });

    it("should not create user without some property", async () => {
      const toNullifyKeys: Array<keyof CreateUserDTO> = [
        "email",
        "firstName",
        "lastName",
        "password",
        "username",
      ];

      for (const key of toNullifyKeys) {
        await requestCreateUser({ ...baseCreateUserData, [key]: "" })
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe(`missing value "${key}"`);
          });
      }
    });

    it("should not create user with the same username", async () => {
      jest.spyOn(service, "createUser").mockImplementation(() => {
        throw new UserDuplicateError();
      });

      await requestCreateUser(baseCreateUserData)
        .expect(409)
        .then((response) => {
          expect(response.body.msg).toBe("duplicated user");
        });
    });
  });

  describe("loginUser", () => {
    it("should login user with username or email, and response it data", async () => {
      jest.spyOn(service, "loginUser").mockResolvedValue({
        token: "token",
        user: {} as User,
      });

      await requestLoginUser({
        login: "username",
        password: "password",
      })
        .expect(200)
        .then((response) => {
          expect(response.body.token).toBeDefined();
          expect(response.body.user).toBeDefined();
        });

      await requestLoginUser({
        login: "email",
        password: "password",
      })
        .expect(200)
        .then((response) => {
          expect(response.body.token).toBeDefined();
          expect(response.body.user).toBeDefined();
        });
    });

    it("should not login user, when password or login not provided, reponse with status 400", async () => {
      await requestLoginUser({ password: "123", login: "" }).expect(400);
      await requestLoginUser({ password: "", login: "123" }).expect(400);
    });

    it("should not login user, when him not exits, response with status 409", async () => {
      jest
        .spyOn(service, "loginUser")
        .mockRejectedValue(new UserNotFoundError());

      await requestLoginUser({ password: "password", login: "email" }).expect(
        409
      );
    });
  });
});
