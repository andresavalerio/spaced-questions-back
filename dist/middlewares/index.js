"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDevelopmentMiddlewares = exports.setGlobalMiddlewares = void 0;
const express_1 = require("express");
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const setGlobalMiddlewares = (server) => {
    server.use((0, helmet_1.default)());
    server.use((0, cors_1.default)());
    server.use((0, express_1.json)());
};
exports.setGlobalMiddlewares = setGlobalMiddlewares;
const setDevelopmentMiddlewares = (server) => {
    server.use((0, morgan_1.default)("dev"));
};
exports.setDevelopmentMiddlewares = setDevelopmentMiddlewares;
