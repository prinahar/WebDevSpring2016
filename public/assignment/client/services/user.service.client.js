(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService ($rootScope, $http) {

        var service = {
            setCurrentUser: setCurrentUser,
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            registerUser: registerUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            login : login,
            logout : logout,
            createUser : createUser
        };

        return service;

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function findAllUsers()
        {
            return $http.get("/api/assignment/users");
        }

        function findUserByCredentials(username, password)
        {
            return $http.get("/api/assignment/user?username="+ username + "&password=" + password);
        }

        function registerUser(user)
        {
            return $http.post("/api/assignment/register", user);
        }

        function deleteUserById(userId)
        {
           return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(userId, user)
        {
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function findUserIndexById(userId)
        {
            var users = findAllUsers();
            for(var userIndex in users) {
                var user = users[userIndex];
                if(user._id == userId) {
                    return userIndex;
                }
            }
        }

        function findUserByUsername(username)
        {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function login(user)
        {
            return $http.post("/api/assignment/login", user);
        }

        function logout()
        {
            return $http.post('/api/assignment/logout');
        }

        function createUser(user)
        {
            return $http.post("/api/assignment/user", user);
        }
    }

})();