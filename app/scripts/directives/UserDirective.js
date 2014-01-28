'use strict';

app.directive ('ghUser', function () {
    return {
        restrict: 'E' ,
        templateUrl: '../../views/partials/User.html' ,
        scope: {
            userInfo: '=info'
        } ,
        link: function (scope, element, attr) {
            scope.$watch ('user', function (user) {
                if (user) {
                    //
                }
            });
        }
    };
});