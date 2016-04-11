
module.exports = function(mongoose) {

    //use mongoose to declare userschema
    var UserSchema = mongoose.Schema({
        username : String,
        password : String,
        firstName : String,
        lastName : String,
        emails : [String],
        phones :[String]
    },
        {collection : 'user'});

    return UserSchema;
}