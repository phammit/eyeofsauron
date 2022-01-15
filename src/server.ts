import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req,res) {
    res.send(`Eye of Sauron Watches on port ${PORT}...`);
});

//@TODO add auth middleware
//@TODO add registration page

var server = app.listen(PORT, function () {
    console.log(`Eye of Sauron is watching on port: ${PORT}`);
});