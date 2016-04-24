
var q = require("q");

module.exports = function(db, mongoose) {

    //load schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    //create high-level API to talk to DB - DAO
    //create user model from schema
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        createUser : createUser,
        deleteUserById: deleteUserById,
        updateUser : updateUser,
        findAllUsers : findAllUsers,
        findUserByUsername: findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        findUserIndexById : findUserIndexById,
        findUserById : findUserById,
        loginUserByCredentials : loginUserByCredentials

    };
    return api;

    //CRUD

    //create
    function createUser(user)
    {
        // use q to defer the response
        var deferred = q.defer();

        UserModel.create(user, function(err, doc){
            if(err) {
                deferred.reject(err);
            } else {
                console.log("Creating new user in model " + doc);
                deferred.resolve(doc);
            }
        });

        // return a promise
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        UserModel.findById(userId, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function loginUserByCredentials(credentials) {
        var deferred = q.defer();
        console.log("Finding in mongoose model");
        UserModel.findOne(
            {
                username : credentials.username,
                password : credentials.password
            },
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    // accepts an object credentials with properties username and password. Returns a single user from the model
    // whose username and password are equal to the username and password properties in the credentials parameter,
    // null otherwise
    function findUserByCredentials(username, password) {
       var deferred = q.defer();

        UserModel.findOne(
            {
                username : username,
                password : password
            },
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    //returns a single user whose username is equal to username parameter, null otherwise
    function findUserByUsername(username) {

        var deferred = q.defer();
        UserModel.findOne(
            {
                username: username
            },

            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find({},
        function(err, docs) {
            if(err) {
                deferred.reject(err);
            } else {
                console.log("fetching all users from model");
                deferred.resolve(docs);
            }
        });
        return deferred.promise;
    }

    /***************/
    //Delete by id
    function deleteUserById(userId) {
        var deferred = q.defer();
        UserModel.findOneAndRemove(
            {_id: userId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    //Update
    function updateUser(userId, user)
    {
        var deferred = q.defer();
        UserModel.findOneAndUpdate(
            {_id: userId},
            user,
            {new: true},
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    //Find User by Id
    function findUserIndexById(userId) {
        for(var userIndex in mock) {
            var user = mock[userIndex];
            if(user._id === userId) {
                return userIndex;
            }
        }
        return null;
    }



}