import { type Express } from "express";
import request from "supertest";
import { createApplicationAsync } from "../src/application";

const baseCreateUserData = {
  username: "vjchave",
  email: "vjchave@gmail.com",
  password: "123456",
  firstName: "victor",
  lastName: "chaves",
};

describe("UserRoute (e2e)", () => {
  let application: Express;

  beforeAll(async () => {
    application = await createApplicationAsync();
  });

  beforeEach(async () => {});

  it("should be defined", () => {
    expect(application).toBeDefined();
  });

  it("should create user", () => {
    return request(application)
      .post("/api/user")
      .send(baseCreateUserData)
      .expect(204);
  });

  it("should not create user without email", () => {
    return request(application)
      .post("/api/user")
      .send({ ...baseCreateUserData, email: "" })
      .expect(400);
  });

  it("should not create user without password", () => {
    return request(application)
      .post("/api/user")
      .send({ ...baseCreateUserData, password: "" })
      .expect(400);
  });

  it("should not create user without firstName and lastName", () => {
    return request(application)
      .post("/api/user")
      .send({ ...baseCreateUserData, firstName: "", lastName: "" })
      .expect(400);
  });
});
