'use strict';

/**
 * Repo Link Directive
 * It handles single repo link on the repos list
 */
app.directive ('ghRepoLink', function () {
    return {
        restrict: 'A' ,
        link: function (scope, element, attr) {
            // Spinnerize the repo when it's clicked
            element.bind ('click', $.proxy (function () {
                this.repository.iconCls = 'spinner';
            }, scope));
        }
    };
});