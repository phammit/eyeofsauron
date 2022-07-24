//import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { TestUser, TestUserResolver } from "./schema/schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
//import { buildSchema } from "type-graphql";
import { Field, ObjectType, InputType, ID, Resolver, Query, Arg, Args, buildSchema } from 'type-graphql';
import { Schema } from "mongoose";

import http from 'http';
import "dotenv/config";
//import { buildSchema } from "graphql";

//imported to test functionality
import { TestUserService } from './util/testUserService';
const testUserService: TestUserService = new TestUserService();

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

    /** 
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
    */

    //defining schema
    @ObjectType()
    export class User {
        @Field(type => Schema.Types.ObjectId)
        _id: string

        @Field()
        name: string

        @Field()
        address: string
    }

    /** 
    //defining resolver
    @Resolver(User)
    export class TestResolver {
        @Query(returns => [User])
        async testUser(@Arg("name", {defaultValue: "John"}) name: string) {
            const items = mockData.filter(item => 
                item.name === "John"
            );
            console.log(mockData[0].address);

            const item = [{
                id: "234jhkdsf98u32hjl",
                name: "Name of Test",
                address: "2810 Test Ave"
            }];
            return items;
        }
    }
    */

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


export const createSchema = async () => {
    //const resolvers: any[] = [TestUserResolver];

    try {
        return await buildSchema({
            resolvers: [TestUserResolver],
        });
    } catch (err) {
        throw err;
    }
};


export async function createApolloServer() {

    const schema = await createSchema();
    const apolloServer = new ApolloServer({
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
    console.log("apolloServer created")
    return apolloServer;
}

//for graphql sandbox...go to https://studio.apollographql.com/sandbox/explorer 
//connect to http://localhost:3001/graphql