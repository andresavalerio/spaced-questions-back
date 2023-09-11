import express from "express";
import { setApplicationRoutes } from "./routes";
import { setDevelopmentMiddlewares, setGlobalMiddlewares } from "./middlewares";

const application = express();

const isDevelopment = process.env.NODE_ENV === "development";

if (isDevelopment) {
  setDevelopmentMiddlewares(application);
}

setGlobalMiddlewares(application);

setApplicationRoutes(application);

export default application;
