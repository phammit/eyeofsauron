"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApolloServer = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./schema/schema");
require("dotenv/config");
//apollo-server-express needs to start asynchronously
//the core package for the sever is apollo-server
const typeDefs = `
    type Query { 
        totalPost: Int!
    }
`;
const resolvers = {
    Query: {
        totalPost: () => 42,
    },
};
function createApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = yield (0, schema_1.createSchema)();
        const apolloServer = new apollo_server_express_1.ApolloServer({
            typeDefs,
            resolvers,
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
        return apolloServer;
    });
}
exports.createApolloServer = createApolloServer;
