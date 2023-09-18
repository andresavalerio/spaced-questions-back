import { type Express } from "express";

export type ApplicationModifier = (application: Express) => void;
