(function() {
    //Declaring the angular App
    angular
        .module("MovieAdminApp", [])
        .controller("MovieController", MovieController);

    //this func is responsible for the div where declared
    function MovieController($scope) {
        $scope.hello = "Hello World";

        $scope.movies = [
        {id : 1, title : "Hum Dil De Chuke Sanam", director: "Sanjay Leela Bansali"},
        {id: 2, title : "Kuch Kuch Hota Hai", director : "Yashraj Chopra"}
        ];

        $scope.addMovie = addMovie;
        $scope.deleteMovie = deleteMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;


        function addMovie(movie) {
            //console.log("Add Movie " + $scope.movie.id);
            //ng-repeat needs unique (by reference and not value)items so that it distinguish between them
            //hence create newMovie variable instead of pushing the movie directly
            var newMovie = {
                id :movie.id,
                title : movie.title,
                director : movie.director
            };
            $scope.movies.push(newMovie);
            $scope.movie = {}; //to clear the form input field
        }

        function deleteMovie(movie) {
            console.log(deleteMovie);
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index, 1);
        }

        var selectedIndex = null;
        function selectMovie(movie) {
            console.log("selectMovie");
            selectedIndex = $scope.movies.indexOf(movie);
            var selectedMovie = {
                id : movie.id,
                title : movie.title,
                director : movie.director
            }
            $scope.movie = selectedMovie;
        }

        function updateMovie(movie) {
            //Updating the reference to the selected movie
            $scope.movies[selectedIndex] = movie;
            $scope.movie = {};

        }
    }
})();