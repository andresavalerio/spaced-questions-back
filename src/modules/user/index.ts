import { ApplicationModifier } from "interfaces/module.interface";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { UserRepository } from "./repositories/user.repository";

const createUserController = (): UserController => {
  const userRepository = new UserRepository();

  const userService = new UserService(userRepository);

  const userController = new UserController(userService);

  return userController;
};

export const setUserModule: ApplicationModifier = (application) => {
  const userController = createUserController();

  const userRoute = userController.getRouter();

  application.use("/user", userRoute);
};
