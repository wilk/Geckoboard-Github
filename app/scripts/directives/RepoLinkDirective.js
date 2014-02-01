'use strict';

app.directive ('ghRepoLink', function () {
    return {
        restrict: 'A' ,
        link: function (scope, element, attr) {
            element.bind ('click', $.proxy (function () {
                this.repository.iconCls = 'spinner';
            }, scope));
        }
    };
});