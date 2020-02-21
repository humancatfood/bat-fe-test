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

    } catch {
      console.error(`unable to handle message: ${JSON.stringify(msg, null, 2).slice(0, 100)}`);
    }
  });

  ws.on('close', onClose(ws));

};



const subscribers = new Set();

function onSubscribe (ws) {

  try {
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

  } catch (err) {
    ws.send(JSON.stringify({ error: err }));
  }
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
