'use strict';

app.directive ('ghRepos', function () {
    return {
        restrict: 'E' ,
        templateUrl: '../../views/partials/Repos.html' ,
        scope: {
            reposInfo: '=info'
        } ,
        link: function (scope, element, attr) {
            scope.$watch ('repos', function (repos) {
                if (repos) {
                    //
                }
            });
        }
    };
});