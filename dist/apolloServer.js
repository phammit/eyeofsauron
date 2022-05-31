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
exports.createApolloServer = exports.createSchema = exports.TestResolver = exports.User = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./schema/schema");
//import { buildSchema } from "type-graphql";
const type_graphql_1 = require("type-graphql");
require("dotenv/config");
//import { buildSchema } from "graphql";
//imported to test functionality
const testUserService_1 = require("./util/testUserService");
const testUserService = new testUserService_1.TestUserService();
//apollo-server-express needs to start asynchronously
//the core package for the sever is apollo-server
//go to studio.apollographql.com/sandbox to run graphql queries
const typeDefs = `
    type Query { 
        totalPost: Int
    }
`;
const resolvers = {
    Query: {
        totalPost: () => 42
    },
};
//*****  below are type-graphql basic implementation to get graphql working before hooking up to mongoose models
//mock data
const mockData = [
    {
        id: "1234jdsfo324",
        name: "John",
        address: "some mock data address"
    },
    {
        id: "ljjhlj4359uhsf",
        name: "Monster",
        address: "101 Monster Ave"
    },
    {
        id: "voijnlfd235r98hjknaef",
        name: "Tommy Dang",
        address: "2030 Fenwick"
    }
];
//defining schema
let User = class User {
};
__decorate([
    (0, type_graphql_1.Field)(type => type_graphql_1.ID),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
User = __decorate([
    (0, type_graphql_1.ObjectType)()
], User);
exports.User = User;
//defining resolver
let TestResolver = class TestResolver {
    async testUser(name) {
        const items = mockData.filter(item => item.name === "John");
        console.log(mockData[0].address);
        const item = [{
                id: "234jhkdsf98u32hjl",
                name: "Name of Test",
                address: "2810 Test Ave"
            }];
        return items;
    }
};
__decorate([
    (0, type_graphql_1.Query)(returns => [User]),
    __param(0, (0, type_graphql_1.Arg)("name", { defaultValue: "John" })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TestResolver.prototype, "testUser", null);
TestResolver = __decorate([
    (0, type_graphql_1.Resolver)(User)
], TestResolver);
exports.TestResolver = TestResolver;
/**
export const createSchema = async () => {

    try {
        return await buildSchema({
            resolvers: [TestResolver],
        });
    } catch (err) {
        throw err;
    }

};
*/
//*******  end of type-graphql basic implementation
/**
const schema = async () => {
    await buildSchema({
    resolvers: [TestUserResolver],
})};
*/
const createSchema = async () => {
    //const resolvers: any[] = [TestUserResolver];
    try {
        return await (0, type_graphql_1.buildSchema)({
            resolvers: [schema_1.TestUserResolver],
        });
    }
    catch (err) {
        throw err;
    }
};
exports.createSchema = createSchema;
async function createApolloServer() {
    const schema = await (0, exports.createSchema)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        //typeDefs,
        //resolvers,
        schema,
        /**
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
        */
    });
    //to connect Apollo Server to web framework, depending on the package, this function is applyMiddlewaer, getMiddleware, or createHandler
    //you can call this method instead of listen.  For non-serverless frameworks (express), must call await server.start() b/f calling this method
    //will use applyMiddleware in the app.ts file
    //apolloServer.listen(process.env.APOLLO) //listen not used in this case
    console.log("apolloServer created");
    return apolloServer;
}
exports.createApolloServer = createApolloServer;
//for graphql sandbox...go to https://studio.apollographql.com/sandbox/explorer 
//connect to http://localhost:3001/graphql
