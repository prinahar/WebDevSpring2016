(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($scope, UserService, $rootScope) {
        $scope.users = [];
        $scope.currentUser = {};
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.addUser = addUser;

        function init() {
            UserService
                .findAllUsers()
                .then(function (response) {
                    if (response.data) {
                        $scope.users = response.data;
                        console.log(response.data);
                    }
                });
        }
        init();

        function selectUser(user) {
            $scope.currentUser = user;
        }

        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function(response) {
                    if (response.data) {
                        $scope.currentUser = {};
                        console.log("Current User: " + response.data);
                    }
                })
        }

        function deleteUser(user) {
            UserService
                .deleteUserById(user._id)
                .then(
                    function(response) {
                        if(response.data) {
                            console.log(user.username + " is deleted!" + response.data);
                            $scope.users = response.data;
                        }
                    }
                )
        }

        function addUser(user) {
            UserService.createUser(user)
                .then(
                    function(response) {
                        if (response.data) {
                            console.log(user.username + " is added!");
                            $scope.users = response.data;
                            $scope.currentUser = {};
                        }
                    }
                )
        }

    }
})();