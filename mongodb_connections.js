const mongoose = require('mongoose');

function startMongoDB() {
    // connect to the database
    mongoose.connect('mongodb://localhost:27017/the_fold', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

function User() {
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

function AuthToken() {

}
function GoogleLogin() {

}
function Ward() {

}
function WardAdmin() {

}

module.exports = {
    startMongoDB: startMongoDB,
    User: User,
    AuthToken: AuthToken,
    GoogleLogin: GoogleLogin,
    Ward: Ward,
    WardAdmin: WardAdmin,
  };