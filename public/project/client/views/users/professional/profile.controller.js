(function() {
    angular
        .module("OnDemandApp")
        .controller("ProfessionalProfileController", professionalProfileController);

    function professionalProfileController($rootScope, $scope, ProfessionalService) {
        $rootScope.currentUser = $scope.currentUser;
        var service = $rootScope.service;

        $scope.update = update;
        $scope.addService = addService;

        function update(currentUser) {
            ProfessionalService.updateProfessional(currentUser._id, currentUser)
                .then(
                    function(docs) {
                        for(var i= 0; i <docs.length; i++) {
                            if(docs[i]._id == $rootScope.currentUser._id) {
                                console.log("Found the current user id");
                            }
                        }
                    }
                )
        }

        function addService() {
            console.log("Adding new service for " + $scope.currentUser.username);
            $rootScope.currentUser.services.push(newservice);

        }
    }
})();