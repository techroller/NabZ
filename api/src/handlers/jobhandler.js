const
  publisher = require('../services/publisher'),
  Job = require('../model/job'),
  jobStatus = require('../model/constants').job.status,
  _ = require('lodash');

module.exports = {

  getJob: (req, res) => {

    const jobId = req.params.id;
    Job.findById(jobId).then(job => {
      if (job) {
        res.json(job);
      } else {
        res.status(404).send();
      }
    }).catch(err => {
      console.log('Error fetching job by id:', err);
      rreseq.status(500).send();
    });
  },

  // Handles the POST of a new URL to Nab
  createJob: (req, res) => {
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
  },

  listJobs: (req, res) => {
    Job.find().then(jobs => {
      res.json(jobs);
    });
  },

  deleteJob: (req, res) => {
    const jobId = req.params.id;
    Job.findById(jobId).remove().then(x => {
      res.status(204).send();
    });
  },
}