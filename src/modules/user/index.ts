import { RouterModifier } from "interfaces/module.interface";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user/user.service";
import { UserRepository } from "./repositories/user.repository";
import { AuthService } from "./services/auth/auth.service";

const createUserController = (): UserController => {
  const userRepository = new UserRepository();

  const authService = new AuthService(String(process.env.JWT_SECRET));

  const userService = new UserService(userRepository, authService);

  const userController = new UserController(userService);

  return userController;
};

export const setUserModule: RouterModifier = (application) => {
  const userController = createUserController();

  const userRoute = userController.getRouter();

  application.use("/user", userRoute);
};
