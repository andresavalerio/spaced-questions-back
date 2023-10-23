import { AuthService } from "./auth.service";
import { createHash } from "crypto";
import { type UserTokenDTO } from "../../user.interfaces";

describe("AuthService", () => {
  const secrect = "secret";
  let service: AuthService;
  let basePassword: string;
  let baseDecodedPassword: string;
  let baseUserTokenData: UserTokenDTO;

  beforeAll(() => {
    service = new AuthService(secrect);
    basePassword = "123";
    baseDecodedPassword = createHash("sha512").update("123").digest("hex");
    baseUserTokenData = {
      active: true,
      email: "email",
      username: "username",
      userRole: "Free",
    };
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createDecodedPassword", () => {
    it("should create decoded password in sha512", () => {
      const decodedPassword = service.createDecodedPassword(basePassword);

      expect(decodedPassword).toBe(baseDecodedPassword);
    });
  });

  describe("verifyPasswords", () => {
    it("should verify two equal passwords, but one decoded and return true", () => {
      const result = service.verifyPasswords(basePassword, baseDecodedPassword);

      expect(result).toBeTruthy();
    });

    it("should verify two different passwords, but one decoded and return false", () => {
      const result = service.verifyPasswords(
        basePassword + "4",
        baseDecodedPassword
      );

      expect(result).not.toBeTruthy();
    });
  });

  describe("createToken", () => {
    it("should create a json web token and it be verifiable", () => {
      const token = service.createToken(baseUserTokenData);

      expect(token).toBeDefined();

      const userData = service.verifyToken(token) as UserTokenDTO;

      expect(userData.active).toBe(baseUserTokenData.active);
      expect(userData.email).toBe(baseUserTokenData.email);
      expect(userData.userRole).toBe(baseUserTokenData.userRole);
      expect(userData.username).toBe(baseUserTokenData.username);
    });
  });
});
