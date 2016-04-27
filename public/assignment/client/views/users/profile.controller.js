(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, UserService, $rootScope) {
        $scope.user = $rootScope.user;

        $scope.update = update;
        function update(user) {
            UserService.updateUser(user._id, user);
        }

    }
})();
