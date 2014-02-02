'use strict';

app.controller ('RepoController', ['$scope', 'repo', 'user', function ($scope, repo, user) {
    if (angular.isUndefined (user.id)) user.hasData = false;
    else user.hasData = true;

    if (angular.isUndefined (repo.id)) repo.hasData = false;
    else repo.hasData = true;

    $scope.repo = repo;
    $scope.user = user;
}]);