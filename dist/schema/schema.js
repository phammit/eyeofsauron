"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestUserResolver = exports.TestUser = void 0;
const mongoose_1 = __importStar(require("mongoose"));
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
    __metadata("design:type", mongoose_1.Schema.Types.ObjectId)
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
/**
@ArgsType()
class GetUserArgs {
    @Field(type => string, {defaultValue: "John"})
    name: string;

    @Field(type => string, {defulatValue: "2810 Deerwood"})
    address: string;
}
*/
/**
//defining @Arg types for mutation
@InputType()
export class AddUserInput implements Partial<TestUser> {
    @Field()
    _id: Schema.Types.ObjectId

    @Field()
    name: string

    @Field()
    address: string
}
*/
//need to create a TestUserService to retrieve query from mongoDB
let TestUserResolver = class TestUserResolver {
    constructor() {
        //dependecy injecction
        //constructor(private testUserService: TestUserService) {}
        this.testUserService = new testUserService_1.TestUserService();
    }
    async testUser(name) {
        console.log("you have reached the resolver, now attempting to connect to testUserService");
        const value = await this.testUserService.findUser(name);
        console.log("value is: ", value);
        return value;
    }
    async addUser(
    //@Arg('_id') _id: Schema.Types.ObjectId,
    name, address) {
        console.log("Welcome to TestUserResolver mutation class addUser");
        //for more complex app... make resolvers into a thin routing layer by putting business logic in one place -> data sources or model objects
        //https://www.apollographql.com/docs/apollo-server/security/authentication/
        const newUser = Object.assign(new TestUser(), {
            _id: new mongoose_1.default.Types.ObjectId(),
            name: name,
            address: address
        });
        console.log("this is the newUser I am trying to update: ", newUser);
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
    __param(0, (0, type_graphql_1.Arg)('name')),
    __param(1, (0, type_graphql_1.Arg)('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TestUserResolver.prototype, "addUser", null);
TestUserResolver = __decorate([
    (0, type_graphql_1.Resolver)(TestUser)
], TestUserResolver);
exports.TestUserResolver = TestUserResolver;
/**
//for actaul EyeOfSauron data
@ObjectType()
export class LNChannel {
    @Field()
    id: number

    @Field()
    transactionId: number
}

@ObjectType()
export class User {
    @Field()
    id: number


}

@ObjectType()
export class Todo {
    @Field()
    id: number

    @Field()
    title: string

    @Field()
    description: string

    @Field()
    status: boolean
}

@InputType()
export class TodoInput implements Partial<Todo> {
    @Field()
    title: string

    @Field()
    description: string
}
*/
/**
export const createSchema = async () => {

}
*/
/** NOT NEEDED HERE, create schema in apolloServer.ts file
export const schema = buildSchema({
    resolvers: [TestUserResolver],
})
*/ 
