'use strict';

app.directive ('ghRepos', function () {
    return {
        restrict: 'E' ,
        templateUrl: '../../views/partials/Repos.html' ,
        link: function (scope, element, attr) {
            scope.$on ('repos', function (event) {
                if (event.currentScope.repos) {
                    scope.repos = event.currentScope.repos;

                    $('gh-repo').fadeOut (500, function () {
                        element.fadeIn ();
                    });
                }
                else {
                    element.fadeOut (500, function () {
                        $('.gh-repo').fadeIn ();
                    });
                }
            });
        }
    };
});