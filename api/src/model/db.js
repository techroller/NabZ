const mongoose = require('mongoose');
const mongoHost = process.env.MONGO_HOST;
const dbName = process.env.MONGO_DB_NAME;
const connectionString = "mongodb://" + mongoHost + "/" + dbName;

// Ensures Mongoose is always initialized and a connection is available when needed.

mongoose.connect(connectionString, {
  poolSize: 4,
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection is open: ', connectionString);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', (signal) => {
  console.log('Application closing. Terminating Mongoose connections ...');
  mongoose.connection.close(() => {
    console.warn('Mongoose connections have been closed due to application termination: signal [SIGINT]');
    process.exit(0);
  });
})

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

module.exports = mongoose;