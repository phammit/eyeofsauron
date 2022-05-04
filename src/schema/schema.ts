import 'reflect-metadata'; //import b/f type-graphql for type reflection
import { Field, ObjectType, InputType, ID } from 'type-graphql';

//test with data structure from testUser.ts 
//          name: string, address: string
//using TypeScript classes and decorators.. using TypeGraphLQL
//https://www.npmjs.com/package/type-graphql  or https://typegraphql.com/
@ObjectType()
export class TestUser {
    @Field(type => ID)
    id: string

    @Field()
    name: string

    @Field()
    address: string
}


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

export const createSchema = async () => {

}