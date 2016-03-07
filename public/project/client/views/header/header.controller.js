(function() {
    angular
        .module("OnDemandApp")
        .controller("HeaderController", headerController);

    function headerController($scope, $rootScope) {
        console.log("Hi from HeaderController");
    }
})();
