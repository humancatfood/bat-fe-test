const {startServer} = require('./app');


const port = normalizePort(process.env.SERVER_PORT || process.env.PORT || '3000');
const debug = process.env.NODE_ENV === 'development';
const onStart = ({ port }) => global.console.log(`Server listening on port ${port}`);


startServer({ port, debug }, onStart);



function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
