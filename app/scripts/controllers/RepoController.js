'use strict';

app.controller ('RepoController', ['$scope', 'repo', 'user', function ($scope, repo, user) {
    $scope.repo = repo;
    $scope.user = user;
}]);