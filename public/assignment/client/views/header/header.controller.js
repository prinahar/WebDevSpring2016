(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, UserService) {
        var vm = this;

        vm.$scope = $scope;
        vm.logout = logout;

        //$scope.$location = $location;
        $scope.logout = logout;

        function init() {
            vm.$location = $location;
        }
        init();

        function logout() {
            UserService.logout()
                .then(
                    function(response) {
                        UserService.setCurrentUser(null);
                        $location.url("/home");
                    }
                )

        }
    }
})();
