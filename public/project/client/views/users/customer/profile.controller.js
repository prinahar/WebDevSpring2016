(function() {
    angular
        .module("OnDemandApp")
        .controller("CustProfileController", custProfileController);

    function custProfileController($rootScope, $scope, CustomerService) {
        $rootScope.currentUser = $scope.currentUser;

        $scope.update = update;
        function update(currentUser) {
            CustomerService.updateCustomer(currentUser._id, currentUser);
        }

    }
})();
