(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, UserService, $rootScope, $location) {

        $scope.register = register;
        function register(user) {
            if(user) {
                console.log("register");
                $rootScope.user = UserService.createUser(user, null);
                $location.url("/profile");
            }
        }
    }

})();
