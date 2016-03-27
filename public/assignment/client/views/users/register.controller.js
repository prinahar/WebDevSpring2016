(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, UserService, $rootScope, $location) {

        $scope.register = register;
        $scope.user = {};
        function register(user) {
            if(user) {
                console.log("register");
                UserService.createUser(user)
                .then(function(response) {
                    if(response.data) {
                        UserService.findUserByUsername(user.username)
                        .then(function(response) {
                            UserService.setUser(response.data);
                            $location.url("/profile");
                        });
                    }
                });
                $location.url("/profile");
            }
        }
    }

})();
