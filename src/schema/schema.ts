import 'reflect-metadata'; //import b/f type-graphql for type reflection
import { Field, ObjectType, InputType } from 'type-graphql';








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