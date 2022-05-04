"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = exports.TodoInput = exports.Todo = exports.User = exports.LNChannel = exports.TestUser = void 0;
require("reflect-metadata"); //import b/f type-graphql for type reflection
const type_graphql_1 = require("type-graphql");
//test with data structure from testUser.ts 
//          name: string, address: string
//using TypeScript classes and decorators.. using TypeGraphLQL
//https://www.npmjs.com/package/type-graphql  or https://typegraphql.com/
let TestUser = class TestUser {
};
__decorate([
    (0, type_graphql_1.Field)(type => type_graphql_1.ID),
    __metadata("design:type", String)
], TestUser.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TestUser.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TestUser.prototype, "address", void 0);
TestUser = __decorate([
    (0, type_graphql_1.ObjectType)()
], TestUser);
exports.TestUser = TestUser;
let LNChannel = class LNChannel {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], LNChannel.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], LNChannel.prototype, "transactionId", void 0);
LNChannel = __decorate([
    (0, type_graphql_1.ObjectType)()
], LNChannel);
exports.LNChannel = LNChannel;
let User = class User {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
User = __decorate([
    (0, type_graphql_1.ObjectType)()
], User);
exports.User = User;
let Todo = class Todo {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Todo.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Todo.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Todo.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Todo.prototype, "status", void 0);
Todo = __decorate([
    (0, type_graphql_1.ObjectType)()
], Todo);
exports.Todo = Todo;
let TodoInput = class TodoInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TodoInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TodoInput.prototype, "description", void 0);
TodoInput = __decorate([
    (0, type_graphql_1.InputType)()
], TodoInput);
exports.TodoInput = TodoInput;
const createSchema = async () => {
};
exports.createSchema = createSchema;
