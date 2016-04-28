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
                templateUrl : "views/users/professional/register.view.html"
            })
            .when("/cust_register", {
                templateUrl : "views/users/customer/register.view.html"
            })
            .when("/prof_profile", {
                templateUrl : "views/users/professional/profile.view.html"
            })
            .when("/cust_profile", {
                templateUrl : "views/users/customer/profile.view.html"
            })
            .when("/login/customer", {
                templateUrl : "views/users/login.view.html"
            })
            .when("/login/professional", {
                templateUrl : "views/users/login.view.html"
            })
            .when("/checkout", {
                templateUrl : "views/users/customer/checkout.view.html"
            })
            .when("/book_appointments", {
                templateUrl : "views/users/customer/appointment.view.html"
            })
            .when("/cust_upcoming", {
                templateUrl : "views/users/customer/upcoming.view.html"
            })
            .when("/prof_upcoming", {
                templateUrl : "views/users/professional/upcoming.view.html"
            })
            .when("/videos", {
                templateUrl : "views/users/customer/videos.view.html"
            })
            .when("/availability", {
                templateUrl : "views/users/professional/availability.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();