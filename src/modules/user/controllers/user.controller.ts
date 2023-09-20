import { type Response, type Request, Router } from "express";
import { IController } from "../../../interfaces/controller.interface";
import {
  UserDuplicateError,
  UserNotFoundError,
  UserWrongPasswordError,
} from "../user.errors";
import { CreateUserDTO, IUserService, UserLoginDTO } from "../user.interfaces";

export class UserController implements IController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response) {
    const createUserData = req.body as CreateUserDTO;

    const toVerifyKeys: Array<keyof CreateUserDTO> = [
      "email",
      "firstName",
      "lastName",
      "password",
      "username",
    ];

    for (const key of toVerifyKeys)
      if (!createUserData[key])
        return res.status(400).json({ msg: `missing value "${key}"` });

    try {
      const createdUser = await this.userService.createUser(createUserData);

      if (createdUser.password) createdUser.password = "";

      return res.status(200).json(createdUser);
    } catch (error) {
      if (error instanceof UserDuplicateError) {
        return res.status(409).json({ msg: "duplicated user" });
      } else {
        return res.status(500).json();
      }
    }
  }

  async loginUser(req: Request, res: Response) {
    const loginUserData = req.body as UserLoginDTO;

    const hasLogin = !!loginUserData.login;
    const hasPassword = !!loginUserData.password;

    if (!hasLogin) return res.status(400).json();
    if (!hasPassword) return res.status(400).json();

    try {
      const result = await this.userService.loginUser(loginUserData);

      res.status(200).json(result);
    } catch (error) {
      if (error instanceof UserNotFoundError) res.status(409).json();
      else if (error instanceof UserWrongPasswordError) res.status(401).json();
      else res.status(500).json();
    }
  }

  getRouter(): Router {
    const router = Router();

    router.post("/", async (req, res) => {
      await this.createUser(req, res);
    });

    router.post("/login", async (req, res) => {
      await this.loginUser(req, res);
    });

    return router;
  }
}
