(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope, FormService, $rootScope) {
        var currentUserId = $rootScope.user._id;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;


        FormService
            .findAllFormsForUser(currentUserId)
            .then(function(response) {
                if(response.data) {
                    $scope.forms = response.data;
                    console.log(response.data);
                }
        });


        function addForm() {
            if ($scope.form.title) {
                var newForm = {
                    title: $scope.form.title,
                    userId: currentUserId,
                    fields: []
                };
                FormService
                    .createFormForUser(currentUserId, newForm)
                    .then(function (response) {
                        $scope.forms.push(response.data);
                        $scope.form = {}; // clear input
                    });
            }
        }


            function updateForm(form) {
                if(form && form.title) {
                    FormService.updateFormById(form._id, form)
                        .then(function (response) {
                            $scope.forms = response.data;
                            $scope.form = {}; // clear input
                        });
                }
        }

        function deleteForm(index) {
            var currForm = $scope.forms[index];
            FormService.deleteFormById(currForm._id)
                .then(function (response) {
                $scope.forms = response.data;
                console.log($scope.forms);
            });
        }

        function selectForm(index) {
            var currForm = $scope.forms[index];
            $scope.form = {
                _id : currForm._id,
                title : currForm.title,
                userId : currForm.userId,
                fields: currForm.fields
            };
        }
    }
})();