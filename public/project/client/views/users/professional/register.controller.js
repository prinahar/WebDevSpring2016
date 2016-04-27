 (function () {
         angular
             .module("OnDemandApp")
             .controller("ProfessionalRegisterController", professionalRegisterController);

         function professionalRegisterController(ProfessionalService, $scope, $rootScope, $location) {

             $scope.register = registerProfessional;

             function registerProfessional(user) {
                 console.log("Registering professional in Controller->");

                 user.role = 'professional';
                 console.log(user);
                 ProfessionalService.registerProfessional(user)
                     .then(
                         function (response) {
                             console.log("Response " + response.data);
                             if (response.data) {
                                 console.log(response.data);
                                 ProfessionalService.setCurrentUser(response.data);
                                 $location.url("/prof_profile");
                             } else {
                                 $rootScope.error = "User with these credentials already exists.";
                             }
                         },
                         function (err) {
                             console.log(err);
                             $rootScope.error = err;
                         }
                     )
             }
         }
     })();
