'use strict';

app.directive ('ghRepo', function () {
    return {
        restrict: 'E' ,
        templateUrl: '../../views/partials/Repo.html' ,
        link: function (scope, element, attr) {
            scope.$on ('repo', function (event) {
                if (event.currentScope.repo) {
                    scope.repo = event.currentScope.repo;

                    $('.repos').fadeOut (1000, function () {
                        $('.repo').fadeIn ();
                    });
                }
                else {
                    $('.repo').fadeOut (1000, function () {
                        $('.repos').fadeIn ();
                    });
                }
            });
            /*scope.$watch (function (scope) {
                return scope.repo;
            }, function (repo) {
                console.log ('repo', repo);
                if (repo) {
                    $('.repos').fadeOut (1000, function () {
                        element.fadeIn (1000);
                    });
                }
                else {
                    element.fadeOut (1000, function () {
                        $('.repos').fadeIn (1000);
                    });
                }
            }, true);*/
        }
    };
});