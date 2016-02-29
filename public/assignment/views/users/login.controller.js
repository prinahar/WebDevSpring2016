(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, $rootScope, UserService, $location) {
        $scope.login = login;

        function login(user) {
            console.log(user.username);
            var foundUser = UserService.findUserByCredentials( user.username, user.password, null);

            if(foundUser) {
                console.log("found it");
                $rootScope.user = foundUser;
                $location.url("/profile");
            }
        }

    }
})();