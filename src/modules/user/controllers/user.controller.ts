import { type Response, type Request, Router } from "express";
import { IController } from "../../../interfaces/controller.interface";
import { UserAlreadyExistsError } from "../user.errors";
import { UserService } from "../services/user.service";
import { CreateUserDTO, IUserService } from "../user.interfaces";

export class UserController implements IController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  createUser(req: Request, res: Response) {
    const createUserData = req.body as CreateUserDTO;

    const toVerifyKeys: Array<keyof CreateUserDTO> = [
      "email",
      "firstName",
      "lastName",
      "password",
      "username",
    ];

    for (const key of toVerifyKeys)
      if (!createUserData[key]) return res.status(400).send();

    try {
      this.userService.createUser(createUserData);

      return res.status(204).send();
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return res.status(409).send();
      } else {
        return res.status(500).send();
      }
    }
  }

  getRouter(): Router {
    const router = Router();

    router.post("/", (req, res) => {
      this.createUser(req, res);
    });

    return router;
  }
}
