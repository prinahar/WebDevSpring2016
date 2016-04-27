(function() {
        angular
            .module("OnDemandApp")
            .controller("LoginController", loginController);

    function loginController($scope, $rootScope, UserService, $location) {
        $scope.login = login;

        console.log("Path: " + $location.path())

        function login(user) {
            var role = "";
            if ($location.path() === "/login/customer") {
                role = "customer";
            }
            else if ($location.path() === "/login/professional") {
                role = "professional";
            }

            if (user) {
                var username = user.username;
                var password = user.password;
                if (username == null || password == null) {
                    $rootScope.message = "Please fill in the required fields";
                    return;
                }
                UserService
                    .login({username: username, password: password, role: role})
                    .then(function (response) {
                        console.log("Received Response" + response);
                        if (response) {
                            console.log("Received Response from server" + response.data);
                            UserService.setCurrentUser(response.data);
                            if($rootScope.currentUser.role == "customer") {
                                $location.url("/cust_profile");
                            } else if($rootScope.currentUser.role == "professional"){
                                $location.url("/prof_profile");
                            }
                            else {
                                $rootScope.message = "User does not exist";
                            }
                        }
                        else {
                            $rootScope.message = "Username and password do not match";
                        }
                    });
            } else {
                $rootScope.message = "Please enter username and password";
            }
        }
    }
})();