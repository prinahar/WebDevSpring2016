(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService ($rootScope, $http) {

        var service = {
            setUser: setUser,
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername

        };
        return service;

        function setUser(user) {
            $rootScope.user = user;
        }

        function findAllUsers()
        {
            return $http.get("/api/assignment/user");
        }

        function findUserByCredentials(username, password)
        {
            return $http.get("/api/assignment/user?username="+ username + "&password=" + password);
        }

        function createUser(user)
        {
            return $http.post("/api/assignment/user", user);
        }
        function deleteUserById(userId)
        {
           return $http.delete("/api/assignment/user/:" + userId);
        }

        function updateUser(userId, user)
        {
            return $http.put("/api/assignment/user/:" + userId);
        }
        function findUserIndexById(userId) {
            var users = findAllUsers();
            for(var userIndex in users) {
                var user = users[userIndex];
                if(user._id == userId) {
                    return userIndex;
                }
            }
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }
    }

})();