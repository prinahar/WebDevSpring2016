(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);


    function MainController($scope, $location)
    {
        $scope.$location = $location;
        console.log($location.url());
    }
}());
