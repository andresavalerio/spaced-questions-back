import { IAuthService, UserTokenDTO } from "modules/user/user.interfaces";
import jwt from "jsonwebtoken";
import { UserTokenError } from "modules/user/user.errors";
import { createHash } from "node:crypto";

export class AuthService implements IAuthService {
  constructor(private secret: string) {}

  createDecodedPassword(rawPassword: string): string {
    return createHash("sha512").update(rawPassword).digest("hex");
  }

  verifyPasswords(rawPassword: string, decodedPassword: string) {
    const createdDecodedPassword = this.createDecodedPassword(rawPassword);

    if (createdDecodedPassword.length !== decodedPassword.length) return false;

    return createdDecodedPassword.includes(decodedPassword);
  }

  createToken(payload: UserTokenDTO): string {
    try {
      return jwt.sign(payload, this.secret, { expiresIn: 60 * 60 });
    } catch (error) {
      throw new UserTokenError();
    }
  }

  verifyToken(token: string): UserTokenDTO {
    try {
      const payload = jwt.verify(token, this.secret);

      return payload as UserTokenDTO;
    } catch (error) {
      throw new UserTokenError();
    }
  }
}
