import { UserService } from "./user.service";

describe("UserService", () => {
  let userService: UserService;

  beforeAll(() => {
    userService = new UserService({
      insertUser: jest.fn(),
    });
  });

  it("shoud be defined", () => {
    expect(userService).toBeDefined();
  });

  
});
