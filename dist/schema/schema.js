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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoInput = exports.Todo = exports.User = exports.LNChannel = exports.TestUserResolver = exports.AddUserInput = exports.TestUser = void 0;
require("reflect-metadata"); //import b/f type-graphql for type reflection
const type_graphql_1 = require("type-graphql");
const testUserService_1 = require("../util/testUserService");
//test with data structure from testUser.ts 
//          name: string, address: string
//using TypeScript classes and decorators.. using TypeGraphLQL
//https://www.npmjs.com/package/type-graphql  or https://typegraphql.com/
//for graphql sandbox - studio.apollographql.com/sandbox
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
//defining @Arg types for mutation
let AddUserInput = class AddUserInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddUserInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddUserInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddUserInput.prototype, "address", void 0);
AddUserInput = __decorate([
    (0, type_graphql_1.InputType)()
], AddUserInput);
exports.AddUserInput = AddUserInput;
//need to create a TestUserService to retrieve query from mongoDB
let TestUserResolver = class TestUserResolver {
    constructor() {
        //dependecy injecction
        //constructor(private testUserService: TestUserService) {}
        this.testUserService = new testUserService_1.TestUserService();
    }
    async testUser(name) {
        console.log("you have reached the resolver, now attempting to connect to testUserService");
        const value = await this.testUserService.connect();
        console.log("value is: ", value);
        return await this.testUserService.connect();
    }
    async addUser(id, name, address) {
        console.log("Welcome to TestUserResolver mutation class addUser");
        const newUser = Object.assign(new TestUser(), {
            id: id,
            name: name,
            address: address
        });
        await this.testUserService.addUser(newUser);
        return newUser;
    }
};
__decorate([
    (0, type_graphql_1.Query)(returns => [TestUser]),
    __param(0, (0, type_graphql_1.Arg)("name", { defaultValue: "John" })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TestUserResolver.prototype, "testUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => TestUser),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Arg)('name')),
    __param(2, (0, type_graphql_1.Arg)('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TestUserResolver.prototype, "addUser", null);
TestUserResolver = __decorate([
    (0, type_graphql_1.Resolver)(TestUser)
], TestUserResolver);
exports.TestUserResolver = TestUserResolver;
//for actaul EyeOfSauron data
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
/**
export const createSchema = async () => {

}
*/
/** NOT NEEDED HERE, create schema in apolloServer.ts file
export const schema = buildSchema({
    resolvers: [TestUserResolver],
})
*/ 
