
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser  from 'body-parser';
//import { graphqlHTTP } from 'express-graphql';
//import schema from './schema/schema.ts';
import { createApolloServer } from './apolloServer';

export const bootstrap = async () => {
    const app: Express = express();

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));

    app.get("/", function(req,res) {
        res.send(`Eye of Sauron Watches`);
    })

    const apolloServer = await createApolloServer();
    await apolloServer.start();
    apolloServer.applyMiddleware({app, path: '/graphql'});

    return { app, apolloServer}
};
/** 
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
*/
//export default app;