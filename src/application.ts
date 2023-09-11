import express from "express";
import { setApplicationControllers } from "./controllers";
import { setDevelopmentMiddlewares, setGlobalMiddlewares } from "./middlewares";

const application = express();

const isDevelopment = process.env.NODE_ENV === "development";

if (isDevelopment) {
  setDevelopmentMiddlewares(application);
}

setGlobalMiddlewares(application);

setApplicationControllers(application);

export default application;
