import express, { type Express } from "express";
import { setApplicationControllers } from "./controllers";
import * as middlewares from "./middlewares";
import database from "./database/database";

const setupDependencies = async () => {
  await database.initialize();
};

export const createApplication = async (): Promise<Express> => {
  const application = express();

  const isDevelopment = process.env.NODE_ENV === "development";
  const isProduction = process.env.NODE_ENV === "production";

  if (isDevelopment) middlewares.setDevelopmentMiddlewares(application);

  if (isProduction) middlewares.setProductionMiddlewares(application);

  await setupDependencies();

  middlewares.setGlobalMiddlewares(application);

  setApplicationControllers(application);

  return application;
};
