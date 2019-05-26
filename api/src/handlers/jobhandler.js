const
  publisher = require('../services/publisher'),
  Job = require('../model/job'),
  jobStatus = require('../model/constants').job.status,
  _ = require('lodash');

module.exports = {

  // Handles the POST of a new URL to Nab
  handleSubmitNewJob: (req, res, next) => {
    let message = _.assign({
      status: jobStatus.PENDING 
    }, req.body);

    Job.create(message).then(job => {
      return publisher.publish(job).then(jobId => {
        console.log('Added job to the queue: jobId: [' + jobId + ']');
        job.jobId = jobId;
        return job;
      }).catch(err => {
        console.error('error publishing message:', err);
      });
    }).then(job => {
      Job.update(job)
      return job;
    })
      .then(job => res.status(201).send(job))
      .catch(err => res.status(500).send('Error creating new job: ' + err + ''));
  }
}