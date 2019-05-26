const
  redis = require('redis'),
  RedisSMQ = require('rsmq'),
  jobWorker = require('./worker'),
  queueConfig = require('./config').queue;

const client = redis.createClient(queueConfig.connection.port, queueConfig.connection.host);

const connection = {
  client: client,
  realtime: true
};
const rsmq = new RedisSMQ(connection);

rsmq.createQueueAsync(queueConfig.primary).then(res => {
  if (res === 1) {
    console.log('Successfully created queue: ' + queueConfig.primary.qname);
  }
}).catch(err => {
  console.error('Error creating queue: ' + queueConfig.primary.qname, err);
});

rsmq.createQueueAsync(queueConfig.dlq).then(res => {
  if (res === 1) {
    console.log('Successfully created DLQ at "' + queueConfig.dlq.qname + '" ...');
  }
}).catch(err => {
  console.error('Error creating new DLQ', err);
});

client.subscribe(queueConfig.primary.rtqname);
client.on('message', (message) => {
  console.log('Receiving message on: ', message);
  rsmq.receiveMessage({ qname: queueConfig.primary.qname }, jobWorker.receiveJobMessageHandler(rsmq, queueConfig));
})

// rsmq.receiveMessage({qname: queueConfig.primary.qname}, jobWorker.receiveJobMessageHandler(rsmq, queueConfig));
// rsmq.receiveMessage({qname: queueConfig.dlq.qname}, jobWorker.receiveDLQMessageHandler(rsmq, queueConfig));

module.exports = rsmq;