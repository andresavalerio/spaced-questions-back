"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
const application = (0, express_1.default)();
const isDevelopment = process.env.NODE_ENV === "development";
if (isDevelopment) {
    (0, middlewares_1.setDevelopmentMiddlewares)(application);
}
(0, middlewares_1.setGlobalMiddlewares)(application);
(0, routes_1.setApplicationRoutes)(application);
exports.default = application;
