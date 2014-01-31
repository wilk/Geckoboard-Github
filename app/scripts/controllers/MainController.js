'use strict';

app.controller ('MainController', ['$scope', 'user', 'repos', function ($scope, user, repos) {
    user.$promise.then (function (data) {
        data.avatar_url += '&s=440';

        $scope.user = data;
    }, function (error) {
        // @todo: handle the error on user load
    });

    repos.$promise.then (function (data) {
        $scope.repos = data;
    }, function (error) {
        // @todo: handle the error on repos load
    });
}]);