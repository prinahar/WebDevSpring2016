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


        function init() {
            console.log("currentUserId : " + currentUserId);
            FormService
                .findAllFormsForUser(currentUserId)
                .then(function (response) {
                    if (response.data) {
                        $scope.forms = response.data;
                        console.log(response.data);
                    }
                });
        }
        init();


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
                        console.log($scope.forms + "Forms after creating new forms");
                        $scope.form = {}; // clear input
                    });
            }
        }


            function updateForm(form) {
                if(form && form.title) {
                    FormService.updateFormById(form._id, form)
                        .then(function (response) {
                            console.log(response.data);
                            $scope.form = {}; // clear input
                            init();
                        });
                }
        }

        function deleteForm(index) {
            var currForm = $scope.forms[index];
            console.log("Forms "+ $scope.forms);
            console.log("Current Form : " + currForm);
            FormService.deleteFormById(currForm._id)
                .then(function (response) {
                    init();
            })
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