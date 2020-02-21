const path = require('path');

const express = require('express');
const expressWs = require("express-ws");
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const info = require('./info');
const websocketServer = require('./ws');




const app = express();
expressWs(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.ws("/ws", websocketServer);

app.use('/info', info);

app.use(express.static(path.join(__dirname, '..' ,'build')));


module.exports = app;
