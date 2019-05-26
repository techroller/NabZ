const
  queue = require('./queue'),
  Promise = require('promise'),
  _ = require('lodash'),
  queueConfig = require('./config').queue;

module.exports = {
  publish: (payload) => {
    const message = {
      qname: queueConfig.primary.qname,
      message: JSON.stringify(payload)
    };

    return queue.sendMessageAsync(message).then(res => {
      console.log('Published message for processing:', res);
      return res;
    });
  },
  publishFailed: (payload) => {
    const message = _.assign({
      message: JSON.stringify(payload)
    }, queueConfig.dlq);
    return queue.sendMessageAsync(message).then(res => {
      console.warn('Published dead message to DLQ:', res);
      return true;
    });
  }
};