(function() {
    angular
        .module("OnDemandApp")
        .controller("CustProfileController", custProfileController);

    function custProfileController($rootScope, $scope) {
        $rootScope.customer = $scope.customer;
    }
    //function profileController($scope, UserService, $rootScope) {
    //    //$scope.userId = $routeParams.id;
    //
    //    $scope.user = $rootScope.user;
    //
    //    $scope.update = update;
    //    function update(user) {
    //        $rootScope.user = UserService.updateUser(user._id, user, null);
    //    }
    //
    //}
})();
