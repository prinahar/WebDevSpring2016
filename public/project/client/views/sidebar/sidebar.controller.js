(function() {
    angular
        .module("OnDemandApp")
        .controller("SidebarController", SidebarController);


    function SidebarController($scope, $location)
    {
        console.log("Hi from MainController");
        //$scope.$location = $location;
        //console.log($location.url());
    }
})();

