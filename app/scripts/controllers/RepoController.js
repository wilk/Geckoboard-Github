'use strict';

app.controller ('Repocontroller', ['$scope', 'repo', function ($scope, repos) {
    console.log (repo);

    $scope.repo = repo;
}]);