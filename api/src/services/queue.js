const
  redis = require('redis'),
  RedisSMQ = require('rsmq'),
  jobWorker = require('./worker'),
  queueConfig = require('./config').queue;

const pubClient = redis.createClient(queueConfig.connection.port, queueConfig.connection.host);

const connection = {
  client: pubClient,
  ns: queueConfig.connection.ns,
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

const subscribeClient = redis.createClient(queueConfig.connection.port, queueConfig.connection.host);
subscribeClient.subscribe(queueConfig.primary.rtqname);
subscribeClient.on('message', (qname) => {
  console.log('Receiving message on: ', qname);
  rsmq.receiveMessage({ qname: queueConfig.primary.qname }, jobWorker.receiveJobMessageHandler(rsmq, queueConfig));
});

module.exports = rsmq;