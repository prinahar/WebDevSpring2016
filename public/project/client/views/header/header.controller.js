(function() {
    angular
        .module("OnDemandApp")
        .controller("HeaderController", headerController);

    function headerController($scope, $rootScope, UserService, $location) {

        $scope.logout = logout;

        function logout() {
            UserService.logout()
                .then(
                    function (response) {
                        UserService.setCurrentUser(null);
                        $location.url("/home");
                    }
                )
        }
    }
})();
