'use strict';

/**
 * User Directive
 * It handles user view
 */
app.directive ('ghUser', function () {
    return {
        restrict: 'E' ,
        templateUrl: 'views/partials/User.html'
    };
});