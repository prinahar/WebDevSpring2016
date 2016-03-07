(function() {
    angular
        .module("OnDemandApp")
        .controller("HomeController", homeController);

    function headerController($scope, $rootScope) {
        console.log("Hi from HeaderController");
    }
})();
