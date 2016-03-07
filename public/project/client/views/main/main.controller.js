(function() {
    angular
        .module("OnDemandApp")
        .controller("MainController", mainController);

    function mainController($scope) {
        console.log("Hi from MainController");
    }
})();