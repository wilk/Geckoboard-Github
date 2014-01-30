'use strict';

app.directive ('ghRepos', function () {
    return {
        restrict: 'E' ,
        templateUrl: '../../views/partials/Repos.html' ,
        link: function (scope, element, attr) {
            scope.$watch ('repos', function (repos) {
                if (repos) {
                    //
                }
            });
        }
    };
});