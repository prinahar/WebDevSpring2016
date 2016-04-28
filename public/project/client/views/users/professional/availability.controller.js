(function() {
    angular
        .module("OnDemandApp")
        .controller("ProfessionalAvailabilityController", professionalAvailabilityController);

    function professionalAvailabilityController($rootScope, $scope, AppointmentService) {
        $rootScope.currentUser = $scope.currentUser;
        var service = $rootScope.service;
        $scope.time = "";

        $scope.createAvailAppointment = createAvailAppointment;

        function createAvailAppointment() {
            if ($scope.time !== "") {
                var appointment = {
                    professionalId: $scope.currentUser._id,
                    time: $scope.time
                }

                AppointmentService.createAvailAppointment(appointment)
                    .then(
                        function (docs) {
                            console.log(docs);
                            $scope.message = "Successfully created availability " + $scope.time;
                        }
                    )
            } else {
                $scope.message = "Please select a valid time."
            }
        }

    }
})();