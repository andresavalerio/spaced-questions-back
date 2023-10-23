import { type Express, type Router } from "express";

export type ApplicationModifier = (application: Express) => void;
export type RouterModifier = (application: Router) => void;
