import express, { type Express } from "express";
import * as middlewares from "./middlewares";
import database from "database/database";
import { setApplicationModules } from "modules";

const setupDependencies = async () => {
  await database.initialize();
};

export const createApplicationAsync = async (): Promise<Express> => {
  const application = express();

  const isDevelopment = process.env.NODE_ENV === "development";
  const isProduction = process.env.NODE_ENV === "production";

  if (isDevelopment) middlewares.setDevelopmentMiddlewares(application);

  if (isProduction) middlewares.setProductionMiddlewares(application);

  await setupDependencies();

  middlewares.setGlobalMiddlewares(application);

  setApplicationModules(application);

  return application;
};
