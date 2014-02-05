'use strict';

/**
 * Repo Directive
 * It handles single repo view
 */
app.directive ('ghRepo', function () {
    return {
        restrict: 'E' ,
        templateUrl: 'views/partials/Repo.html' ,
        link: function (scope, element, attr) {
            // Hide or show repo page
            if (angular.isUndefined (scope.repo)) element.hide ();
            else element.show ();
        }
    };
});