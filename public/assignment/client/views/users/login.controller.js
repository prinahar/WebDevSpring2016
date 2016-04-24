(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, $rootScope, UserService, $location) {
        $scope.login = login;

        function login(user) {
            if (user) {
                var username = user.username;
                var password = user.password;
                if (username == null || password == null) {
                    $rootScope.message = "Please fill in the required fields";
                    return;
                }
                UserService
                    .login({username: username, password: password})
                    .then(function (response) {
                        console.log("Received Response" + response);
                        if (response) {
                            console.log("Received Response" + response);
                            UserService.setCurrentUser(response.data);
                            $location.url("/profile");
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