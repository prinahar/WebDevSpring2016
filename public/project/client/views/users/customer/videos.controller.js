(function(){
    angular
        .module("OnDemandApp")
        .controller("VideoSearchController", VideoSearchController);

    function VideoSearchController($rootScope, $scope, $sce) {

        $scope.search = search;
        $scope.results = [];

        function search() {
            var searchQuery = $scope.query;
            if(!searchQuery) {
                $rootScope.message = "Please enter a valid search!";
                return;
            }
            console.log("Query -> " + searchQuery);
            var request = gapi.client.youtube.search.list({
                part : "snippet",
                type : "video",
                q: encodeURIComponent(searchQuery).replace(/%20/g, "+"),
                maxResults: 3,
                publishedAfter: "2015-01-01T00:00:00Z"
            });

            request.execute(function(response) {
                var results = response.result;
                var x = [];
                results.items.forEach(function(value) {
                    x.push($sce.trustAsResourceUrl("//www.youtube.com/embed/" + value.id.videoId));
                })
                $scope.results = x;
            })
        }
    }
})();