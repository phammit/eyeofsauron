"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const inversifly_config_1 = __importDefault(require("./inversifly.config"));
//import { graphqlHTTP } from 'express-graphql';
//import schema from './schema/schema.ts';
const apolloServer_1 = require("./apolloServer");
const bootstrap = async () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.get("/", function (req, res) {
        res.send(`Eye of Sauron Watches`);
    });
    const apolloServer = await (0, apolloServer_1.createApolloServer)();
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: '/graphql' });
    return { app, container: inversifly_config_1.default, apolloServer };
};
exports.bootstrap = bootstrap;
/**
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
*/
//export default app;
