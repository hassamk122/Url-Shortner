const mongoose = require('mongoose');

async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url, {
      maxPoolSize: 10,       // improves connection pooling
    });
    console.log("MongoDB connected successfully!");
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // stop server if DB fails to connect
  }
}

module.exports = connectToMongoDB;
