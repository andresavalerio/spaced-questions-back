import { type Express, json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

export const setGlobalMiddlewares = (server: Express) => {
  server.use(helmet());
  server.use(cors());
  server.use(json());
};

export const setDevelopmentMiddlewares = (server: Express) => {
  server.use(morgan("dev"));
};

export const setProductionMiddlewares = (server: Express) => {
  const limit = rateLimit({ windowMs: 10 * 60 * 1000, max: 600 });

  server.use(limit);
};
