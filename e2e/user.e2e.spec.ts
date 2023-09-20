import { response, type Express } from "express";
import { database, restartDatabase } from "./database.fixture";
import request from "supertest";
import { createApplicationAsync } from "../src/application";
import {
  CreateUserDTO,
  User,
  UserLoginDTO,
} from "../src/modules/user/user.interfaces";

import { baseCreateUserData, createSimpleUser } from "./user.fixture";

describe("UserRoute (e2e)", () => {
  let application: Express;

  const requestCreateUser = (data: CreateUserDTO) =>
    request(application).post("/api/user").send(data);

  const requestLoginUser = (data: UserLoginDTO) =>
    request(application).post("/api/user/login").send(data);

  beforeAll(async () => {
    application = await createApplicationAsync();
  });

  beforeEach(async () => {
    await restartDatabase();
  });

  it("should be defined", () => {
    expect(application).toBeDefined();
  });

  describe("create user route", () => {
    it("should create user", async () => {
      await requestCreateUser(baseCreateUserData).expect(200);

      const createdUser = await database
        .getRepository(User)
        .findOneBy({ username: baseCreateUserData.username });

      expect(createdUser).not.toBeNull();
      expect(createdUser?.active).toBeTruthy();
      expect(createdUser?.password).toBeDefined();
      expect(createdUser?.password).not.toBe(baseCreateUserData.password);
    });

    it("should not create user without any base data", async () => {
      for (const key of Object.keys(baseCreateUserData))
        await request(application)
          .post("/api/user")
          .send({ ...baseCreateUserData, [key]: "" })
          .expect(400);
    });

    it("should not create duplicated user", async () => {
      const simpleUser = await createSimpleUser();

      await requestCreateUser({
        username: simpleUser.username,
        email: simpleUser.email,
        firstName: simpleUser.firstName,
        lastName: simpleUser.lastName,
        password: simpleUser.password,
      }).expect(409);
    });
  });

  describe("loginUser", () => {
    it("should login user, and response it data", async () => {
      await requestCreateUser(baseCreateUserData).expect(200);

      await requestLoginUser({
        password: baseCreateUserData.password,
        username: baseCreateUserData.username,
      })
        .expect(200)
        .then((response) => {
          expect(response.body.token).toBeDefined();
          expect(response.body.user).toBeDefined();
        });
    });

    it("should not login user, when password or username not provided", async () => {
      await requestCreateUser(baseCreateUserData).expect(200);

      await requestLoginUser({
        password: "",
        username: baseCreateUserData.username,
      }).expect(400);
    });

    it("should not login user, when password is wrong", async () => {
      await requestCreateUser(baseCreateUserData).expect(200);

      await requestLoginUser({
        password: baseCreateUserData.password + "@",
        username: baseCreateUserData.username,
      }).expect(401);
    });

    it("should not login user, when him not exits, response with status 409", async () => {
      await requestLoginUser({
        password: baseCreateUserData.password,
        username: baseCreateUserData.username,
      }).expect(409);
    });
  });
});
