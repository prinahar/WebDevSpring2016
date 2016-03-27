(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, $rootScope, UserService, $location) {
        $scope.login = login;

        function login(username, password) {
            UserService
                .findUserByCredentials(username, password)
                .then(function(response) {
                    if(response.data) {
                        console.log(response.data);
                        UserService.setUser(response.data);
                        $location.url("/profile");
                    }
                });
        }
    }
}());