'use strict';

app.directive ('ghRepo', function () {
    return {
        restrict: 'E' ,
        templateUrl: '../../views/partials/Repo.html' ,
        scope: {
            repoInfo: '=info'
        } ,
        link: function (scope, element, attr) {
            scope.$watch ('repo', function (repo) {
                if (repo) {
                    //
                }
            });
        }
    };
});