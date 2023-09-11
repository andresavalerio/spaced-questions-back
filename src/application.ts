import express, { type Express } from "express";
import { setApplicationControllers } from "./controllers";
import { setDevelopmentMiddlewares, setGlobalMiddlewares } from "./middlewares";
import database from "./database/database";

const setupDependencies = async () => {
  await database.initialize();
};

export const createApplication = async (): Promise<Express> => {
  const application = express();

  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) {
    setDevelopmentMiddlewares(application);
  }

  await setupDependencies();

  setGlobalMiddlewares(application);

  setApplicationControllers(application);

  return application;
};
