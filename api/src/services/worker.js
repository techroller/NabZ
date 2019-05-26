const
  _ = require('lodash'),
  Axios = require('axios'),
  Job = require('../model/job'),
  jobStatus = require('../model/constants').job.status;

module.exports = {
  receiveJobMessageHandler: (queue, queueConfig) => (err, resp) => {
    if (err) {
      console.error('Error attempting to receive message:', err);
    } else {
      if (resp && resp.id) {
        const payload = _.assign({
          jobId: resp.id,
        }, JSON.parse(resp.message));

        let url = payload.url;
        Axios.get(url, {
          responseType: 'text',
          validStatus: (status) => {
            return status / 100 == 2;
          }
        }).then(res => {
          const content = res.data;
          return Job.updateOne({ id: payload.id }, {
            jobId: resp.id,
            content: content,
            status: jobStatus.SUCCESS
          }).then(job => {
            return queue.deleteMessageAsync({ id: resp.id, qname: queueConfig.primary.qname }).then(res => {
              return _.assign({ status: jobStatus.SUCCESS }, payload);
            }).catch(err => {
              console.error('Failed deleting message from queue:', resp.id, err);
            });
          }).catch(err => {
            console.error('Error updating Job record:', err);
          });
        }).catch(err => {
          const response = err.response;
          const status = response.status / 100;

          switch (status) {
            case 5:
              console.warn('Received an error from the server: ', response.status, err.message);
              break;
            case 3:
              console.warn('Not following redirects...', response.status, err.message);
              break;
            case 4:
              console.warn('Woops, we can\'t do that...', response.status, err.message);
          }
          return Job.updateOne({ id: resp.id }, {
            status: jobStatus.FAILED
          }).then(job => {
            return _.assign({
              status: jobStatus.FAILED
            }, payload);
          });
        });
      }
    }
  },
  receiveDLQMessageHandler: (queue, queueConfig) => (err, resp) => {
    if (err) {
      console.error('Error attempting to receive DLQ message:', err);
    } else {
      if (resp && resp.id) {
        console.warn('Receiving DLQ message. Not handling it at the moment');
        console.warn(message);
      }
    }
  }
};