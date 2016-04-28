(function() {
    angular
        .module("OnDemandApp")
        .controller("UpcomingCustomerController", UpcomingCustomerController);

    function UpcomingCustomerController(AppointmentService, $scope, $rootScope) {

        $scope.currentUser = $rootScope.currentUser;

        function init() {
            AppointmentService.findAppointmentsByUser($scope.currentUser._id, 'customer')
                .then(
                    function (response) {
                        if (response.data) {
                            $scope.appointments = response.data;
                        } else {
                            $scope.message = "No appointments yet!";
                        }
                    }
                )
        }

        init();
    }

})();




