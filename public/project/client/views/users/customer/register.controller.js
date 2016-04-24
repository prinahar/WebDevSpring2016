(function() {
    angular
        .module("OnDemandApp")
        .controller("CustRegisterController", CustRegisterController);

    function CustRegisterController(CustomerService, $scope, $rootScope, $location) {

        $scope.register = registerCustomer;
        $scope.customer = {};
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
                                CustomerService.setCustomer(response.data);
                                $location.url("/cust_profile");
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
