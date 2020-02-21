const db = require('./db');



module.exports = (ws/* , req */) => {

  ws.on("message", msg => {

    if (msg === 'ping') {
      ws.send('pong');
      return;
    }

    try {
      const { type/* , payload */ } = JSON.parse(msg);

      switch (type) {

        case 'subscribe':
          onSubscribe(ws);
          break;

        case 'unsubscribe':
          onUnsubscribe(ws);
          break;

        default:
          console.warn(`unrecognized msg-type: ${type}`);
          return;
      }

    } catch (err) {
      ws.send(JSON.stringify({
        result: `unable to handle message: ${msg}`,
        error: {
          msg: err.message,
          ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack,
          }),
        },
      }));
    }
  });

  ws.on('close', onClose(ws));

};



const subscribers = new Set();

function onSubscribe (ws) {
  db.find({}, (err, data) => {
    if (err) {
      ws.send(JSON.stringify({ error: err }));
    } else {
      ws.send(JSON.stringify({
        success: true,
        data,
      }));
      subscribers.add(ws);
    }
  });
}

function onUnsubscribe (ws) {
  subscribers.delete(ws);
  ws.send(JSON.stringify({
    success: true,
  }));
}

function onClose (ws) {
  return () => subscribers.delete(ws);
}

module.exports.subscribers = subscribers;
