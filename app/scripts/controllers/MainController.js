'use strict';

app.controller ('MainController', ['$scope', 'user', 'repos', function ($scope, user, repos) {
    angular.forEach (repos, function (value, key) {
        repos[key].iconCls = value.fork ? 'octicon-repo-forked' : 'octicon-repo';
    });

    $scope.user = user;
    $scope.repos = repos;
}]);