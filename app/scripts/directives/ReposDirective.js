'use strict';

/**
 * Repos Directive
 * It handles repos list view
 */
app.directive ('ghRepos', function () {
    return {
        restrict: 'E' ,
        templateUrl: 'views/partials/Repos.html'
    };
});