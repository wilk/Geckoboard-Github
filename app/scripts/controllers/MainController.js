'use strict';

/**
 * Main Controller
 * It handles user and repos models
 */
app.controller ('MainController', ['$scope', 'user', 'repos', function ($scope, user, repos) {
    // Select the right icon css class to attach to each repo
    angular.forEach (repos, function (value, key) {
        repos[key].iconCls = value.fork ? 'octicon-repo-forked' : 'octicon-repo';
    });

    // Check if user data has been loaded
    if (angular.isUndefined (user.id)) user.hasData = false;
    else {
        user.hasData = true;

        // Load a 220x220 avatar
        if (user.avatar_url.substr (-6, 6) !== '&s=440') user.avatar_url += '&s=440';
    }

    $scope.user = user;
    $scope.repos = repos;
}]);


