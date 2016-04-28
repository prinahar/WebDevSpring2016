
(function() {
    angular
        .module("OnDemandApp")
        .controller("AppointmentBookingController", appointmentBookingController);

    function appointmentBookingController($rootScope, $scope, AppointmentService, ProfessionalService, $location) {
        $rootScope.currentUser = $scope.currentUser;
        $scope.professionals = [];
        $scope.appointments = [];
        $scope.services = {};
        $scope.currentProfessionalJSON = "";
        $scope.currentProfessional = {};
        $scope.currentService = "";
        $scope.currentAppointmentId = "";
        $scope.message = null;

        $scope.$watch('currentProfessionalJSON', function() {
            $scope.currentProfessional = angular.fromJson($scope.currentProfessionalJSON);
            searchAvailability($scope.currentProfessional);
        });

        function init() {
             ProfessionalService.findAllProfessionals()
                 .then(
                     function(response) {
                         if(response.data) {
                             $scope.professionals = response.data;
                         } else {
                             $scope.message = "No Professionals found!"
                         }
                     }
                 )
        }
        init();

        $scope.searchAvailability = searchAvailability;
        $scope.bookAppointment = bookAppointment;


        function  searchAvailability(professional) {
            AppointmentService.findAppointmentsByUser(professional._id, 'professional')
                .then(
                    function(response) {
                        if(response.data) {
                            var availAppointments = [];
                            var allAppointments = response.data;
                            for(var i =0; i < allAppointments.length; i++) {
                                if(allAppointments[i].status === 'available' ) {
                                    availAppointments.push(allAppointments[i]);
                                }
                            }
                            $scope.appointments = availAppointments;
                        } else {
                            $scope.message = "No availability for this stylist. Sorry!"
                        }
                    }
                )
        }
        function bookAppointment(appointmentId, service) {
            if(appointmentId && service) {
                AppointmentService.bookAppointment($scope.currentUser._id, appointmentId, service)
                    .then(
                        function (response) {
                            console.log("Successfully " + response);
                            if(response) {
                                $scope.message = "Successfully booked with " + $scope.currentProfessional.username + " for " + $scope.currentService + " service."
                                $location.url("/checkout");
                            } else {
                                $scope.message = "Failure to book!"
                            }

                        }
                    )
            }
        }

    }
})();