const { resolve, join } = require('path');
const { readFileSync } = require('fs');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { GraphQLServer, PubSub } = require('graphql-yoga');

const createDB = require('./db');
const resolvers = require('./resolvers');
const { formatError } = require('./middleware');
const typeDefs = readFileSync(resolve(__dirname, './schema.gql'), 'utf8');

const info = require('./info');

const { version } = require('./../package.json');

console.log('version: ', version);
console.log('NODE_ENV:', process.env.NODE_ENV);



const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    db: createDB(),
    pubsub: new PubSub(),
  },
});


const app = server.express;


app.use(cors('http://localhost:3000'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/info', info);

app.use(express.static(join(__dirname, '..' ,'build')));



module.exports.startServer = (options, onStart) => server.start({
  endpoint: '/graphql',
  subscriptions: '/graphql',
  playground: '/graphql',
  formatError,
  ...options,
}, onStart);
