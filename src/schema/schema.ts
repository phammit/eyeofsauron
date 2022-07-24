import mongoose, { Schema } from 'mongoose';
import 'reflect-metadata'; //import b/f type-graphql for type reflection
import { Field, ObjectType, InputType, ID, Resolver, Query, Arg, Args, buildSchema, Mutation, ArgsType } from 'type-graphql';
import { TestUserService } from '../util/testUserService';

//test with data structure from testUser.ts 
//          name: string, address: string
//using TypeScript classes and decorators.. using TypeGraphLQL
//https://www.npmjs.com/package/type-graphql  or https://typegraphql.com/
//for graphql sandbox - studio.apollographql.com/sandbox
@ObjectType()
export class TestUser {
    @Field(type => ID)
    _id: Schema.Types.ObjectId

    @Field()
    name: string

    @Field()
    address: string
}

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
@Resolver(TestUser)
export class TestUserResolver {
    //dependecy injecction
    //constructor(private testUserService: TestUserService) {}
    testUserService = new TestUserService();

    @Query(returns => [TestUser])
    async testUser(@Arg("name", {defaultValue: "John"}) name: string,) : Promise<TestUser[]> {
        console.log("you have reached the resolver, now attempting to connect to testUserService");
        const value = await this.testUserService.findUser(name);
        console.log("value is: ", value);
        return value;
    }

    @Mutation(() => TestUser)
    async addUser(
            //@Arg('_id') _id: Schema.Types.ObjectId,
            @Arg('name') name: string,
            @Arg('address') address: string
    ) {
        console.log("Welcome to TestUserResolver mutation class addUser");
        //for more complex app... make resolvers into a thin routing layer by putting business logic in one place -> data sources or model objects
        //https://www.apollographql.com/docs/apollo-server/security/authentication/
        const newUser = Object.assign(new TestUser(), {
            _id: new mongoose.Types.ObjectId(),
            name: name,
            address: address
        });
        console.log("this is the newUser I am trying to update: ", newUser);
        await this.testUserService.addUser(newUser);
        return newUser;
    }
}

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