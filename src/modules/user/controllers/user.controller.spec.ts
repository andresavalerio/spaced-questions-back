import request from "supertest";
import express, { type Express } from "express";
import { UserController } from "./user.controller";
import { CreateUserDTO } from "../user.interfaces";

const baseCreateUserData = {
  username: "vjchave",
  email: "vjchave@gmail.com",
  password: "123456",
  firstName: "victor",
  lastName: "chaves",
};

describe("UserController", () => {
  let application: Express;

  const testPostUser = (data: CreateUserDTO) =>
    request(application).post("/").send(data);

  beforeEach(() => {
    application = express();

    application.use(express.json());

    const controller = new UserController(null as any);

    const router = controller.getRouter();

    application.use("/", router);
  });

  it("should be defined", () => {
    expect(application).toBeDefined();
  });

  it("should create user", () => {
    return testPostUser(baseCreateUserData).expect(204);
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
      await testPostUser({ ...baseCreateUserData, [key]: "" }).expect(400);
    }
  });

  it("should not create user with the same username", async () => {
    await testPostUser(baseCreateUserData).expect(204);

    await testPostUser(baseCreateUserData).expect(409);
  });
});
