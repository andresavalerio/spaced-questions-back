import { type Express, json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

export const setGlobalMiddlewares = (server: Express) => {
  server.use(helmet());
  server.use(cors());
  server.use(json());
};

export const setDevelopmentMiddlewares = (server: Express) => {
  server.use(morgan("dev"));
};
