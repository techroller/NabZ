const db = require('./db');
const jobStatus = require('./constants').job.status;

const Schema = db.Schema;

const JobSchema = new Schema({
  id: Schema.Types.ObjectId,
  jobId: Schema.Types.String,
  url: Schema.Types.String,
  content: Schema.Types.String,
  status: {
    type: String,
    enum: [jobStatus.PENDING, jobStatus.SUCCESS, jobStatus.FAILED]
  },
  createdAt: Schema.Types.Date,
  updatedAt: Schema.Types.Date
});


JobSchema.pre('save', function (next) {
  const self = this;
  self.createdAt = self.updatedAt = new Date();
  next();
});

JobSchema.pre('update', function () {
  this.update({}, { $set: { updatedAt: new Date() } });
});

const Job = db.model('Job', JobSchema);

module.exports = Job;