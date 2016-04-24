(function() {
    angular
        .module("FormBuilderApp")
        .config(Configure);


    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl : "views/home/home.view.html",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/register", {
                templateUrl : "views/users/register.view.html",
                controller : "RegisterController"
            })
            .when("/login", {
                templateUrl : "views/users/login.view.html",
                controller : "LoginController"
            })
            .when("/profile", {
                templateUrl : "views/users/profile.view.html",
                controller : "ProfileController",
                resolve: {
                    loggedin: checkLoggedin
                }

            })
            .when("/admin", {
                templateUrl : "views/admin/admin.view.html",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/forms", {
                templateUrl : "views/forms/forms.view.html"
                //controller : "FormController"
            })
            .when("/fields", {
                templateUrl : "views/forms/fields.view.html"
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/fields.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.message = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.message = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.user = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.message = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.message = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

})();