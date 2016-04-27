//these services are only used to login and logout
(function() {
    angular
        .module("OnDemandApp")
        .factory("UserService", userService);

    function userService ($rootScope, $http) {

        var service = {
            setCurrentUser : setCurrentUser,
            login : login,
            logout : logout
        }

        return service;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function login(user)
        {
            return $http.post("/api/project/login", user);
        }

        function logout()
        {
            return $http.post('/api/project/logout');
        }

        //function findAllUsers()
        //{
        //    return $http.get("/api/project/users");
        //}
        //
        //function registerUser(user)
        //{
        //    return $http.post("/api/project/register", user);
        //}
        //
        //function deleteUserById(userId)
        //{
        //    return $http.delete("/api/project/user/" + userId);
        //}
        //
        //function updateUser(userId, user)
        //{
        //    return $http.put("/api/project/user/" + userId, user);
        //}
        //
        //function findUserIndexById(userId)
        //{
        //    var users = findAllUsers();
        //    for(var userIndex in users) {
        //        var user = users[userIndex];
        //        if(user._id == userId) {
        //            return userIndex;
        //        }
        //    }
        //}
        //
        //function findUserByUsername(username)
        //{
        //    return $http.get("/api/project/user?username=" + username);
        //}

        //function createUser(user)
        //{
        //    return $http.post("/api/project/user", user);
        //}
    }

})();
