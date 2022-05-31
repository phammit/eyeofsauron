import 'reflect-metadata'; //import b/f type-graphql for type reflection
import { Field, ObjectType, InputType, ID, Resolver, Query, Arg, Args, buildSchema, Mutation } from 'type-graphql';
import { TestUserService } from '../util/testUserService';

//test with data structure from testUser.ts 
//          name: string, address: string
//using TypeScript classes and decorators.. using TypeGraphLQL
//https://www.npmjs.com/package/type-graphql  or https://typegraphql.com/
//for graphql sandbox - studio.apollographql.com/sandbox
@ObjectType()
export class TestUser {
    @Field(type => ID)
    id: string

    @Field()
    name: string

    @Field()
    address: string
}

//defining @Arg types for mutation
@InputType()
export class AddUserInput implements Partial<TestUser> {
    @Field()
    id: string

    @Field()
    name: string

    @Field()
    address: string
}

//need to create a TestUserService to retrieve query from mongoDB
@Resolver(TestUser)
export class TestUserResolver {
    //dependecy injecction
    //constructor(private testUserService: TestUserService) {}
    testUserService = new TestUserService();

    @Query(returns => [TestUser])
    async testUser(@Arg("name", {defaultValue: "John"}) name: string) {
        console.log("you have reached the resolver, now attempting to connect to testUserService");
        const value = await this.testUserService.connect();
        console.log("value is: ", value);
        return await this.testUserService.connect();
    }

    @Mutation(() => TestUser)
    async addUser(
            @Arg('id') id: string,
            @Arg('name') name: string,
            @Arg('address') address: string
    ) {
        console.log("Welcome to TestUserResolver mutation class addUser");
        const newUser = Object.assign(new TestUser(), {
            id: id,
            name: name,
            address: address
        });
        await this.testUserService.addUser(newUser);
        return newUser;
    }
}

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

/** 
export const createSchema = async () => {

}
*/

/** NOT NEEDED HERE, create schema in apolloServer.ts file
export const schema = buildSchema({
    resolvers: [TestUserResolver],
})
*/