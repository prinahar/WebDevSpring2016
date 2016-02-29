(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope, FormService, $rootScope) {
        var currentUserId = $rootScope.user._id;
        $scope.forms = FormService.findAllFormsForUser(currentUserId);

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(form) {
            console.log(form.title);
            FormService.createFormForUser(currentUserId, form, null);
            $scope.forms = FormService.findAllFormsForUser(currentUserId);
            $scope.form = {}; // clear input
        }

        function updateForm(form) {
            FormService.updateFormById(form._id, form, null)
            $scope.form = {}; // clear input
        }

        function deleteForm(index) {
            console.log(index);
            var currForm = $scope.forms[index];
            FormService.deleteFormById(currForm._id);
            $scope.forms = FormService.findAllFormsForUser(currentUserId);
        }

        function selectForm(index) {
            var currForm = $scope.forms[index];
            $scope.form = {
                _id : currForm._id,
                title : currForm.title,
                userId : currForm.userId
            };
        }
    }
})();