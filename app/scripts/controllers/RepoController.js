'use strict';

app.controller ('Repocontroller', ['$scope', 'repo', function ($scope, repo) {
    console.log (repo);

    repo.$promise.then (function (data) {
        $scope.repo = data;
    }, function (error) {
        // @todo: handle the error when load single repo
    });
}]);