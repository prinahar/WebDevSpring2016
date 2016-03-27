var mock = require("./user.mock.json");

module.exports = function(app) {

    var api = {
        createUser : createUser,
        deleteUserById: deleteUserById,
        updateUser : updateUser,
        findAllUsers : findAllUsers,
        findUserByUsername: findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        findUserIndexById : findUserIndexById,
        findUserById : findUserById

    };
    return api;

    //CRUD

    //create
    function createUser(user)
    {
        var newUser = {
            _id : (new Date).getTime(),
            firstName : user.firstName,
            lastName : user.lastName,
            username : user.username,
            password : user.password
        }
        mock.push(newUser);
        return newUser;
    }

    //Delete by id
    function deleteUserById(userId)
    {
        var userIndex = findUserIndexById(userId);
        mock.splice(userIndex, 1);
    }

    //Update
    function updateUser(userId, user)
    {
        for(var userIndex in mock) {
            var userById = mock[userIndex];
            if(userById._id === userId) {
                userById = user;
                return userById;
            }
        }
        return null;
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

    //returns a single user whose username is equal to username parameter, null otherwise
    function findUserByUsername(username) {
        for(var userIndex in mock) {
            var user = mock[userIndex];
            if(user.username === username) {
                return user;
            }
        }
        return null;
    }

    // accepts an object credentials with properties username and password. Returns a single user from the model
    // whose username and password are equal to the username and password properties in the credentials parameter,
    // null otherwise
    function findUserByCredentials(username, password) {
        for(var userIndex in mock) {
            var user = mock[userIndex];
            if(user.username === username &&
                user.password === password) {
                return user;
            }
        }
        return null;
    }

    function findAllUsers() {
        return mock;
    }

    function findUserById(userId) {
        for(var userIndex in mock) {
            var user = mock[userIndex];
            if(user._id === userId) {
            return user;
            }
        }
        return null;
    }

}