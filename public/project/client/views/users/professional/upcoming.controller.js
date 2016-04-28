(function() {
    angular
        .module("OnDemandApp")
        .controller("UpcomingProfessionalController", UpcomingProfessionalController);

    function UpcomingProfessionalController(AppointmentService, $scope, $rootScope) {

        $scope.currentUser = $rootScope.currentUser;

        function init() {
            AppointmentService.findAppointmentsByUser($scope.currentUser._id, 'professional')
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

