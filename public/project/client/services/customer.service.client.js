
(function() {
        angular
            .module("OnDemandApp")
            .factory("CustomerService", CustomerService);

        function CustomerService ($rootScope, $http) {

            var service = {
                setCustomer: setCustomer,
                registerCustomer: registerCustomer
                //findAllCustomers: findAllCustomers,
                //findCustomerByCredentials: findCustomerByCredentials,
                //deleteCustomerById: deleteCustomerById,
                //updateCustomer: updateCustomer,
                //findCustomerByCustomername: findCustomerByCustomername

            };
            return service;

            function setCustomer(customer) {
                $rootScope.customer = customer;
            }

            function findAllCustomers()
            {
                return $http.get("/api/project/customer");
            }

            function findCustomerByCredentials(customername, password)
            {
                return $http.get("/api/project/customer?customername="+ customername + "&password=" + password);
            }

            function registerCustomer(customer)
            {
                console.log("Found the customer register api on client");
                return $http.post("/api/project/customer", customer);
            }

            function deleteCustomerById(customerId)
            {
                return $http.delete("/api/project/customer/" + customerId);
            }

            function updateCustomer(customerId, customer)
            {
                return $http.put("/api/project/customer/" + customerId, customer);
            }
            function findCustomerIndexById(customerId) {
                var customers = findAllCustomers();
                for(var customerIndex in customers) {
                    var customer = customers[CustomerIndex];
                    if(customer._id == customerId) {
                        return customerIndex;
                    }
                }
            }

            function findCustomerByCustomername(customername) {
                return $http.get("/api/project/customer?customername=" + customername);
            }
        }

    })();