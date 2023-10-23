import { UserRepository } from "./user.repository";

describe("UserRepository", () => {
  let repository: UserRepository;

  beforeEach(() => {
    repository = new UserRepository();
  });

  it("should be defined", () => {
    expect(repository).toBeDefined();
  });
});
