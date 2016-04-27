(function() {
    angular
        .module("OnDemandApp")
        .factory("ProfessionalService", ProfessionalService);

    function ProfessionalService($rootScope, $http) {

        var service = {
            registerProfessional: registerProfessional,
            findAllProfessionals: findAllProfessionals,
            updateProfessional: updateProfessional,
            setCurrentUser : setCurrentUser
        };
        return service;


        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function findAllProfessionals() {
            return $http.get("/api/project/professional");
        }

        //function findProfessionalByCredentials(professionalname, password) {
        //    return $http.get("/api/project/professional?professionalname=" + professionalname + "&password=" + password);
        //}

        function registerProfessional(professional) {
            console.log("Found the professional register api on client");
            return $http.post("/api/project/professional", professional);
        }

        function updateProfessional(professionalId, professional) {
            return $http.put("/api/project/professional/" + professionalId, professional);
        }
    }
} )();