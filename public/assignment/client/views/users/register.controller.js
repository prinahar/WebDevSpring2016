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
                UserService.registerUser(user)
                .then(function(response) {
                    UserService.setUser(response.data);
                    $location.url("/profile");
                });
            };
            $location.url("/profile");
        }
    }

})();
