import { type Express, json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { ApplicationModifier } from "interfaces/module.interface";

export const setGlobalMiddlewares: ApplicationModifier = (application) => {
  application.use(helmet());
  application.use(cors());
  application.use(json());
};

export const setDevelopmentMiddlewares: ApplicationModifier = (
  application: Express
) => {
  application.use(morgan("dev"));
};

export const setProductionMiddlewares: ApplicationModifier = (
  application: Express
) => {
  const limit = rateLimit({ windowMs: 10 * 60 * 1000, max: 600 });

  application.use(limit);
};
