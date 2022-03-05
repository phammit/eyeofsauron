import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createSchema } from "./schema/schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import http from 'http';
import "dotenv/config";

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


export async function createApolloServer() {

    const schema = await createSchema();
    const apolloServer = new ApolloServer({
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
}