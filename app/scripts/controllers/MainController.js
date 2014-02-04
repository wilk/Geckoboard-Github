'use strict';

app.controller ('MainController', ['$scope', 'user', 'repos', function ($scope, user, repos) {
    angular.forEach (repos, function (value, key) {
        repos[key].iconCls = value.fork ? 'octicon-repo-forked' : 'octicon-repo';
    });

    if (angular.isUndefined (user.id)) user.hasData = false;
    else {
        user.hasData = true;

        if (angular.isUndefined ($scope.user)) user.avatar_url += '&s=440';
        else if ($scope.user.id !== user.id) user.avatar_url += '&s=440';
    }

    $scope.user = user;
    $scope.repos = repos;
}]);


