'use strict';

app.directive ('ghRepos', function () {
    return {
        restrict: 'E' ,
        templateUrl: '../../views/partials/Repos.html' ,
        link: function (scope, element, attr) {
            scope.$on ('repos', function (event) {
                if (event.currentScope.repos) {
                    scope.repos = event.currentScope.repos;

                    $('.repo').fadeOut (1000, function () {
                        $('.repos').fadeIn ();
                    });
                }
                else {
                    $('.repos').fadeOut (1000, function () {
                        $('.repo').fadeIn ();
                    });
                }
            });
        }
    };
});