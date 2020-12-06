const mongoose = require('mongoose');

function startMongoDB() {
    // connect to the database
    mongoose.connect('mongodb://localhost:27017/the_fold', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

function User() {
    // Create a scheme.
    const userSchema = new mongoose.Schema({
        UserID: Number,
        FullName: String,
        Email: String,
    });
    
    // Create a model.
    const user = mongoose.model('User', userSchema);
    return user;
}

function AuthToken() {
    // Create a scheme.
    const authTokenSchema = new mongoose.Schema({
        AuthTokenID: Number,
        AuthToken: String,
        UserID: Number
    });
    
    // Create a model.
    const authToken = mongoose.model('authToken', authTokenSchema);
    return authToken;
}
function GoogleLogin() {
    // Create a scheme.
    const googleLoginSchema = new mongoose.Schema({
        GoogleLoginID: Number,
        GoogleToken: String,
        UserID: Number
    });
    
    // Create a model.
    const googleLogin = mongoose.model('GoogleLogin', googleLoginSchema);
    return googleLogin;
}
function Ward() {
    // Create a scheme.
    const wardSchema = new mongoose.Schema({
        WardID: Number,
        Code: String,
        Name: String,
        ProgramItem: Array
    });
    
    // Create a model.
    const wardLogin = mongoose.model('Ward', wardSchema);
    return wardLogin;
}
function WardAdmin() {
    // Create a scheme.
    const wardAdminSchema = new mongoose.Schema({
        WardAdminID: Number,
        UserID: Number,
        WardID: Number,
    });
    
    // Create a model.
    const wardAdmin = mongoose.model('WardAdmin', wardAdminSchema);
    return wardAdmin;
}

module.exports = {
    startMongoDB: startMongoDB,
    User: User,
    AuthToken: AuthToken,
    GoogleLogin: GoogleLogin,
    Ward: Ward,
    WardAdmin: WardAdmin,
  };