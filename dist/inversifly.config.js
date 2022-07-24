"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
const testUserService_1 = require("./util/testUserService");
//???need to import TYPES for TestUserService
const container = new inversify_1.Container();
container.bind(testUserService_1.TestUserService).to(testUserService_1.TestUserService);
//container.bind
exports.default = container;
