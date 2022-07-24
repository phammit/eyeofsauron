import 'reflect-metadata'; //import b/f type-graphql for type reflection
import { Field, ObjectType, InputType, ID, Resolver, Query, Arg, Args, buildSchema, Mutation } from 'type-graphql';
import { TestUserService } from '../util/testUserService';
import { Types } from 'mongoose';


//using TypeScript classes and decorators.. using TypeGraphLQL
//https://www.npmjs.com/package/type-graphql  or https://typegraphql.com/
//for graphql sandbox - studio.apollographql.com/sandbox

@ObjectType()
export class TestUser {
    @Field(type => Types.ObjectId)
    _id: string

    @Field()
    name: string

    @Field()
    address: string
}

