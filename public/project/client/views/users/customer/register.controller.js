(function() {
    angular
        .module("OnDemandApp")
        .controller("CustRegisterController", CustRegisterController);

    function CustRegisterController(CustomerService, $scope, $rootScope, $location) {

        $scope.register = registerCustomer;
        $scope.currentUser = {};

        function registerCustomer(customer) {
            console.log("Registering customer in Controller->");
            console.log(customer);
            customer.role = 'customer';
            CustomerService.registerCustomer(customer)
                .then(
                    function(response) {
                        console.log("Response " + response.data);
                            if(response.data) {
                                console.log(response.data);
                                CustomerService.setCurrentUser(response.data);
                                $location.url("/cust_profile");
                            } else {
                                $rootScope.error = "User with these credentials already exists.";
                            }
                    },
                    function(err) {
                        console.log(err);
                        $rootScope.error = err;
                    }
                )
        }

    }

})();
