'use strict';

app.directive ('ghRepo', function () {
    return {
        restrict: 'E' ,
        templateUrl: '../../views/partials/Repo.html' ,
        link: function (scope, element, attr) {
            if (angular.isUndefined (scope.repo)) element.hide ();
            else element.show ();
        }
    };
});