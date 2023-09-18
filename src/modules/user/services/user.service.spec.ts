import { UserService } from "./user.service";

describe("UserService", () => {
  let userService: UserService;

  beforeAll(() => {
    userService = new UserService();
  });

  it("shoud be defined", () => {
    expect(userService).toBeDefined();
  });

  it("shoud create user", () => {});
});
