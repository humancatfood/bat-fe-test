const { join } = require('path');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { GraphQLServer, PubSub } = require('graphql-yoga');

const createDB = require('./db');
const resolvers = require('./resolvers');
const { formatError } = require('./middleware');
const typeDefs = require('./schema.graphql');

const info = require('./info');

const { version } = require('./../package.json');

console.log('version: ', version);
console.log('NODE_ENV:', process.env.NODE_ENV);



const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    db: createDB(process.env.DATA_FILE, process.env.ADD_FIXTURES),
    pubsub: new PubSub(),
  },
});


const app = server.express;


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


module.exports.startServer = (options, onStart) => server.start({
  endpoint: '/graphql',
  subscriptions: '/graphql',
  playground: '/graphql',
  formatError,
  ...options,
}, onStart);
