import { join } from 'path';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { ApolloServer, PubSub } from 'apollo-server-express';

import {createDB} from './db';
import {resolvers} from './resolvers';
import typeDefs from './schema.graphql';
import { formatError } from './middleware';

import info from './info';

import { version } from './../../../../package.json';


global.console.log('version: ', version);
global.console.log('NODE_ENV:', process.env.NODE_ENV);



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    db: createDB(process.env.DATA_FILE, process.env.ADD_FIXTURES),
    pubsub: new PubSub(),
  },
});



const app = express();
server.applyMiddleware({ app });


app.use(cors('http://localhost:3000'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(join(__dirname, '..' ,'build')));

app.use('/info', info);

app.use('*', (request, response, next) => {
  if (request.originalUrl === '/graphql') {
    next();
  } else {
    response.sendFile(join(__dirname, '..', 'build', 'index.html'));
  }
});

const defaultOptions = {
  endpoint: '/graphql',
  subscriptions: '/graphql',
  playground: '/graphql',
  formatError,
  port: 3000,
};

export const startServer = ({onStart, ...options}={}) => app.listen({
  ...defaultOptions,
  ...options,
}, onStart);
