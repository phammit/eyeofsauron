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
exports.TestUser = void 0;
require("reflect-metadata"); //import b/f type-graphql for type reflection
const type_graphql_1 = require("type-graphql");
const mongoose_1 = require("mongoose");
//using TypeScript classes and decorators.. using TypeGraphLQL
//https://www.npmjs.com/package/type-graphql  or https://typegraphql.com/
//for graphql sandbox - studio.apollographql.com/sandbox
let TestUser = class TestUser {
};
__decorate([
    (0, type_graphql_1.Field)(type => mongoose_1.Types.ObjectId),
    __metadata("design:type", String)
], TestUser.prototype, "_id", void 0);
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
