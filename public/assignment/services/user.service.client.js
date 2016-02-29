(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService ($rootScope) {
        var model = {
            users: [
                {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["student"]		},
                {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
                {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
                {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ]
    }


        var service = {
            findAllUsers : findAllUsers,
            findUserByCredentials : findUserByCredentials,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser

        };

        return service;

        function findAllUsers(callback)
        {
            return model.users;
        }

        function findUserByCredentials(username, password, callback)
        {
            for(var userIndex in model.users) {
                var user = model.users[userIndex];
                if((user.username === username) && (user.password === password)) {
                    return model.users[userIndex];
                }
            }
            return null;
        }
        function createUser(user, callback)
        {
            var newUser = {
                _id : (new Date).getTime(),
                firstName : user.firstName,
                lastName : user.lastName,
                username : user.username,
                password : user.password,
                roles : user.roles
            }
            model.users.push(newUser);
            return newUser;
        }
        function deleteUserById(userId, callback)
        {
            var userIndex = findUserIndexById(userId);
            model.users.splice(userIndex, 1);
        }
        function updateUser(userId, user, callback)
        {
            for(var userIndex in model.users) {
                var userById = model.users[userIndex];
                if(userById._id == userId) {
                    userById = user;
                    return userById;
                }
            }
        }
        function findUserIndexById(userId) {
            for(var userIndex in model.users) {
                var user = model.users[userIndex];
                if(user._id == userId) {
                    return userIndex;
                }
            }
        }
    }

})();