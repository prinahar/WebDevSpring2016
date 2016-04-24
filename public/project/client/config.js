(function() {
    angular
        .module("OnDemandApp")
        .config(Configure);


    function Configure($routeProvider) {
        console.log("config.js");
        $routeProvider
            .when("/home", {
                templateUrl : "views/home/home.view.html"
            })
            .when("/prof_register", {
                templateUrl : "views/users/professional/register.view.html",
                controller : "RegisterController"
            })
            .when("/cust_register", {
                templateUrl : "views/users/customer/register.view.html",
                controller : "CustRegisterController"
            })
            .when("/prof_login", {
                templateUrl : "views/users/professional/login.view.html",
                controller : "LoginController"
            })
            .when("/prof_profile", {
                templateUrl : "views/users/professional/profile.view.html",
                controller : "ProfileController"
            })
            .when("/cust_profile", {
                templateUrl : "views/users/customer/profile.view.html",
                controller : "CustProfileController"
            })
            .when("/cust_login", {
            templateUrl : "views/users/login.view.html",
            controller : "ProfileController"
            })
            .when("/checkout", {
                templateUrl : "views/users/customer/checkout.view.html"
            })
            .when("/appointment", {
                templateUrl : "views/users/customer/appointment.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();