'use strict';

app.controller ('RepoController', ['$scope', 'repo', 'user', function ($scope, repo, user) {
    repo.$promise.then (function (data) {
        $scope.repo = data;
    }, function (error) {
        // @todo: handle the error when load single repo
    });

    user.$promise.then (function (data) {
        data.avatar_url += '&s=440';

        $scope.user = data;
    }, function (error) {
        // @todo: handle the error on user load
    });
}]);