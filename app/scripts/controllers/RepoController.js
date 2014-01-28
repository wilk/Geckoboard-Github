'use strict';

app.controller ('Repocontroller', ['$scope', '$q', '$http', 'repo', function ($scope, $q, $http, repo) {
    console.log (repo);

    repo.$promise.then (function (data) {
        $q
            .all ({
                branches: $http.get (data.branches) ,
                releases: $http.get (data.releases) ,
                contributors: $http.get (data.contributors) ,
                issues: $http.get (data.issues)
            })
            .then (function (res) {
                $scope.repo.branches_count = res.branches.length;
                $scope.repo.releases_count = res.releases.length;
                $scope.repo.contributors_count = res.contributors.length;
                $scope.repo.issues_count = res.issues.length;
            });

        $scope.repo = data;
    }, function (error) {
        // @todo: handle the error when load single repo
    });
}]);