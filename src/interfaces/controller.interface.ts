import { Router } from "express";

export interface IController {
  getRouter(router: Router): void;
}
