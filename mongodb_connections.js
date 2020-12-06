const mongoose = require('mongoose');

function startMongoDB() {
    // connect to the database
    mongoose.connect('mongodb://localhost:27017/the_fold', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

function createUserTable() {
    // Create a scheme for items in the museum: a title and a path to an image.
    const userSchema = new mongoose.Schema({
        UserID: Number,
        FullName: String,
        Email: String,
    });
    
    // Create a model for items in the museum.
    const user = mongoose.model('User', userSchema);
    return user;
}

module.exports = {
    startMongoDB: startMongoDB,
    createUserTable: createUserTable
  };