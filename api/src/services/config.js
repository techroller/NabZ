const
  NAMESPACE = 'nabz',
  QUEUE_NAME = 'sites';

const sitesDLQ = 'dlq_' + QUEUE_NAME;

const mongoHost = process.env.MONGO_HOST;
const dbName = process.env.MONGO_DB_NAME;
const connectionString = 'mongodb://' + mongoHost + '/' + dbName;

module.exports = {
  queue: {
    primary: {
      qname: QUEUE_NAME,
      rtqname: NAMESPACE + ':rt:' + QUEUE_NAME 
    },
    dlq: {
      qname: sitesDLQ,
      rtqname: NAMESPACE + ':rt:' + sitesDLQ
    },
    connection: {
      host: process.env.REDIS_HOST,
      port: 6379,
      ns: NAMESPACE,
      realtime: true
    }
  },
  mongo: {
    connectionString: connectionString
  }
};